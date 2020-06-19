const Player = (enemyBoard) => {
    const playerMove = (x, y) => {
        enemyBoard.receiveAttack(x, y)
    }

    const emptySpots = () => {
        // TOSEE: possibly change from filter function to dynamically added list 
        //       of spots remaining for performance
        const spots = [];
        for(let row of enemyBoard.gameboard) {
            for(let spot of row) {
                spots.push(spot)
            }
        }
        return spots.filter(spot => !spot.hit);
    }

    const computerMove = () => {
        const spotObj = emptySpots()[Math.floor(Math.random() * emptySpots().length)];
        enemyBoard.receiveAttack({ spotObj, })
    }

    return {
        playerMove,
        computerMove
    }
}

export { Player }