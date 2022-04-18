import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";
import DonoPage from "../Components/DonoPage";
import About from "../Components/About";

class Basic extends Component {
    componentDidMount() {
        setTimeout(() => {
            let scrollto = document.getElementById("pagetop")
            let y = scrollto.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({top: y, behavior: 'smooth'});
        }, 100)
    }

    render() {
        return (
            <div className="corporate">
                <br id="pagetop"/>
                <div className="flex-columns">
                    <About/>
                    <DonoPage/>
                </div>
            </div>
        )
    }
}

export default Basic;
