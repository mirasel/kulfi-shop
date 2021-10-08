import React, { useEffect, useReducer, useState, useCallback } from "react";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 7 };
  }
  return { value: "", isValid: false };
};

function UserForm(props) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking validity!!!");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = useCallback((event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  }, []);

  const passwordChangeHandler = useCallback((event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  }, []);

  const validateEmailHandler = useCallback(() => {
    dispatchEmail({ type: "INPUT_BLUR" });
  }, []);

  const validatePasswordHandler = useCallback(() => {
    dispatchPassword({ type: "INPUT_BLUR" });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(emailState.value, passwordState.value);
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-mail"
          type="email"
          value={emailState.value}
          isValid={emailState.isValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          required={true}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          required={true}
        />
        <Button type="submit" disable={!formIsValid}>
          Login
        </Button>
      </form>
    </Card>
  );
}

export default React.memo(UserForm);
