import { useReducer } from "react";
import { isEmpty, emailCheck, passwordCheck } from "../common/commonFunctions";

const inputReducer = (state, action = { type: "" }) => {
  switch (action.type) {
    case "submitLogin":
      return {
        email: {
          isValid: !(emailCheck(action.email) || isEmpty(action.email)),
          error: isEmpty(action.email)
            ? "Email is Required"
            : emailCheck(action.email)
            ? "Please enter a valid email address"
            : null,
        },
        password: {
          isValid: !isEmpty(action.password),
          error: isEmpty(action.password) ? "Password is Required" : null,
        },
      };
    case "responseLoginError":
      return {
        email: {
          isValid: false,
          error: action.errorMsg,
        },
        password: {
          isValid: false,
          error: null,
        },
      };
    case "submitRegister":
      return {
        name: {
          isValid: !isEmpty(action.name),
          error: isEmpty(action.name) ? "Your Name is Required" : null,
        },
        email: {
          isValid: !(emailCheck(action.email) || isEmpty(action.email)),
          error: isEmpty(action.email)
            ? "Email is Required"
            : emailCheck(action.email)
            ? "Please enter a valid email address"
            : null,
        },
        password: {
          isValid: !(
            passwordCheck(action.password) || isEmpty(action.password)
          ),
          error: isEmpty(action.password)
            ? "Password is Required"
            : passwordCheck(action.password)
            ? "Password should be greater than or equal 8 character"
            : null,
        },
        cpassword: {
          isValid: !(
            isEmpty(action.cpassword) || action.cpassword !== action.password
          ),
          error:
            isEmpty(action.cpassword) || action.cpassword !== action.password
              ? "Both password doesn't match"
              : null,
        },
      };
    case "responseRegisterError":
      return {
        name: state.name,
        email: {
          isValid: false,
          error: action.errorMsg,
        },
        password: state.password,
        cpassword: state.cpassword,
      };
    case "resetPassword":
      return {
        password: {
          isValid: !(
            passwordCheck(action.password) || isEmpty(action.password)
          ),
          error: isEmpty(action.password)
            ? "Password is Required"
            : passwordCheck(action.password)
            ? "Password should be greater than or equal 8 character"
            : null,
        },
        cpassword: {
          isValid: !(
            isEmpty(action.cpassword) || action.cpassword !== action.password
          ),
          error:
            isEmpty(action.cpassword) || action.cpassword !== action.password
              ? "Both password doesn't match"
              : null,
        },
      };
    default:
      return {
        name: { isValid: true, error: null },
        email: { isValid: true, error: null },
        password: { isValid: true, error: null },
        cpassword: { isValid: true, error: null },
      };
  }
};

const useAuthForm = () => {
  const [input, dispatchInput] = useReducer(inputReducer, {
    name: { isValid: true, error: null },
    email: { isValid: true, error: null },
    password: { isValid: true, error: null },
    cpassword: { isValid: true, error: null },
  });

  return [input, dispatchInput];
};

export default useAuthForm;
