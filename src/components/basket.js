import React from 'react';

const Basket = ({ items, onRemove, onDelete }) => {
    return (
        <ul>
            {items.map( (item, index) => {
                if (item.quantity > 0) 
                    return (
                        <li key={index}>{item.name} x{item.quantity} 
                            <button
                                onClick={ () => onRemove(index) }
                            > remove
                            </button>
                            <button
                                onClick={() => onDelete(index)}
                            >delete</button>
                        </li>
                    )
            })}
        </ul>
    )
}

export default Basket;