import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { zones } from "./zones.tsx";
import "./RegistrationPage.css"
import { Link } from 'react-router-dom';

import { MdOutlineEmail } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRepeat } from "react-icons/fa6";
import { MdStart } from "react-icons/md";



export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validation
     setEmailError("")
     setPasswordError("")


     if ("" === email) {
        setEmailError("Please enter your email");
        return;
     }

     if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email");
        return;
     }

     if ("" === password) {
        setPasswordError("Please enter a password");
        return;
     }

     if (password.length < 7) {
        setPasswordError("The password must be 8 characters or longer");
        return;
     }

     if (passwordConfirm && passwordConfirm !== password) {
        setPasswordConfirmError("The passwords don't match")
        return
     }


    const url: string = "http://localhost:3001/register";

    try {
      const response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          zone: selectedCity,
        }),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setRegister(true);
        window.location.href = "/login"

      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='container-registration'>
      <div id='background'></div>
    <div className ='registration-form'>
      <div className='registration-content'>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
        <div className='input-description'>
          <MdOutlineEmail className='icon-register' />
          <Form.Label className='registration-form-label'>
            Email address<br></br></Form.Label>
          </div>
          <Form.Control
            className='register-input-field'
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(''); // Clear email error on input change
            }}
            placeholder="Enter email"
          />
          <label className="errorLabel"><br></br>{emailError}</label>
        </Form.Group>

        {/* zone */}
        <Form.Group controlId="formBasicCity">
        <div className='input-description'>
        <FaCity className='icon-register' />
          <Form.Label className='registration-form-label'>
            Nearest city<br></br></Form.Label>
            </div>
          <Form.Control
            className='register-input-field'
            as="select"
            name="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select a city<br></br></option>
            {zones.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
        <div className='input-description'>
        <RiLockPasswordLine className='icon-register' />
          <Form.Label className='registration-form-label'>
            Password<br></br></Form.Label>
            </div>
          <Form.Control
            className='register-input-field'
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(''); // Clear password error on input change
            }}
            placeholder="Password"
          />
          <label className="errorLabel"><br></br>{passwordError}</label>
        </Form.Group>

        {/* confirm password */}
        <Form.Group controlId="formBasicPassword">
        <div className='input-description'>
        <FaRepeat className='icon-register' />

          <Form.Label className='registration-form-label'>
            Confirm Password<br></br></Form.Label>
        </div>

          <Form.Control
            className='register-input-field'
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setPasswordConfirmError(''); // Clear password error on input change
            }}
            placeholder="Confirm Password"
          />
          <label className="errorLabel"><br></br>{passwordConfirmError}</label>
        </Form.Group>

        {/* submit button */}
        <Button
          className = 'register-button'
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          >Register<MdStart />
        </Button>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">Please provide your details</p>
        )}
        <div id='registration-note'>
        <p className='registration-note-to-login'>Already have an account? Then go to the </p><Link className='registration-note-to-login' to ='/login'> login page</Link>
        </div>
      </Form>
    </div>
    </div>
    </div>
  );
}


