const computerMoves = (enemyBoard) => {
    // TOSEE: possibly change from filter function to dynamically added list 
    //       of spots remaining for performance
    const emptySpots = () => {
        const spots = [];
        for(let row of enemyBoard.gameboard) {
            for(let spot of row) {
                spots.push(spot)
            }
        }
        return spots.filter(spot => !spot.hit);
    }

    return emptySpots()[Math.floor(Math.random() * emptySpots().length)];

}

export { computerMoves }