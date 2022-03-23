import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";

class About extends Component {
    state = {

    }

    render() {
        return (
            <div className="about">
                <h2>Why Sponsor the North Cobb Band?</h2>
            </div>
        )
    }
}

export default About;
