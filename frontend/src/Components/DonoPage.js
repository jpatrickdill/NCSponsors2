import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef} from "react";
import DonoForm from "./DonoForm";
import PaymentProcessor from "./PaymentProcessor";
import AmountSlider from "./AmountSlider";


class DonoPage extends Component {
    state = {
        amount: 20,
        canSubmit: false,
    }
    _formdata = {}

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._mounted = true


    }

    componentDidUnmount() {
        this._mounted = false
    }

    render() {
        return (
            <>
                <div className="corpsponsor card right">
                    <AmountSlider
                        min={1}
                        max={250}
                        initial={20}
                        round={5}
                        custom
                        onChange={(val) => {
                            this.setState({amount: val});
                        }}
                    />

                    <hr/>

                    <DonoForm onChange={(canSub, vals) => {
                        if (!this._mounted) {
                            return;
                        }

                        this._formdata = vals;

                        console.log(vals);

                        if (canSub !== this.state.canSubmit) {
                            this.setState({
                                canSubmit: canSub,
                            })
                        }


                    }}/>

                    <h3>
                        Your Donation: ${this.state.amount}
                    </h3>
                    <PaymentProcessor
                        disabled={!this.state.canSubmit}
                        category="basic"
                        data={this._formdata}
                        amount={this.state.amount}/>
                </div>
            </>
        )
    }
}

export default DonoPage;
