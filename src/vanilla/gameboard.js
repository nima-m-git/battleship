import { GAMESHIPS } from './ships';

const gameboards = () => {
    const missedCoords = [];
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
        for (let ship of GAMESHIPS) {
            let randomCoords = generateRandomCoords(ship);
            while (!checkEmpty({...randomCoords})) {
                randomCoords = generateRandomCoords(ship)
            }
            placeShip({...randomCoords, ship})
        }
    }


    const checkEmpty = (dir, axis, coords) => {
        const spots = [];
        for (let coord of coords) {
            if (dir === 'col') {
                spots.push(gameboard[coord][axis].fill)
            } else if (dir === 'row') {
                spots.push(gameboard[axis][coords].fill)
            }
        }
        if (spots.every(spot => !spot)) {
            return true
        } else {
            throw new Error('Overlap');
        } 
    }

    const placeShip = ({ ship, dir, axis, coords }) => {
        if (checkEmpty(dir, axis, coords)) {
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
    }


    const receiveAttack = ({ col = null, row = null, spotObj = null }) => {
        const spot = (spotObj)? spotObj : gameboard[row][col];

        if (spot.hit) {
            throw new Error('already attacked');
        } else {
            spot.hit = true;
            if (spot.ship) {
                spot.ship.hitSpot(spot.spot)
            } else {
                missedCoords.push([col, row])
            }
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
        placeShip,
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