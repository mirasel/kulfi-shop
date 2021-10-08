import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "send") {
    return {
      data: null,
      message: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "success") {
    return {
      data: action.data,
      message: action.message,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "error") {
    return {
      data: null,
      message: action.message,
      error: action.error,
      status: "error",
    };
  }

  return state;
}

function useApi(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    message: null,
    status: startWithPending ? "pending" : null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: "send" });
      const response = await requestFunction(requestData);
      response.status
        ? dispatch({
            type: "success",
            data: response.data,
            message: response.message,
          })
        : dispatch({
            type: "error",
            message: response.message,
            error: response.errors || "Something went wrong!",
          });
    },
    [requestFunction]
  );

  return {
    ...httpState,
    sendRequest,
  };
}

export default useApi;
