import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";

import blueday from "./../img/blue-day.jpg";
import fullband from "./../img/fullband.jpg";

class About extends Component {
    state = {}

    render() {
        return (
            <div className="about left">
                <h2>About the North Cobb Band</h2>
                <p>
                    Founded in 1958, The North Cobb Band Program has been a staple for high quality music education in
                    the Kennesaw community for decades.
                </p>
                <img src={blueday}/>
                <p>The program consistently strives for and achieves high honors
                    and awards through dedication, commitment, and an exceptional degree of musical and academic
                    achievement.
                </p>
                <img src={fullband}/>
                <p>
                    Students in the North Cobb High School Band can participate in a wide range of music
                    education experiences, including marching band and color guard, jazz band, 4 concert bands,
                    winterguard, and with your help, even more!
                </p>
            </div>
        )
    }
}

export default About;
