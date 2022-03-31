import {Link, Route, Routes} from "react-router-dom";
import {BrowserView, MobileView} from 'react-device-detect';
import {Component} from "react";
import {PayPalButtons} from "@paypal/react-paypal-js";

import axios from "axios";

class PaymentProcessor extends Component {
    state = {
        trans_id: null
    }

    componentDidMount() {
        // generate blank transaction to fill with form details upon payment completion

        axios.get("/session")
            .then((resp) => {
                this.setState({trans_id: resp.data.id})

                console.log(resp.data.id);
            })
    }

    api_url() {
        return axios.defaults.baseURL + `/receipt/${this.state.trans_id}`;
    }

    receipt_url() {
        return axios.defaults.baseURL + `/receipt/${this.state.trans_id}`;
    }

    render() {
        if (this.props.disabled) {
            return <h4>
                Complete form to finish donation.
            </h4>;
        }

        console.log(this.props.data)

        return (
            <>
                <p>{this.state.trans_id}</p>
                <PayPalButtons
                    disabled={false}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: this.props.amount,
                                            breakdown: {
                                                item_total: {
                                                    currency_code: "USD",
                                                    value: this.props.amount,
                                                },
                                            },
                                        },
                                        items: [
                                            {
                                                name: this.receipt_url(),
                                                quantity: "1",
                                                unit_amount: {
                                                    currency_code: "USD",
                                                    value: this.props.amount,
                                                },
                                                category: "DONATION",
                                            },
                                        ],
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the donation
                                return orderId;
                            });
                    }}
                    onApprove={(data, actions) => {
                        axios.post(this.api_url(), this.props.data, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then((resp) => {
                                window.location.href = this.receipt_url();
                            })
                    }}
                />
            </>
        )
    }
}

export default PaymentProcessor;
