import React from 'react';
import styled from 'styled-components';
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft.js";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight.js";

import Button from './Button.js';

const SetupDiv = styled.div``;

const SetupSectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 3rem;

    @media only screen and (max-width: 740px) {
        margin-bottom: 2.5rem;
    }
`;

const Subtitle = styled.h4`
    text-align: center;
`;

const Text = styled.p`
    margin: 0 0 1rem 0;
`;

const SetupBar = styled.div`
    display: flex;
    justify-content: center;

    h4 {
        margin: 0 !important;
    }

    div {
        width: 5rem;
    }

    .active-arrow {
        color: gray !important;
    }
`;

const BoatList = styled.div`
    display: inline-block;
    width: 100%;

    display: flex;
    justify-content: center;
    flex-direction: row; 

    @media only screen and (max-width: 740px) {
        flex-direction: column;
    }
`;

const BoatSmallScreenGrouper = styled.div`
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 740px) {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`;

const BoatInfo = styled.div`
    padding: 0 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 740px) {
        width: 40%;

        &.top-row {
            width: 80% !important;
            margin: 0 auto;
        }
    }
`;

const BoatContainer = styled.div`
    width: 100% !important;
    height: 3rem;
    border: 2px solid #005982;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 0;
`;

const SetupBoat = styled.div`
    font-family: 'Ubuntu', cursive !important;
    margin-top: .6rem;
    height: 3rem;
    width: 3rem;
    border: 2px solid #005982;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 420px) {
        height: 2.8rem;
        width: 2.8rem;
        border: 1px solid #005982;
    }
`

const BoatName = styled.h5`
`;

const Buttons = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    margin: 1.5rem auto;
  }
`

const GridSizeCell = styled.div`
    height: 5rem;
    width: 5rem;
    border: 2px solid #005982;
    margin: 0;
    background-color: #15739e;
    margin: .5rem;
    animation-duration: .3s;
    animation-fill-mode: both;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .4s ease-in-out;

    &:hover {
        background-color: #a3e3ef8f;
        cursor: pointer;
    }

    &.active-size {
        background-color: #b12929;
        width: 10rem;


        &:hover {
            background-color: #b12929;
            color: grey !important;
        }
    }

    @media only screen and (max-width: 740px) {

        &.hidden-small {
            display: none;
        }

        &.active-size {
            background-color: #b12929;
            width: 9rem ;
        }
    }
`;

const Setup = props => {
    // TODO: Chevrons don't work yet on click
    const gridSizeCells = [6,7,8,9,10,11,12].map((num, i) => {
        return num < 11 
            ? <GridSizeCell key={`gridsize${i}`} className={`${props.size === num ? 'active-size' : 'inactive'}`} onClick={props.handleUpdateGridSize.bind(null, num)}><p>{num}</p></GridSizeCell> 
            : <GridSizeCell key={`gridsize${i}`} className={`hidden-small ${props.size === num ? 'active-size' : 'inactive'}`} onClick={props.handleUpdateGridSize.bind(null, num)}><p>{num}</p></GridSizeCell>
    })

    return <SetupDiv className='setup'>
        <SetupSectionContainer>
            <Subtitle>Select Ocean Size</Subtitle>
            <Text>Number of squares wide and high</Text>
            <SetupBar>
                {gridSizeCells}
            </SetupBar>
        </SetupSectionContainer>
        <SetupSectionContainer>
            <Subtitle>Select Battleships</Subtitle>
            <BoatList>
                <BoatInfo className='top-row'>
                    <BoatContainer>
                        <SetupBoat className='carrier'><p>CA</p></SetupBoat>
                        <SetupBoat className='carrier'><p>CA</p></SetupBoat>
                        <SetupBoat className='carrier'><p>CA</p></SetupBoat>
                        <SetupBoat className='carrier'><p>CA</p></SetupBoat>
                        <SetupBoat className='carrier'><p>CA</p></SetupBoat>
                    </BoatContainer>
                    <BoatName>CARRIER</BoatName>
                    <SetupBar>
                        <h4 className={`icon ${props.boats.carrier.minReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'carrier', 'down')}><FaChevronLeft /></h4>
                        <h4 className='icon'>{props.boats.carrier.number}</h4>
                        <h4 className={`icon ${props.boats.carrier.maxReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'carrier', 'up')}><FaChevronRight /></h4>
                    </SetupBar>
                </BoatInfo>
                <BoatSmallScreenGrouper>
                    <BoatInfo>
                        <BoatContainer>
                            <SetupBoat className='battleship'><p>B</p></SetupBoat>
                            <SetupBoat className='battleship'><p>B</p></SetupBoat>
                            <SetupBoat className='battleship'><p>B</p></SetupBoat>
                            <SetupBoat className='battleship'><p>B</p></SetupBoat>
                        </BoatContainer>
                        <BoatName>BATTLESHIP</BoatName>
                        <SetupBar>
                            <h4 className={`icon ${props.boats.battleship.minReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'battleship', 'down')}><FaChevronLeft /></h4>
                            <h4 className='icon'>{props.boats.battleship.number}</h4>
                            <h4 className={`icon ${props.boats.battleship.maxReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'battleship', 'up')}><FaChevronRight /></h4>
                        </SetupBar>
                    </BoatInfo>
                    <BoatInfo>
                        <BoatContainer>
                            <SetupBoat className='cruiser'><p>C</p></SetupBoat>
                            <SetupBoat className='cruiser'><p>C</p></SetupBoat>
                            <SetupBoat className='cruiser'><p>C</p></SetupBoat>
                        </BoatContainer>
                        <BoatName>CRUISER</BoatName>
                        <SetupBar>
                            <h4 className={`icon ${props.boats.cruiser.minReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'cruiser', 'down')}><FaChevronLeft /></h4>
                            <h4 className='icon'>{props.boats.cruiser.number}</h4>
                            <h4 className={`icon ${props.boats.cruiser.maxReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'cruiser', 'up')}><FaChevronRight /></h4>
                        </SetupBar>
                    </BoatInfo>
                </ BoatSmallScreenGrouper>
                <BoatSmallScreenGrouper>
                    <BoatInfo>
                        <BoatContainer>
                            <SetupBoat className='submarine'><p>S</p></SetupBoat>
                            <SetupBoat className='submarine'><p>S</p></SetupBoat>
                            <SetupBoat className='submarine'><p>S</p></SetupBoat>
                        </BoatContainer>
                        <BoatName>SUBMARINE</BoatName>
                        <SetupBar>
                            <h4 className={`icon ${props.boats.submarine.minReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'submarine', 'down')}><FaChevronLeft /></h4>
                            <h4 className='icon'>{props.boats.submarine.number}</h4>
                            <h4 className={`icon ${props.boats.submarine.maxReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'submarine', 'up')}><FaChevronRight /></h4>
                        </SetupBar>
                    </BoatInfo>
                    <BoatInfo>
                        <BoatContainer>
                            <SetupBoat className='destroyer'><p>D</p></SetupBoat>
                            <SetupBoat className='destroyer'><p>D</p></SetupBoat>
                        </BoatContainer>
                        <BoatName>DESTROYER</BoatName>
                        <SetupBar>
                            <h4 className={`icon ${props.boats.destroyer.minReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'destroyer', 'down')}><FaChevronLeft /></h4>
                            <h4 className='icon'>{props.boats.destroyer.number}</h4>
                            <h4 className={`icon ${props.boats.destroyer.maxReached ? 'active-arrow' : ''}`} onClick={props.handleUpdateBoats.bind(null, 'destroyer', 'up')}><FaChevronRight /></h4>
                        </SetupBar>
                    </BoatInfo>
                </BoatSmallScreenGrouper>
            </BoatList>
        </SetupSectionContainer>
        <Buttons>
            <Button onClick={props.handleSetup}><p>Start Game</p></Button>
            <Button onClick={props.toggleInstructions}><p>How to play</p></Button>
        </Buttons>
    </SetupDiv>
};

export default Setup;