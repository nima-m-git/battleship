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

    const isSunk = () => ship.every(spot => spot.hit)

    return {
        ship,
        length,
        hitSpot,
        isSunk,
    }
}

export { ships }