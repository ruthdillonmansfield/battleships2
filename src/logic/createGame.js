import generateGrid from './generateGrid.js';
import checkBoats from './checkBoats.js';
import updateGrid from './updateGrid.js';
import tryToPlace from './tryToPlace.js';
import generateRandomCoordinates from './generateRandomCoordinates.js';
import generateRandomDirection from './generateRandomDirection.js';

const createGame = (gridA, gridB, boats) => {

    if (!gridA || !gridA.length || gridA.length < 6 || gridA.some(row => row.length < 6)) {
        gridA = generateGrid();
    }
    if (!gridB || !gridB.length || gridB.length < 6 || gridB.some(row => row.length < 6)) {
        gridB = generateGrid();
    }

    boats = checkBoats(boats);

    const width = gridA.length;
    const height = gridA.length;

    // Player A

    boats.forEach(boat => {
        let go = true;
        while (go) {
            let result = tryToPlace(gridA, boat, generateRandomCoordinates(width, height), generateRandomDirection())
            if (result != null) {
                go = false;
                gridA = updateGrid(gridA, result);
            } 
        }
    });

    // Player B

    boats.forEach(boat => {
        let go = true;
        while (go) {
            let result = tryToPlace(gridB, boat, generateRandomCoordinates(width, height), generateRandomDirection())
            if (result != null) {
                go = false;
                gridB = updateGrid(gridB, result);
            } 
        }
    });

    return {
        playerA: gridA,
        playerB: gridB,
        boats: boats
    }
}

export default createGame;