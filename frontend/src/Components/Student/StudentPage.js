import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component, createRef, useEffect, useRef, useState} from "react";
import StudentForm from "./StudentForm";
import PaymentProcessor from "../PaymentProcessor";
import AmountSlider from "../AmountSlider";
import PropTypes from "prop-types";
import axios from "axios";
import Confirm from "./Confirm";

function StudentSelector(props) {
    const [roster, setRoster] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (roster.length === 0) {
            axios.get("/students")
                .then((resp) => {
                    setRoster(resp.data);
                })
        }
    })

    let filtered_roster = roster.filter((s) => {
        return s.name.toLowerCase().includes(search.toLowerCase());
    })

    return (
        <div className="student-selector" id="selector">
            <h2>Select student:</h2>
            <input type="text" value={search} placeholder="Search student..."
                   onChange={(e) => {
                       setSearch(e.target.value)
                   }}
            />
            {
                filtered_roster.map((student) =>
                    (
                        <>
                            <hr/>
                            <div className="student"
                                 onClick={(e) => {
                                     if (props.onSelect) {
                                         props.onSelect(student);
                                         setSearch("");
                                     }
                                 }}>
                                <h3>{student.name}</h3>
                                <h3 className="choose">{">"}</h3>
                            </div>
                        </>
                    )
                )
            }
        </div>
    )
}

function StudentPanel(props) {
    useEffect(() => {
        setTimeout(() => {
            let scrollto = document.getElementById("selector")
            let y = scrollto.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({top: y, behavior: 'smooth'});
        }, 100)
    }, [1])

    return (
        <div className="student-panel right" ref={props.ref}>
            <h3><span className="button back"
                      onClick={() => {
                          if (props.onBack) {
                              props.onBack();
                          }
                      }}>{"<"}</span>{props.student.name}</h3>

            <Confirm
                student={props.student}
            />
        </div>
    )
}


function StudentPage(props) {
    const [student, setStudent] = useState(null);
    let sp_ref = useRef();

    let heightStyle = student ? {
        height: `${sp_ref.current?.clientHeight}px`
    } : {}


    return (
        <div className="corpsponsor card right clip">
            <div className="student-flow">
                <div className={"panels " + (student ? "shift" : "")}
                     style={heightStyle}
                >
                    <StudentSelector onSelect={setStudent}/>
                    {(student !== null) ? (
                        <StudentPanel student={student}
                                      onBack={() => {
                                          setStudent(null);
                                      }}
                                      ref={sp_ref}
                        />
                    ) : null}
                </div>
            </div>

        </div>
    )
}

export default StudentPage;
