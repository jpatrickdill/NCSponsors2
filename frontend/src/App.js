import splash from "./img/blue-night.jpg";
import bannerlogo from "./img/banner-logo.png";
import "./App.scss";
import {Link, Route, Routes} from "react-router-dom";
import Corporate from "./Routes/Corporate";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import About from "./Components/About";
import axios from "axios";
import Receipt from "./Routes/Receipt";

// axios setup

let port = window.location.port;
if (window.location.port.toString() === "3001") {
    port = "3000";
} else if (window.location.port.toString() === "3000") {
    port = "3001";
}
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:${port}/api`;

// paypal options

const paypalOptions = {
    "client-id": "AWapugZds5MLS_bGQD-GoJmhEQKOIKmNzEV0zJVJTwW0F6_tItQ4Odig-oIjblzMHMNiqLAI6ld9RXyJ",
    currency: "USD",
    intent: "capture"
};


function App() {
    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div className="App">
                <nav>
                    <h3>
                        North Cobb Bands
                    </h3>
                </nav>
                <div className="splash">
                    <img src={splash} className="splash" alt="North Cobb Band Photo"/>
                    <div className="splash-content">
                        <h1>North Cobb Bands</h1>
                        {/*<img src={bannerlogo} alt="North Cobb Bands"/>*/}

                        <h2>
                            Camaraderie. Artistry. Excellence.
                        </h2>
                        <div className="options">
                            <Link to="/corporate">Sponsor the Band</Link>
                            <Link to="/student">Sponsor a Student</Link>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <Routes>
                        <Route path="/corporate" element={<Corporate/>}/>
                        <Route path="/student" element={null}/>
                        <Route path="/receipt/:rid" element={<Receipt/>}/>
                    </Routes>
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

export default App;
