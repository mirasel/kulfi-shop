import React, { useContext } from "react";
import { resendVerificationLink } from "../../common/backendApi";
import Card from "../../components/UI/Card/Card";
import useApi from "../../hook/useApi";
import AuthContext from "../../contextApi/authContext";
import "./Verify.scss";

function Verify() {
  console.log("from verify");
  const auth = useContext(AuthContext);
  const { message, error, sendRequest } = useApi(resendVerificationLink);

  const resendHandler = () => {
    sendRequest(auth.accessToken);
  };
  return (
    <Card>
      {error === null && message && <div>{message}</div>}
      <h1>Verify Your Email Address</h1>
      <p>Before proceeding, please check your email for a verification link.</p>
      <div>
        If you did not receive the email,{" "}
        <button className="resendBtn" onClick={resendHandler}>
          {" "}
          click here to request another
        </button>
        .{error && <div>{error}</div>}
      </div>
    </Card>
  );
}

export default Verify;
