import splash from "./img/nc-xl.jpg";
import bannerlogo from "./img/banner-logo.png";
import "./App.scss";
import {Link, Route, Routes} from "react-router-dom";
import Corporate from "./Routes/Corporate";
import About from "./Components/About";

function App() {
    return (
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
                </Routes>
            </div>
        </div>
    );
}

export default App;
