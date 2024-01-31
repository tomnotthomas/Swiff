import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function RegistrationPage() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validation
     // Set initial error values to empty
     setEmailError("")
     setPasswordError("")

     // Check if the user has entered both fields correctly
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



    const url: string = "http://localhost:3001/register"; // TODO: Change it

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
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setRegister(true);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(''); // Clear email error on input change
            }}
            placeholder="Enter email"
          />
          <label className="errorLabel">{emailError}</label>
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(''); // Clear password error on input change
            }}
            placeholder="Password"
          />
          <label className="errorLabel">{passwordError}</label>
        </Form.Group>

        {/* confirm password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              setPasswordConfirmError(''); // Clear password error on input change
            }}
            placeholder="Confirm Password"
          />
          <label className="errorLabel">{passwordConfirmError}</label>
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">Please provide your details</p>
        )}
      </Form>
    </>
  );
}


