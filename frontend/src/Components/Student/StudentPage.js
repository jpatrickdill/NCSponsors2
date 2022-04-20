import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef, useEffect, useState} from "react";
import StudentForm from "./StudentForm";
import PaymentProcessor from "../PaymentProcessor";
import AmountSlider from "../AmountSlider";
import PropTypes from "prop-types";
import axios from "axios";

function StudentSelector(props) {
    const [roster, setRoster] = useState([]);
    const [filtered_roster, setFiltered] = useState([]);

    useEffect(() => {
        if (roster.length === 0) {
            axios.get("/students")
                .then((resp) => {
                    setRoster(resp.data);
                    setFiltered(resp.data);
                    console.log(resp.data)
                })
        }
    })

    return (
        <div className="student-selector">
            <h2>Select student:</h2>
            {
                filtered_roster.map((student) =>
                    (
                        <>
                            <hr/>
                            <div className="student">
                                <h3>{student.name}</h3>
                                <h3 className="choose"
                                    onClick={(e) => {
                                        if (props.onSelect) {
                                            props.onSelect(student);
                                        }
                                    }}
                                >{">"}</h3>
                            </div>
                        </>
                    )
                )
            }
        </div>
    )
}

function StudentPanel() {

}


function StudentPage(props) {
    return (
        <div className="corpsponsor card right">
            <StudentSelector/>
        </div>
    )
}

export default StudentPage;
