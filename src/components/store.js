import React from 'react';
import Basket from './basket'

export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            basket: []
        }

        this.addToBasket.bind(this)
    }

    componentDidMount() {
        // fetch...

        const result = [
            {
                id: 1,
                name: 'item 1',
                price: '100'
            },
            {
                id: 2,
                name: 'item 2',
                price: '150'
            }
        ]

        this.setState({
            items: result
        })

        console.log(this.state)
    }

    addToBasket(item) {
        const { basket } = this.state
        let basketCopy = [...basket]
        let itemCopy = Object.assign({}, item)

        const basketHasItem = basket.some((el) => {
            if (el.id === item.id) {
                el.quantity += 1
                return true;
            }
        })

        if (basketHasItem) {
            console.log('has item')
            this.setState({
                basket: basketCopy
            })
        } else {
            console.log('new item')
            itemCopy.quantity = 1

            this.setState({
                basket: basket.concat(itemCopy)
            })
        }
    }

    removeFromBasket(index) {
        const { basket } = this.state
        let newBasket = [...basket]

        newBasket[index].quantity -= 1;

        this.setState({
            basket: newBasket
        })
    }

    deleteFromBasket(index) {
        let newBasket = [...this.state.basket]

        this.setState({
            basket:  newBasket.filter( (el, i) => i !== index)
        })
    }
    
    render() {
        console.log(this.state.items)
        const { items, basket } = this.state

        return (
            <div>
                <ul>
                    {items.map( item => (
                        <li key={item.id}>{item.name} 
                            <button
                                onClick={() => this.addToBasket(item)}
                            >add</button>
                        </li> 
                    ))}
                </ul>

                <Basket 
                    items={basket} 
                    onRemove={ (index) => this.removeFromBasket(index) }
                    onDelete={ (index) => this.deleteFromBasket( index )}
                />
            </div>
        )
    }
}