import React, { useContext, useEffect, useRef } from "react";
import { login } from "../../common/backendApi";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import DoubleRing from "../../components/UI/Loading/DoubleRing";
import { saveCommonData } from "../../common/commonFunctions";
import useApi from "../../hook/useApi";
import AuthContext from "../../contextApi/authContext";
import { useHistory } from "react-router-dom";
import useAuthForm from "../../hook/useAuthForm";

function Login() {
  const { data, status, error, sendRequest } = useApi(login);
  const [input, dispatchInput] = useAuthForm();
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = useContext(AuthContext);
  const redirect = useHistory();

  useEffect(() => {
    if (status === "completed") {
      saveCommonData(data);
      auth.setIsLoggedIn(true);
      redirect.push("/");
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
    <React.Fragment>
      <Card>
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
          {status === "pending" && <DoubleRing />}
          {status !== "pending" && (
            <div>
              <div>
                <p>{input.email.error && <span>{input.email.error}</span>}</p>
                <p>
                  {input.password.error && <span>{input.password.error}</span>}
                </p>
              </div>
              <Button type="submit" onClick={submitHandler}>
                Login
              </Button>
            </div>
          )}
        </form>
      </Card>
    </React.Fragment>
  );
}

export default Login;
