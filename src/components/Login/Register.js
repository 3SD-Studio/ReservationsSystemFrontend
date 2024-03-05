import React from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const registerUser = () => {
    if (email === "" || password === "" || firstName === "" || lastName === "") {
      alert("Please fill all fields");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password,
      "firstName": firstName,
      "lastName": lastName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/register", requestOptions)
      .then(response => {
        if (response.status === 200) {
          navigate('/rooms');
        }
        else {
          alert("Email already in use or invalid, please try again");
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className="formBox">
      <form >
        <label>First Name:</label>
        <br />
        <input type="text" name="firstName" id="firstName" value={firstName}
          onChange={(text) => setFirstName(text.target.value)} />
        <br />
        <label>Last Name:</label>
        <br />
        <input type="text" name="lastName" id="lastName" value={lastName}
          onChange={(text) => setLastName(text.target.value)} />
        <br />
        <label>E-mail:</label>
        <br />
        <input type="text" name="email" id="email" value={email}
          onChange={(text) => setEmail(text.target.value)} />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" name="password" id="password"
          value={password} onChange={(text) => { setPassword(text.target.value) }} />
      </form>
      <button onClick={() => { registerUser() }}>Register</button>
    </div>
    )

}