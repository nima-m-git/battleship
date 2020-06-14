const ships = (length) => {
    const ship = [];
    for (let i=0; i<length; i++) {
        ship.push(null);
    }

    const hitSpot = (position) => {
        ship[position] = true;
    }

    const isSunk = () => ship.every(spot => spot)

    return {
        ship,
        length,
        hitSpot,
        isSunk,
    }
}

export { ships }