import React, { useState, useEffect, useReducer } from "react";
import { logout } from "../common/backendApi";
import { lgetItem } from "../common/commonFunctions";
import useApi from "../hook/useApi";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: {},
  accessToken: null,
  setIsLoggedIn: (props) => {},
  setAccessToken: (props) => {},
  setIsVerified: (props) => {},
  onLogout: () => {},
});

const userReducer = (state, action) => {
  if (action.type === "setup") {
    return {
      id: action.value.id,
      name: action.value.name,
      isAdmin: action.value.isAdmin,
      isVerified: action.value.isVerified,
    };
  }
  if (action.type === "verified") {
    return {
      id: state.id,
      name: state.name,
      isAdmin: state.isAdmin,
      isVerified: action.value,
    };
  }
  return {
    id: null,
    name: null,
    isAdmin: false,
    isVerified: false,
  };
};

export const AuthContextProvider = (props) => {
  let { status, sendRequest } = useApi(logout);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, dispatchUser] = useReducer(userReducer, {
    id: null,
    name: null,
    isAdmin: false,
    isVerified: false,
  });
  const redirect = useHistory();

  useEffect(() => {
    if (lgetItem("il") === "1") {
      setIsLoggedIn(true);
      setAccessToken(lgetItem("at", true));
      dispatchUser({
        type: "setup",
        value: {
          id: parseInt(lgetItem("id")),
          name: lgetItem("name"),
          isAdmin: lgetItem("ia", true) === "yes" ? true : false,
          isVerified: lgetItem("iv", true) === "yes" ? true : false,
        },
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (status === "completed") {
      localStorage.clear();
      setIsLoggedIn(false);
      redirect.push("/");
    }
  }, [status, redirect]);

  function verifiedHandler(value) {
    dispatchUser({ type: "verified", value: value });
  }

  const logoutHandler = () => {
    sendRequest(accessToken);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        accessToken: accessToken,
        setIsLoggedIn: setIsLoggedIn,
        setAccessToken: setAccessToken,
        setIsVerified: verifiedHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;