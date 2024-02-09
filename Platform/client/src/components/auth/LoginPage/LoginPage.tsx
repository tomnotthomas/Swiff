import './LoginPage.css';
import React, { useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useEffect } from 'react';
const cookies = new Cookies();

const Login: React.FC = (setLoggedSteam) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [login, setLogin] = useState(false);
    const [hasSubscription, setSubscription] =useState(false);

    useEffect(() => {
        // Fetch and check Steam ID when component mounts or userEmail changes
        fetch('http://localhost:3001/checksubscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: cookies.get('USER_DATA')?.email,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            setSubscription(data.hasSubscription); // Set hasSteam based on the response
          })
          .catch((error) => {
            console.error('Error checking subscription', error);
          });
      }, [cookies.get('USER_DATA')?.email]);
    

    const navigate = useNavigate();

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

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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

            const newUser = {email: data.email}

            // Reset the form
            setEmail("");
            setPassword("");
            setLogin(true);


            cookies.set("TOKEN", data.token, {
                path: "/",
            });

            cookies.set("USER_DATA", JSON.stringify(newUser), {
                path: "/",
            });
            if(hasSubscription){
                navigate('/')
            }else {
            navigate("/subscribe");
            }
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };


    return <div className={"mainContainer"}>
        <div id='background'></div>
        <div className ='login-form'>
        <div className={"titleContainer"}>
        </div>
        <div className={"inputContainer"}>
        <h1>Login</h1>
        <br />
            <div className="input-description-login">
            <MdOutlineEmail className='login-form-icon'/>
            <p className='input-description-login-text'>E-mail</p>
            </div>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
        <div className="input-description-login">
            <RiLockPasswordLine className='login-form-icon'/>
            <p className='input-description-login-text'>Password</p>
        </div>
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

        <div id='login-note'>
            <p className='login-note-to-register'>Don't have an account yet? Then go to the </p><Link className='login-note-to-register' to ='/register'> Register page</Link>
        </div>
        </div>
    </div>

}

export default Login