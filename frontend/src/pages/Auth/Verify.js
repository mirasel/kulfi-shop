import React, { useEffect } from "react";
import { resendVerificationLink } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import { useAuthContext } from "../../contextApi/authContext";
import { toast } from "react-toastify";
import "./Verify.scss";

function Verify() {
  const auth = useAuthContext();
  const { status, message, error, sendRequest } = useApi(
    resendVerificationLink
  );

  useEffect(() => {
    if (status === "completed") {
      toast.success(message);
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status]);

  const resendHandler = () => {
    sendRequest(auth.accessToken);
  };
  return (
    <div className="verify">
      <div className="verify-content">
        <h1>Verify Your Email Address</h1>
        <p>
          Before proceeding, please check your email for a verification link.
        </p>
        <div>
          If you did not receive the email,{" "}
          <button className="resendBtn" onClick={resendHandler}>
            click here to request another.
          </button>
        </div>
      </div>
    </div>
  );
}

export default Verify;
