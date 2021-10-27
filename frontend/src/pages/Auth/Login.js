import React, { useEffect, useRef } from "react";
import { login } from "../../common/backendApi";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spin from "../../components/UI/Loading/Spin";
import useApi from "../../hook/useApi";
import { useAuthContext } from "../../contextApi/authContext";
import { Link, useHistory } from "react-router-dom";
import useAuthForm from "../../hook/useAuthForm";
import "./Login.scss";

function Login() {
  console.log("from login");
  const { data, status, error, sendRequest } = useApi(login);
  const [input, dispatchInput] = useAuthForm();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = useAuthContext();
  const redirect = useHistory();

  useEffect(() => {
    if (status === "completed") {
      auth.onLogin(data);
    }
    if (status === "error") {
      dispatchInput({ type: "responseLoginError", errorMsg: error });
    }
  }, [status, auth, redirect, data, error, dispatchInput]);

  const loginHandler = (event) => {
    event.preventDefault();
    if (input.email.isValid && input.password.isValid) {
      sendRequest({
        email: emailRef.current.value(),
        password: passwordRef.current.value(),
      });
    }
  };

  const submitHandler = () => {
    dispatchInput({
      type: "submitLogin",
      email: emailRef.current.value(),
      password: passwordRef.current.value(),
    });
  };
  return (
    // <div className="auth">
    <div className="login">
      <div className="login-content">
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <Input
            id="email"
            label="E-mail"
            type="text"
            isValid={input.email.isValid}
            ref={emailRef}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            isValid={input.password.isValid}
            ref={passwordRef}
          />
          {status === "pending" && (
            <div className="loading-inline">
              <Spin />
            </div>
          )}
          {status !== "pending" && (
            <div className="button-error-div">
              {(!input.email.isValid || !input.password.isValid) && (
                <div className="errors">
                  <p>{input.email.error && <span>{input.email.error}</span>}</p>
                  <p>
                    {input.password.error && (
                      <span>{input.password.error}</span>
                    )}
                  </p>
                </div>
              )}
              <div className="loginBtn">
                <Button type="submit" onClick={submitHandler}>
                  Login
                </Button>
                <Link to="/password/reset">Forgot Password?</Link>
              </div>
            </div>
          )}
        </form>
        <div className="signupMsg">
          <p>New to Kulfizz?</p>
          <Link to="/signup">Create an Account.</Link>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Login;
