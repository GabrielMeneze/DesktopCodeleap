import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { getuser } from "../../models/features/redux-slice";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

export const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setButtonDisabled(value.length === 0);
    };

    const handleLoginClick = () => {
        dispatch(getuser(username));
        navigate('/mainscreen');
    };

    return (
        <main className="main">
            <video className="video-bg" src="../src/assets/videos/world.mp4" autoPlay muted loop></video>
            <section className="container-fluid d-flex flex-column justify-content-center align-items-center h-100">
                <header>
                    <h1 className="textcolor">Codeleap!</h1>
                </header>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card p-4 login col-lg-6 col-12">
                            <h4 className="card-title text-center textcolor">Access now</h4>
                            <label htmlFor="username" className="form-label textcolor">User name</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                            <button onClick={handleLoginClick} type="submit" className="btn btn-dark w-100" disabled={buttonDisabled}>Login</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}