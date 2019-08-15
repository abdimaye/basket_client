import React from 'react';

const Basket = ({ items, onRemove, onAdd, onDelete }) => {

    let total = 0
    items.forEach(el => total += parseInt(el.price) * el.quantity)

    return (
        <div>
            <ul>
                {items.map( (item, index) => {
                    if (item.quantity > 0) 
                        return (
                            <li key={index}>
                                {item.name} &nbsp;
                                £{item.price / 100} &nbsp;
                                <button
                                    onClick={ () => onRemove(index) }
                                > - </button> &nbsp;
                                x{item.quantity} &nbsp;
                                <button
                                    onClick={ () => onAdd(index) }
                                >+</button> &nbsp;

                                <button
                                    onClick={() => onDelete(index)}
                                >delete</button>
                            </li>
                        )
                })}
            </ul>
            <strong>Total: </strong> £{total / 100 }
        </div>
    )
}

export default Basket;