import React from 'react';
import Basket from './basket'

export default class Store extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: '',
            items: [],
            basket: []
        }

        this.addToBasket.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/v1/products")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
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
            this.setState({
                basket: basketCopy
            })
        } else {
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

    increaseBasketItem(index) {
        let newBasket = [...this.state.basket]
        newBasket[index].quantity += 1
        this.setState({
            basket: newBasket
        })
    }
    
    render() {
        const { items, basket, isLoaded } = this.state
        let unavailable = '';

        if (isLoaded && items.length == 0) {
            unavailable = 'Store is currenlty unavailable'
        }

        return (
            <div className="container">
                <div className="row">
                    <div id="store" className="col-md-6">
                        <h1>Products</h1>
                        <p>{unavailable}</p>
                        <ul>
                            {items.map( item => (
                                <li key={item.id}>
                                    {item.name} £{item.price / 100}
                                    &nbsp;
                                    <button
                                        onClick={() => this.addToBasket(item)}
                                    >+</button>
                                </li> 
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h1>Shopping Basket</h1>
                        <Basket 
                            items={basket} 
                            onRemove={ (index) => this.removeFromBasket(index) }
                            onDelete={ (index) => this.deleteFromBasket(index)}
                            onAdd={ (index) => this.increaseBasketItem(index) }
                        />
                    </div>
                </div>
            </div>
        )
    }
}