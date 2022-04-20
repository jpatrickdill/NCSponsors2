import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef} from "react";
import StudentForm from "./StudentForm";
import PaymentProcessor from "../PaymentProcessor";
import AmountSlider from "../AmountSlider";
import PropTypes from "prop-types";


class Confirm extends Component {
    state = {
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

                    <StudentForm onChange={(canSub, vals) => {
                        if (!this._mounted) {
                            return;
                        }

                        vals.student = {
                            "name": this.props.student.name
                        };

                        this._formdata = vals;

                        console.log(vals);

                        if (canSub !== this.state.canSubmit) {
                            this.setState({
                                canSubmit: canSub,
                            })
                        }


                    }}/>

                    <h3>
                        Your Donation: ${this.props.amount}
                    </h3>
                    <PaymentProcessor
                        disabled={!this.state.canSubmit}
                        category="student"
                        data={this._formdata}
                        student={this.props.student}
                        amount={this.props.amount}/>
                </div>
            </>
        )
    }
}

Confirm.propTypes = {
    student: PropTypes.object.required,
    amount: PropTypes.number.required
}

export default Confirm;
