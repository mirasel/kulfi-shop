import React, { useEffect, useContext, useRef } from "react";
import { register } from "../../common/backendApi";
import { saveCommonData } from "../../common/commonFunctions";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import useApi from "../../hook/useApi";
import useAuthForm from "../../hook/useAuthForm";
import AuthContext from "../../contextApi/authContext";
import { useHistory } from "react-router-dom";
import DoubleRing from "../../components/UI/Loading/DoubleRing";

function Signup() {
  const { status, data, error, sendRequest } = useApi(register);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const [input, dispatchInput] = useAuthForm();
  const auth = useContext(AuthContext);
  const redirect = useHistory();

  useEffect(() => {
    if (status === "completed") {
      saveCommonData(data);
      auth.setIsLoggedIn(true);
      redirect.push("/");
    }
    if (status === "error") {
      dispatchInput({ type: "responseRegisterError", errorMsg: error.email });
    }
  }, [status, auth, redirect, data, error, dispatchInput]);

  const registerHandler = (event) => {
    event.preventDefault();
    if (
      input.name.isValid &&
      input.email.isValid &&
      input.password.isValid &&
      input.cpassword.isValid
    ) {
      sendRequest({
        name: nameRef.current.value(),
        email: emailRef.current.value(),
        password: passwordRef.current.value(),
        password_confirmation: cpasswordRef.current.value(),
      });
    }
  };

  const submitHandler = () => {
    dispatchInput({
      type: "submitRegister",
      name: nameRef.current.value(),
      email: emailRef.current.value(),
      password: passwordRef.current.value(),
      cpassword: cpasswordRef.current.value(),
    });
  };

  return (
    <Card>
      <form onSubmit={registerHandler}>
        <Input
          id="name"
          label="Full Name"
          type="text"
          isValid={input.name.isValid}
          ref={nameRef}
        />
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

        <Input
          id="password_confirmation"
          label="Confirm Password"
          type="password"
          isValid={input.cpassword.isValid}
          ref={cpasswordRef}
        />
        {status === "pending" && <DoubleRing />}
        {status !== "pending" && (
          <div>
            <div>
              <p>{input.name.error && <span>{input.name.error}</span>}</p>

              <p>{input.email.error && <span>{input.email.error}</span>}</p>

              <p>
                {input.password.error && <span>{input.password.error}</span>}
              </p>
              <p>
                {input.cpassword.error && <span>{input.cpassword.error}</span>}
              </p>
            </div>

            <Button type="submit" onClick={submitHandler}>
              Register
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
}

export default Signup;
