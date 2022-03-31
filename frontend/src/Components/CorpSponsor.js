import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef} from "react";
import CorpForm from "./CorpForm";
import PaymentProcessor from "./PaymentProcessor";

const levels = [
    {
        amount: 175,
        name: "Bronze",
        perks: [
            "Company name, logo, website, social media on NCHS Bands website",
            "Optional flyers, promotional items, coupons provided to all band families"
        ],
        strict: []
    },
    {
        amount: 300,
        name: "Silver",
        perks: [],
        strict: ["Name on T-Shirt and home games banner"]
    },
    {
        amount: 500,
        name: "Gold",
        perks: [
            "Recognition at all home games"
        ],
        strict: ["Name on T-Shirt and home games banner"]
    },
    {
        amount: 750,
        name: "Platinum",
        perks: [
            "Booth at all home games and all band events",
            "Two complimentary tickets at all home games"
        ],
        strict: ["Medium logo on T-Shirt and home games banner"]
    },
    {
        amount: 1000,
        name: "Diamond",
        perks: [],
        strict: ["Large logo on T-Shirt and home games banner"]
    }
]

class Sponsor extends Component {
    state = {
        amount: 300,
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

    getLevel() {
        let perks = [];
        let lastLevel;

        for (let level of levels) {
            if (this.state.amount >= level.amount) {
                perks = perks.concat(level.perks);
                lastLevel = level;
            } else {
                return {
                    name: lastLevel.name,
                    ["perks"]: perks.concat(lastLevel.strict)
                }
            }
        }

        return {
            name: lastLevel.name,
            ["perks"]: perks.concat(lastLevel.strict)
        }
    }

    render() {
        let level = this.getLevel();

        return (
            <>
                <div className="corpsponsor card right">
                    <h2>Select amount:</h2>
                    <input type="range" min="175" max="1000"
                           value={this.state.amount}
                           onChange={(e) => {
                               this.setState({
                                   amount: Math.round(e.target.value / 25) * 25
                               });
                           }}
                    />
                    <h3 className="amount">
                        ${this.state.amount} - {level.name}
                    </h3>
                    {/*<h3 className="level">*/}
                    {/*    Sponsorship level:*/}
                    {/*    <span className="heading"> {level.name}</span>*/}
                    {/*</h3>*/}
                    <h3 className="heading">
                        {level.name} Level Perks
                    </h3>
                    <ul className="perks">
                        {level.perks.map(perk => {
                            return <li>
                                {perk}
                            </li>
                        })}
                    </ul>

                    <hr/>

                    <CorpForm onChange={(canSub, vals) => {
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
                        data={this._formdata}
                        amount={1}/>
                </div>
            </>
        )
    }
}

export default Sponsor;
