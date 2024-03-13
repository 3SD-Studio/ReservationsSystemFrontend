import React from "react";

import "./Login.css";
import { logUser } from "../../functions/ApiUtils";

/**
 * Renders the login component.
 * 
 * @returns {JSX.Element} The login component.
 */
export function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      <button onClick={() => {
        if (email === "" || password === "") {
          alert("Please fill all fields");
          return;
        }
        logUser(email, password)
      }}>Login</button>
    </div>
  )
}