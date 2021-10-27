import React, { useEffect, useRef } from "react";
import Card from "../../../components/UI/Card/Card";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import useApi from "../../../hook/useApi";
import useAuthForm from "../../../hook/useAuthForm";
import { resetPassword } from "../../../common/backendApi";
import DoubleRing from "../../../components/UI/Loading/DoubleRing";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetForm.scss";

function ResetForm() {
  console.log("from reset password");
  const { status, message, sendRequest } = useApi(resetPassword);
  const [input, dispatchInput] = useAuthForm();
  const query = new URLSearchParams(useLocation().search);
  const { token } = useParams();
  const emailValue = query.get("email");
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      toast.success("Your password has been reset. Please Login.");
      history.push("/login");
    }
    if (status === "error") {
      toast.error(message);
      history.push("/password/reset");
    }
  }, [status, message, history]);
  const handleReset = (event) => {
    event.preventDefault();
    if (input.password.isValid && input.cpassword.isValid) {
      sendRequest({
        email: emailValue,
        password: passwordRef.current.value(),
        password_confirmation: cpasswordRef.current.value(),
        token: token,
      });
    }
  };

  const handleSubmit = () => {
    dispatchInput({
      type: "resetPassword",
      password: passwordRef.current.value(),
      cpassword: cpasswordRef.current.value(),
    });
  };

  return (
    <div className="reset">
      <div className="reset-content">
        <h1>Reset Password</h1>
        <form onSubmit={handleReset}>
          <input type="hidden" value={token} />
          <div className="control">
            <label htmlFor="email">Email</label>
            <input type="text" value={emailValue} disabled />
          </div>
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
            <div className="button-error-div">
              {(!input.password.isValid || !input.cpassword.isValid) && (
                <div className="errors">
                  <p>
                    {input.password.error && (
                      <span>{input.password.error}</span>
                    )}
                  </p>
                  <p>
                    {input.cpassword.error && (
                      <span>{input.cpassword.error}</span>
                    )}
                  </p>
                </div>
              )}

              <Button type="submit" onClick={handleSubmit}>
                Reset
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetForm;
