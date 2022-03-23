import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";

const levels = [
    {
        amount: 0,
        name: "Student",
        perks: []
    }
]

class Sponsor extends Component {
    state = {
        amount: 500,
    }

    getLevel() {
        let perks = [];
        let lastLevel;

        for (let level of levels) {
            if (this.state.amount > level.amount) {
                perks = level.perks.concat(perks);
                lastLevel = level;
            } else {
                return {
                    name: lastLevel.name,
                    ["perks"]: perks
                }
            }
        }

        return {
            name: lastLevel.name,
            ["perks"]: perks
        }
    }

    render() {
        let level = this.getLevel();

        return (
            <div className="corpsponsor card">
                <h2>Select amount:</h2>
                <input type="range" min="100" max="5000"
                       value={this.state.amount}
                       onChange={(e) => {
                           this.setState({
                               amount: Math.round(e.target.value/50)*50
                           });
                       }}
                />
                <h3 className="amount">
                    ${this.state.amount}
                </h3>
                {/*<h3 className="level">*/}
                {/*    Sponsorship level:*/}
                {/*    <span className="heading"> {level.name}</span>*/}
                {/*</h3>*/}
                <h3 className="heading">
                    {level.name} Level Perks
                </h3>
            </div>
        )
    }
}

export default Sponsor;
