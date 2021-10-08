import React, { useState } from "react";
import { login } from "../../common/backendApi";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import useApi from "../../hook/useApi";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { data, message, status, error, sendRequest } = useApi(login);

  function loginHandler(event) {
    event.preventDefault();
    sendRequest({
      email: emailValue,
      password: passwordValue,
    });
  }
  return (
    <Card>
      {status === "pending" && <p>Loading..</p>}
      {(status === "error" || status === null) && (
        <form onSubmit={loginHandler}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          {error && <div>{error.password}</div>}
          {message && <div>{message}</div>}
          <Button type="submit">Login</Button>
        </form>
      )}

      {data && <div>{data.access_token}</div>}
    </Card>
  );
}

export default Login;
