import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import { md5 } from "js-md5";

function Signup() {
    const history = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userIsClubLeader, setUserIsClubLeader] = useState(false);

    async function submit(e) {
        e.preventDefault();

        try {
            if (username === "") {
                alert("Username is empty!");
                return;
            }
            if (email === "") {
                alert("Email is empty!");
                return;
            }
            if (password === "") {
                alert("Password is empty!");
                return;
            }
            if (password.length < 8) {
                alert("Password must be at least 8 characters long!");
                return;
            }

            if (password.search(/[a-z]/i) < 0) {
                alert("Password must contain at least one letter!");
                return;
            }

            if (password.search(/[0-9]/) < 0) {
                alert("Password must contain at least one digit!");
                return;
            }

            if (password.search(/[!@#$%^&*.]/) < 0) {
                alert("Password must contain at least one special character!");
                return;
            }

            var hash = md5(password);
            await axios
                .post("http://localhost:5000/signup", {
                    username,
                    email,
                    password: hash,
                })
                .then((res) => {
                    if (res.data === "exist") {
                        alert("User already exists");
                    } else if (res.data === "notexist") {
                        // passes the username as the id in the next page
                        history("/", { state: { username: username } });
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
        <div className="signup-container">
            <div className="signup-box">
                <h1>Create an Account</h1>
                <form action="POST">
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
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                    />
                    <input
                        className="textInput"
                        type="password"
                        autoComplete="new-password webauthn"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                    />
                    <input
                        className="submitButton"
                        type="submit"
                        onClick={submit}
                    />
                </form>
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
}

export default Signup;
