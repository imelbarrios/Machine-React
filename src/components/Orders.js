import React, { Component, useState, useEffect } from 'react';

//Imagenes
import alboroto from '../images/alboroto.jpg';
import candy from '../images/candy.jpg';
import mm from '../images/m&m.jpg';
import nacho from '../images/nachos.jpg';
import oreo from '../images/oreo.jpg';
import pop from '../images/popottos.jpg';
import cheese from '../images/quesito.jpg';
import snickers from '../images/snickers.jpg';
import coca from '../images/coca.jpg';

import '../styles/Orders.css';

const Timer = ({ seconds }) => {

    const [timeLeft, setTimeLeft] = useState(seconds);
    const [time, setTime] = useState({})

    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = { "h": hours, "m": minutes, "s": seconds }; return obj;
    }



    useEffect(() => {

        if (!timeLeft) return;
        let secondsT = timeLeft - 1;
        const intervalId = setInterval(() => {
            setTimeLeft(secondsT);
            setTime(secondsToTime(secondsT))
        }, 1000);


        return () => clearInterval(intervalId);

    }, [timeLeft, time]);

    return (
        <span className="time">{time.m} : m {time.s} : s </span>
    );
};

class Produc extends Component {


    order = React.createRef()

    getSnapshotBeforeUpdate() {
        const order = this.order.current
        if (order.scrollTop + order.offsetHeight >= order.scrollHeight) {
            return true
        }
        return false
    }


    componentDidUpdate(prevProps, prevState, snap) {
        const order = this.order.current
        if (snap) {
            order.scrollTop = order.scrollHeight
        }
    }


    render() {

        return (
            <div className="row detail" ref={this.order} >
                {
                    this.props.productSelect.map((prod) => {
                        return (
                            <div className="product" key={prod.id}>
                                <span className="title">Product Name: {prod.name}</span>
                                {prod.isFetching ? <span className="status status-ready">Ready</span> : <span className="status status-prep">Preparing...</span>}
                                <Timer seconds={prod.timeP} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

class Orders extends Component {


    state = {
        products: [
            {
                id: 1,
                name: 'A1',
                img: nacho,
                price: 0.50,
                time: 10,
            },
            {
                id: 2,
                name: 'A2',
                img: alboroto,
                price: 0.50,
                time: 120,
            },
            {
                id: 3,
                name: 'A3',
                img: cheese,
                price: 0.50,
                time: 60,
            },
            {
                id: 4,
                name: 'B1',
                img: pop,
                price: 0.50,
                time: 150,
            },
            {
                id: 5,
                name: 'B2',
                img: oreo,
                price: 0.75,
                time: 120,
            },
            {
                id: 6,
                name: 'B3',
                img: candy,
                price: 0.80,
                time: 90,
            },
            {
                id: 7,
                name: 'C1',
                img: mm,
                price: 1.00,
                time: 100,
            },
            {
                id: 8,
                name: 'C2',
                img: snickers,
                price: 1.50,
                time: 50,
            },
            {
                id: 9,
                name: 'C3',
                img: coca,
                price: 0.75,
                time: 25,
            }
        ],
        productSelect: [],
        isReady: false,
        cost: 0,
        count: 0,
        timeT: 0,
        seconds: 0,
    }

    SelectProduct = (value) => {

        const times = value.time * 1000;
        const id = Math.random().toString(16);
        const name = value.name;
        const price = value.price;
        const timeP = value.time;
        const isFetching = false;
        const product = { id, name, price, isFetching, timeP };

        console.log(times)

        this.setState(state => ({
            productSelect: [
                ...state.productSelect,
                product
            ],
            cost: state.cost + price,
            count: state.count + 1,
            isReady: false
        }))


        const time = setInterval(() => {
            this.setState(state => ({
                productSelect: state.productSelect.map(pr =>
                    pr.id === id ? { ...pr, isFetching: true } : pr),
                isReady: true
            })
            )
        }, times);

        if (this.state.isReady === true) {
            clearInterval(time);
        }


    }


    Send = () => {
        this.setState({
            productSelect: [],
            cost: 0,
            count: 0,
            timeT: 0,
            isReady: false
        })

    }


    render() {
        const { products, productSelect, count, cost, isReady } = this.state
        console.log('render' + productSelect)
        return (
            <div className="row order">
                <div className="col-12">
                    <h2> Select your products</h2>
                </div>

                <div className="col-8">
                    <div className="row row-cols-3 products">
                        {
                            products.map((produc) => {
                                return (
                                    <div className="col product" key={produc.id}  >
                                        <img src={produc.img} alt='img' onClick={() => this.SelectProduct(produc)} />
                                        <p><span>{produc.name}</span></p>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="col-4 details">
                    <h3>Order detail</h3>
                    <Produc productSelect={productSelect} />
                    <p><span>Count : {count}</span></p>
                    <p><span>Total Cost : ${Number(cost.toFixed(2))}</span></p>
                    {
                        isReady ? <button className="btn-take" onClick={this.Send}>Take order</button> : ''
                    }

                </div>



            </div>
        )
    }

}

export default Orders 