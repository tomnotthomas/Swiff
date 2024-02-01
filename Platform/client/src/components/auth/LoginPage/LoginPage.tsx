import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [login, setLogin] = useState(false);

    const onButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        const url: string = "http://localhost:3001/auth";

        try {
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email,
            password,
            }),
        });

        if (response.ok) {
            const data = await response.json()
            setEmail("");
            setPassword("");
            setLogin(true);
            cookies.set("TOKEN", data.token, {
                path: "/",
              });
            window.location.href = "/"

        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };


    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                type="password"
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}
    </div>
}

export default Login