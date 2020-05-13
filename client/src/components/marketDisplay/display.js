import React, { Component } from "react";
import API from "../../utils/API"

class Display extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        name: "",
        open: 1,
        high: 2,
        low: 3,
        close: 4,
        volume: 5
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.data !== prevProps.data) {
            this.renderDisplay()
        }
    }

    // parse props to update what stock is being displayed, setstate at the end
    renderDisplay() {
        let today = this.props.data[this.props.meta["3. Last Refreshed"]]
        let average = ((Number(today["2. high"]) + Number(today["3. low"])) / 2).toFixed(4)
        console.log(average)
        this.setState({
            name: this.props.meta["2. Symbol"],
            average: average,
            open: today["1. open"],
            high: today["2. high"],
            low: today["3. low"],
            close: today["4. close"],
            volume: today["5. volume"]
        })
    }

    vend(e, quantity) {
        e.preventDefault()
        // if (this.props.user._id === undefined) return false;

        // average * quantity = price 
        // mongo needs to change stock quantity and the netWorth change to the correct user

        let id = this.props.user._id
        let name = this.props.meta["2. Symbol"]
        let stats = { name, quantity, id }
        API.vendStock(stats)
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col">
                        <h3>Company Name: {this.state.name}</h3>
                    </div>
                    <div className="col">
                        <h5>Daily average: {this.state.average}</h5>
                    </div>
                    <input type="number" ref="quantity" onChange={e => this.vend(e, this.refs.quantity.value)} />
                </div>
                <div className="row">
                    <div className="col">
                        <h5>Open: {this.state.open}</h5>
                    </div>
                    <div className="col">
                        <h5>High: {this.state.high}</h5>
                    </div>
                    <div className="col">
                        <h5>Low: {this.state.low}</h5>
                    </div>
                    <div className="col">
                        <h5>Close: {this.state.close}</h5>
                    </div>
                    <div className="col">
                        <h5>Volume: {this.state.volume}</h5>
                    </div>
                </div>
            </div>
        )
    }
}

export default Display