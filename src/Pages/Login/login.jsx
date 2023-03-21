import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { getuser } from "../../features/redux-slice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

export const Login = () => {

    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setUsername(value);
        setButtonDisabled(value.length === 0);
    };

    const handleLoginClick = () => {
        dispatch(getuser(username));
        window.location.href = '/mainscreen';
    };

    return (
        <div className="main">
            <video className="video-bg" src="../src/assets/videos/mundo.mp4" autoPlay muted loop></video>
            <section className="container-fluid d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="h">Codeleap!</h1>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="card p-4 login col-lg-6 col-12">
                            <h4 className="card-title text-center h">Access now</h4>
                            <label htmlFor="username" className="form-label h">User name</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
                            <button onClick={handleLoginClick} type="submit" className="btn btn-dark w-100" disabled={buttonDisabled}>Login</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}