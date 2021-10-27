import React, { useEffect, useState, useRef } from "react";
import Card from "../../../components/UI/Card/Card";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import useApi from "../../../hook/useApi";
import { emailForResetPassword } from "../../../common/backendApi";
import { emailCheck, isEmpty } from "../../../common/commonFunctions";
import "./EmailForm.scss";
import { toast } from "react-toastify";

function EmailForm() {
  console.log("from email reset password");
  const { status, message, error, sendRequest } = useApi(emailForResetPassword);
  const emailRef = useRef();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (status === "completed") {
      toast.success(message);
    }
    if (status === "error") {
      setEmailIsValid(false);
      setErrorMsg(error.email);
    }
  }, [status, error]);

  const handleEmail = (event) => {
    event.preventDefault();
    if (emailIsValid) {
      sendRequest({
        email: emailRef.current.value(),
      });
    }
  };

  const handleSubmit = () => {
    if (isEmpty(emailRef.current.value())) {
      setErrorMsg("Email is required.");
      setEmailIsValid(false);
    } else if (emailCheck(emailRef.current.value())) {
      setErrorMsg("Please give a valid email.");
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }
  };
  return (
    <div className="reset-password">
      <div className="reset-password-content">
        <h1>Reset Password</h1>
        <form onSubmit={handleEmail}>
          <Input
            id="email"
            label="E-mail"
            type="text"
            isValid={emailIsValid}
            ref={emailRef}
          />
          <div className="button-error-div">
            {!emailIsValid && (
              <div className="errors">
                <p>{errorMsg}</p>
              </div>
            )}
            <Button type="submit" onClick={handleSubmit}>
              Send Password Reset Email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmailForm;
