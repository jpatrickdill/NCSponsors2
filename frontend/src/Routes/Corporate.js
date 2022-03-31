import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";
import CorpSponsor from "../Components/CorpSponsor";
import About from "../Components/About";

class Corporate extends Component {
    render() {
        return (
            <div className="corporate">
                <br id="#/corporate"/>
                <div className="flex-columns">
                    <About/>
                    <CorpSponsor />
                </div>
            </div>
        )
    }
}

export default Corporate;
