import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef} from "react";
import StudentForm from "./StudentForm";
import PaymentProcessor from "../PaymentProcessor";
import PropTypes from "prop-types";
import AmountPrefills from "./AmountPrefills";

// Color Guard Equipment - $100
// Color Guard Costume - $200
// Marching Band Uniform - $50
// Meal Plan (full season) - $95
// Meal Plan (single game) - $9
// Music - $40
// Drill - $50
// Competition Expenses - $180
// Clinician Fees - $50
// Transportation - $60
// Show Props - $40
// Marching Shoes - $35
// Season Dri-Fit Shirt - $15

const donation_amounts = {
    "Uniform": 50,
    "Music": 40,
    "Drill": 50,
    "Shoes": 35,
    "Props": 40,
    "Transportation": 60,
    "Competitions": 180,
    "Show Shirt": 15,
    "Single Meal": 9,
    "Season's Meals": 90,
    "Guard Equipment": 100,
    "Guard Costume": 200
}


class Confirm extends Component {
    state = {
        canSubmit: false,
        amount: 0
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
                <div className="corpsponsor">
                    <AmountPrefills
                        choices={donation_amounts}
                        onTotal={(v) => {
                            this.setState({amount: v})
                        }}
                    />

                    <h4>Total: ${this.state.amount.toLocaleString("en-us")}</h4>


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
                        Your Donation: ${this.state.amount.toLocaleString("en-us")}
                    </h3>
                    <PaymentProcessor
                        disabled={!this.state.canSubmit}
                        category="student"
                        data={this._formdata}
                        student={this.props.student}
                        amount={this.state.amount}/>
                </div>
            </>
        )
    }
}

Confirm.propTypes = {
    //student: PropTypes.object.required
}

export default Confirm;
