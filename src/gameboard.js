const gameboards = () => {
    let gameboard = [];
    (function() {
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
    }());
    const missedCoords = [];

    const checkEmpty = (dir, axis, coords) => {
        const spots = [];
        for (let coord of coords) {
            if (dir === 'vert') {
                spots.push(gameboard[coord][axis].fill)
            } else if (dir === 'horz') {
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
        const oldboard = [...gameboard];
        if (checkEmpty(dir, axis, coords)) {
            coords.forEach(function(coord, spot) {
                if (dir === 'vert') {
                    oldboard[coord][axis] = {
                        ...oldboard[coord][axis],
                        fill: true,
                        spot,
                        ship,
                    }
                } else if (dir === 'horz') {
                    oldboard[axis][coord] = {
                        ...oldboard[coord][axis],
                        fill: true,
                        spot,
                        ship,
                    }
                }
            })
        }
        gameboard = [...oldboard]
    }


    const receiveAttack = ({ x = null, y = null, spotObj = null }) => {
        const spot = (spotObj)? spotObj : gameboard[y][x];

        if (spot.hit) {
            throw new Error('already attacked');
        } else {
            spot.hit = true;
            if (spot.ship) {
                spot.ship.hitSpot(spot.spot)
            } else {
                missedCoords.push([x, y])
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
        receiveAttack,
        areAllSunk
    }
}
  

export { gameboards }