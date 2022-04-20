import {Component} from "react";
import CorpSponsor from "../Components/CorpSponsor";
import About from "../Components/About";
import {useParams} from "react-router-dom";
import axios from "axios";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Receipt extends Component {
    state = {
        loading: true,
        error: null,
        data: {}
    }

    constructor(props) {
        super(props);

        axios.get(`/receipt/${props.params.rid}`)
            .then((resp) => {
                if (resp.data.data) {
                    this.setState({
                        loading: false,
                        data: JSON.parse(resp.data.data)
                    })

                    console.log(JSON.parse(resp.data.data));
                } else {
                    this.setState({
                        loading: false,
                        error: "Receipt not found."
                    })
                }
            })
            .catch((err) => {
                console.log(err);

                let msg = "Failed to load receipt information.";
                if (err.response.status === 404) {
                    msg = "Receipt not found.";
                }

                this.setState({
                    loading: false,
                    error: msg
                })
            })
    }


    render() {
        if (this.state.loading) {
            return (
                <div className="receipt">
                    <h2>Loading Donation Receipt...</h2>
                </div>
            )
        } else if (this.state.error) {
            return (
                <div className="receipt">
                    <h2>Error loading receipt.</h2>
                    <p>{this.state.error}</p>
                </div>
            )
        }

        let els = [];
        for (const [section, fields] of Object.entries(this.state.data.fields)) {
            if (section.startsWith("_")) {
                continue;
            }

            els.push((
                <h3 key={section}>{capitalize(section)}</h3>
            ))
            for (const [field, value] of Object.entries(fields)) {
                els.push((<>
                    {/*<h3 key={field}>{field}</h3>*/}
                    <p key={field + "v"}>{value}</p>
                </>))
            }
        }


        return (
            <>
                <div className="receipt card">
                    <h2>Donation Receipt</h2>

                    {els}
                </div>
                <br/>
            </>
        )
    }
}

export default (props) => (
    <Receipt
        {...props}
        params={useParams()}
    />
);
