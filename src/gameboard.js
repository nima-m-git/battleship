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

    const checkEmpty = (dir, axis, coords) => {
        const spots = [];
        for (let coord of coords) {
            if (dir === 'vert') {
                spots.push(gameboard[coord][axis].fill)
            } else if (dir === 'horz') {
                spots.push(gameboard[axis][coords].fill)
            }
        }
        return spots.every(spot => !spot)
    }

    const placeShip = ({ ship, dir, axis, coords }) => {
        const oldboard = {...gameboard};
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
        gameboard = {...oldboard}
    }
    
    return {
        gameboard,
        checkEmpty,
        placeShip
    }
}

export { gameboards }