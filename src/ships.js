const ships = (length) => {
    const ship = [];
    (function() {
        for (let i=0; i<length; i++) {
            ship.push({
                spot: i,
                hit: false
            });
        }
    })();

    const hitSpot = (spot) => {
        ship[spot].hit = true;
    }

    const hasSunk = () => ship.every(spot => spot.hit)

    return {
        ship,
        length,
        hitSpot,
        hasSunk,
    }
}

const GAMESHIPS = [
    ships(1), ships(1), ships(1), ships(1), ships(1),
    ships(2), ships(2), ships(2), ships(2),
    ships(3), ships(3), ships(3),
    ships(4), ships(4),
    ships(5)
]

// REMOVE AFTER TESTS
const TESTSHIPS = [
    ships(1), ships(1), 
]

export { GAMESHIPS, TESTSHIPS }