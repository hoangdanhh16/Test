import React from 'react';
import Square from "./Square";

function Board(props) {
    return (
        <div className="board">
            {props.squares.map((square, i) => {
                return <Square 
                    key = {i}
                    value={square}
                    onClick={() => props.onClick(i)}
                    isWinning={props.isWinSquare.includes(i)}
                />
            })}
        </div>
    )
}

export default Board;