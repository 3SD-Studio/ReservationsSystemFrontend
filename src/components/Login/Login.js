import React from "react";

import "./Login.css";

export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const logUser = () => {
    if (email === "" || password === "") {
      alert("Please fill all fields");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/login", requestOptions)
      .then(response => {
        if (response.status === 200) {
          response.text()
          .then((text) => {
            let token = JSON.parse(text);
            localStorage.setItem('token', token['token']);
            console.log(localStorage.getItem('token'));
          })
          window.location.href = '/rooms';
        }
        else {
          alert("Wrong email or password");
        }
      })
      .catch(error => console.log('error', error));

  }

  return (
    <div className="formBox">
      <form >
        <label>E-mail:</label>
        <br />
        <input type="text" name="email" id="email" value={email}
          onChange={(text) => setEmail(text.target.value)} />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" name="password" id="password"
          value={password} onChange={(text) => {
            setPassword(text.target.value)
          }} />
      </form>
      <button onClick={() => { logUser() }}>Login</button>
    </div>
  )
}