import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";
import StudentPage from "../Components/Student/StudentPage";
import About from "../Components/About";

class Student extends Component {
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
                    <div className="about left">
                        Please consider donating to an individual student. Your help supplements the costs of equipment,
                        maintenance costs, outside instruction, transportation expenses, competition/registration fees,
                        and much more. 100% of the donations provided here go directly to the student.
                    </div>
                    <StudentPage/>
                </div>
            </div>
        )
    }
}

export default Student;
