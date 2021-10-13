import React from 'react';
import './Square.css'

function Square(props) {
    return (
        <button
            className={props.isWinSquare ? "square won" : "square"} 
            onClick={props.onClick}
        >      
            {props.value}
        </button>
    );
    
}

export default Square;