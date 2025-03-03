import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css"; // Ensure this CSS file contains the styles for the login box
import { md5 } from "js-md5";

function Login() {
    const history = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        if (username === "") {
            alert("Username is empty!");
            return;
        }
        if (password === "") {
            alert("Password is empty!");
            return;
        }

        var hash = md5(password);
        try {
            await axios
                .post("http://localhost:5000/login", {
                    username,
                    password: hash,
                })
                .then((res) => {
                    if (res.data === "notmatch") {
                        alert("Wrong password");
                        return;
                    } else if (res.data === "notexist") {
                        alert("User does not exist");
                        return;
                    } else {
                        history("/Major", { state: { username: username } }); // Passes username to next page
                    }
                })
                .catch((e) => {
                    alert("An error occurred");
                    console.log(e);
                });
        } catch (e) {
            alert("An error occurred");
            console.log(e);
        }
    }

    return (
        <div className="login-container">
            {" "}
            {/* Added wrapper div for styling */}
            <div className="login-box">
                <h1>Login</h1>
                <form>
                    <input
                        className="textInput"
                        type="text"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Username"
                    />
                    <input
                        className="textInput"
                        type="password"
                        autoComplete="current-password webauthn"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                    />
                    <br />
                    <button
                        className="submitButton"
                        type="submit"
                        onClick={submit}
                    >
                        Sign In
                    </button>
                </form>
                <p className="register-link">
                    Don't have an account? <Link to="/signup">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
