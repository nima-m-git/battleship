import { GAMESHIPS, TESTSHIPS } from './ships';

const gameboards = () => {
    let gameboard = createGameboard();

    function createGameboard() {
        let gameboard = [];
        for (let i=0; i<10; i++) {
            const row = [];
            for (let i=0; i<10; i++) {
                row.push({
                    fill: null,
                    hit: false
                });
            }
            gameboard.push(row);
        }
        return gameboard
    }

    const generateRandomCoords = (ship) => {
        const dir = (!!Math.floor(Math.random() * 2))? 'col' : 'row';
        const axis = (Math.floor(Math.random() * 10));
        const coords = [];
        const randomCoord = Math.floor(Math.random() * (10 - ship.length))
        for (let i=0; i<ship.length; i++) {
            coords.push(randomCoord + i)
        }

        return {
            dir,
            axis,
            coords,
        }
    }

    const randomFillShips = () => {
        // CHANGE BACK TO GAMESHIPS AFTER TESTS
        for (let ship of TESTSHIPS) {
            let randomCoords = generateRandomCoords(ship);
            while (!checkEmpty({...randomCoords})) {
                randomCoords = generateRandomCoords(ship);
            }
            placeShip({...randomCoords, ship})
        }
    }

    const checkEmpty = ({ dir, axis, coords, }) => {
        const spots = [];
        for (let coord of coords) {
            if (dir === 'col') {
                spots.push(gameboard[coord][axis].fill)
            } else if (dir === 'row') {
                spots.push(gameboard[axis][coord].fill)
            }
        }
        return (spots.every(spot => !spot))
    }

    const placeCustomShip = ({ ship, dir, axis, coords }) => {
        if (checkEmpty({dir, axis, coords,})) {
            placeShip({ ship, dir, axis, coords })
        }
    }

    const placeShip = ({ ship, dir, axis, coords }) => {
        coords.forEach(function(coord, spot) {
            if (dir === 'col') {
                gameboard[coord][axis] = {
                    ...gameboard[coord][axis],
                    fill: true,
                    spot,
                    ship,
                }
            } else if (dir === 'row') {
                gameboard[axis][coord] = {
                    ...gameboard[coord][axis],
                    fill: true,
                    spot,
                    ship,
                }
            }
        })
    }

    // REMOVE: changes state, use in component method
    const receiveAttack = (spot) => {
        spot.hit = true;
        if (spot.ship) {
            spot.ship.hitSpot(spot.spot)
        }
    }


    const areAllSunk = () => {
        for (let row of gameboard) {
            for (let spot of row) {
                if (spot.fill === true && spot.hit === false) {
                    return false
                }
            }
        }
        return true
    }

    return {
        gameboard,
        placeCustomShip,
        checkEmpty, // DELETE AFTER TESTS
        randomFillShips,
        receiveAttack,
        areAllSunk
    }
}


const emptyBoard = (function() {
    const board = [];
    for (let i=0; i<10; i++) {
        const row = [];
        for (let i=0; i<10; i++) {
            row.push({
                fill: null,
                hit: false
            });
        }
        board.push(row);
    }
    return board
}());
  

export { gameboards, emptyBoard }