import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from './Grid.js';
import Setup from './Setup.js';
import Button from './Button.js';
import Instructions from './Instructions.js';
import boatsObject from '../logic/boatsObject.js';
import setupBoatsList from '../logic/setupBoats.js';
import generateGrid from '../logic/generateGrid.js';
import { computerStrategy as fetchComputerStrategy } from '../logic/computerStrategy.js';
import fire from '../logic/fire.js';
import createGame from '../logic/createGame.js';

const GridsArea = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media only screen and (max-width: 740px) {
    flex-direction: column;
    align-items: center;
  }
`

const GridContainer = styled.section`
  margin: 0 3rem 3rem 3rem;

  @media only screen and (max-width: 740px) {
    margin: 0 0 2rem;
  }

  h3 {
    font-family: Ubuntu, cursive;
    margin: 0 0 1rem !important;
    font-size: 2.5rem;
    text-align: center;
  }
`

const Buttons = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  button {
    margin: 2rem auto;
  }
`

const DevCheat = styled.div`
  color: blue;
  text-align: right;
`

const Game = () => {

    const [ width, setWidth ] = useState(10);
    const [ height, setHeight ] = useState(10);
    const [ gridA, setGridA ] = useState(generateGrid());
    const [ gridB, setGridB ] = useState(generateGrid());
    const [ numberOfBoats, setNumberOfBoats ] = useState(6);
    const [ player, setPlayer ] = useState("A");
    const [ computerStrategy, setComputerStrategy ] = useState({
        next: [],
        plan: [],
        lastTry: [],
        firstHit: null,
        direction: null,
        boatHits: []
    });
    const [ setup, setSetup ] = useState(true);
    const [ setupBoats, setSetupBoats ] = useState(setupBoatsList);
    const [ setupSize, setSetupSize ] = useState(10);
    const [ win, setWin ] = useState(false);
    const [ dev, setDev ] = useState(false);
    const [ instructions, setInstructions ] = useState(false);
    
    
    
    const handleSetup = () => {
        let newBoats = Object.entries(Object.assign(setupBoats)).reduce((acc, boat) => {
            for (let i = 0; i < boat[1].number; i++) {
                acc.push(boatsObject[boat[0]]);
            }
            return acc;
        }, []);
        
        const newGame = createGame(generateGrid(setupSize, setupSize), generateGrid(setupSize, setupSize), newBoats);

        const numberOfBoats = newGame.playerA.reduce((acc, row) => {
            return acc + row.reduce((acc2, cell) => {
                return cell.isShip ? acc2 + 1 : acc2;
            }, 0)
        }, 0);
      
        window.scrollTo(0, 0);

        setSetup(false)
        setNumberOfBoats(numberOfBoats)
        setGridA(newGame.playerA)
        setGridB(newGame.playerB)
    }

    const handleFire = (x, y) => {
        const enemyGrid = player === "A" ? gridB.slice() : gridA.slice();
        const enemyPlayer = player === "A" ? "B" : "A";
        const firedGrid = fire(player, enemyGrid, y, x);
        const numberOfDiscovered = firedGrid.reduce((acc, row) => {
            return acc + row.reduce((acc2, cell) => {
                return cell.isShip && cell.isDiscovered ? acc2 + 1 : acc2;
            }, 0)
        }, 0);

        if (enemyPlayer === "A") {
          setPlayer(enemyPlayer);
          setGridA(firedGrid);
          setWin(numberOfDiscovered === numberOfBoats ? "human" : false)
        } else {
            if (numberOfDiscovered !== numberOfBoats) {
                handleComputerGo();
            } 
              setPlayer("B");
              setGridB(firedGrid);
              setWin(numberOfDiscovered === numberOfBoats ? "human" : false)
            }
        }
        

    const handleComputerGo = () => {
      if (win) {
          return;
      }

      const timer = 300 + Math.random() * 1000;

      setTimeout(() => {
          let strategy = fetchComputerStrategy(computerStrategy, gridA);

          setComputerStrategy({
              computerStrategy: strategy
          })
          
          let firedGrid;

          if (strategy.next.length) {
            firedGrid = fire(player, gridA.slice(), strategy.lastTry[0], strategy.lastTry[1]);
          } else {
            firedGrid = fire(player, gridA.slice(), strategy.lastTry[0], strategy.lastTry[1])
          }


          setGridA(firedGrid);
          setPlayer("A");
          setWin(firedGrid.reduce((acc, row) => {
            return acc + row.reduce((acc2, cell) => {
                return cell.isShip && cell.isDiscovered ? acc2 + 1 : acc2;
            }, 0);

        }, 0) === numberOfBoats ? "computer" : false);

      }, timer);
  }

  const reset = () => {
    const newGame = createGame(generateGrid(), generateGrid())
    const numberOfBoats = newGame.playerA.reduce((acc, row) => {
        return acc + row.reduce((acc2, cell) => {
            return cell.isShip ? acc2 + 1 : acc2;
        }, 0)
      }, 0);
      setGridA(newGame.playerA);
      setGridB(newGame.playerB);
      setNumberOfBoats(numberOfBoats);
      setPlayer("A");
      setComputerStrategy({
        next: [],
        plan: [],
        lastTry: [],
        firstHit: null,
        direction: null,
        boatHits: []
      });
      setWin(false);
      setSetup(true);
    }

    const toggleDev = () => {
      setDev(!dev);
    }

    const toggleInstructions = () => {
      setInstructions(!instructions); 
    }

    const handleUpdateGridSize = (newSize) => {
      setSetupSize(newSize);
      setWidth(newSize);
      setHeight(newSize);
    }

    const handleUpdateBoats = (boat, direction) => {
      let newBoats = {...setupBoats}
      let checkNumber = Object.entries(newBoats).reduce((acc, boat) => acc + boat[1].number, 0);

      if (checkNumber === 3 && direction === 'down') {
          for (let boat in newBoats) {
              newBoats[boat].minReached = true
          }
      } else if (checkNumber === 2 && direction === 'down') {
        return;
      } else if ((checkNumber - 1) < 3 && direction === 'up') {
          for (let boat in newBoats) {
              if (newBoats[boat].number !== 0) {
                  newBoats[boat].minReached = false
              }
          }
      }

      if (checkNumber === 7 && direction === 'up') {
          for (let boat in newBoats) {
              newBoats[boat].maxReached = true
          }
      } else if (checkNumber === 8 && direction === 'up') {
          return;
      } else if (checkNumber === 8 && direction === 'down') {
        for (let boat in newBoats) {
            if (newBoats[boat].number !== newBoats[boat].max) {
                newBoats[boat].maxReached = false
            }
        }
    }


    newBoats[boat].number = direction === 'up' ? newBoats[boat].number !== newBoats[boat].max ? newBoats[boat].number + 1 : newBoats[boat].number : newBoats[boat].number - 1 < 0 ? 0 : newBoats[boat].number - 1;
    
    if (newBoats[boat].number === newBoats[boat].max) {
      newBoats[boat].maxReached = true;
    } else {
      newBoats[boat].maxReached = false;
    }
    if (newBoats[boat].number === 0) {
      newBoats[boat].minReached = true;
    } else {
      newBoats[boat].minReached = false;
    }

    setSetupBoats(newBoats);
  }

  if (instructions) {
    return <Instructions 
        toggleInstructions={toggleInstructions}
    />
  }

  return (
    <div>
      {win ? <div className={win === 'human' ? 'pyro' : 'explosion'}>
                <div className="before"></div>
                <div className="after"></div>
            </div> : <p></p>}
      {setup ?
        <Setup 
          handleSetup={handleSetup}
          handleUpdateGridSize={handleUpdateGridSize}
          handleUpdateBoats={handleUpdateBoats}
          size={setupSize}
          boats={setupBoats}
          toggleInstructions={toggleInstructions}
        /> : <></>
      }
      {!setup ? 
        <GridsArea>
          <GridContainer>
            <h3>You</h3>
            {player === 'B' ? win ? <h5 className='deselectedPlayer'>Computer is firing...</h5> : <h5 className='selectedPlayer'>Computer is firing...</h5> : <h5 className='deselectedPlayer'>Computer is firing...</h5>}
            <Grid 
              player="human"
              grid={gridA}
              height={height}
              width={width}
              win={win}
              turn={player}
              handleFire={handleFire}
            />
          </GridContainer>
          <GridContainer>
            <h3>Computer</h3>
            {player === 'A' && !win ? <h5 className='selectedPlayer'>Choose where to fire!</h5> : <h5 className='deselectedPlayer'>Choose where to fire!</h5>}
            <Grid 
              player="computer"
              grid={gridB}
              height={height}
              width={width}
              win={win}
              turn={player}
              handleFire={handleFire}
              dev={dev}
            />
          </GridContainer>
        </GridsArea> : <></>
      }
      {
        setup ? <></> :
          <Buttons>
          {win ? <div>
                    <p>{win === "human" ? "YOU WIN!" : "THE COMPUTER HAS DEFEATED YOU :("}</p>
                    <Button onClick={reset}><p>Create a new game</p></Button>
                </div> : player === 'A' ? <h5 className='selectedPlayer'>Your turn</h5> : <h5 className='selectedPlayer'>Computer thinking</h5>}
                {win ? <div></div> : <Button onClick={reset}><p>Quit</p></Button>}
          </Buttons>
      }
      <section>
        <DevCheat onClick={toggleDev}>USE DEV</DevCheat>
      </section>
    </div>
  );
}

export default Game;