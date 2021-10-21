import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { lsetItem } from "../../common/commonFunctions";
import DoubleRing from "../../components/UI/Loading/DoubleRing";
import { useAuthContext } from "../../contextApi/authContext";

function Verified() {
  const auth = useAuthContext();
  const { userId } = useParams();
  const redirect = useHistory();

  useEffect(() => {
    if (+auth.user.id === +userId) {
      console.log("here");
      lsetItem("iv", "yes", true);
      auth.setIsVerified(true);
      redirect.push("/");
    } else {
      redirect.push("/");
    }
  }, [auth, userId, redirect]);
  return (
    <React.Fragment>
      <DoubleRing />
    </React.Fragment>
  );
}

export default Verified;
