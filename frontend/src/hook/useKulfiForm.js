import { useReducer } from "react";
import { isEmpty } from "../common/commonFunctions";

const inputReducer = (state, action = { type: "" }) => {
  switch (action.type) {
    case "submitAddKulfi":
      return {
        name: {
          isValid: !isEmpty(action.name) || action.name.length >= 3,
          error: isEmpty(action.name)
            ? "Kulfi name is required."
            : action.name.length < 3
            ? "Kulfi name must be greater than or equal 3 in length."
            : null,
        },
        description: {
          isValid: !isEmpty(action.description) || action.name.description >= 3,
          error: isEmpty(action.description)
            ? "A good description is required."
            : action.description.length < 3
            ? "Kulfi description must be greater than or equal 3 in length."
            : null,
        },
        price: {
          isValid: !isEmpty(action.price) || action.price >= 10,
          error: isEmpty(action.price)
            ? "Kulfi should have a price."
            : action.price < 10
            ? "Kulfi price needs to be 10 taka or more."
            : null,
        },
        image: {
          isValid: action.image !== null,
          error: action.image === null ? "Kulfi image is required." : null,
        },
        categories: {
          isValid: action.categories !== null,
          error:
            action.categories === null ? "Kulfi Category is required." : null,
        },
      };
    default:
      return {
        name: { isValid: null, error: null },
        description: { isValid: null, error: null },
        price: { isValid: null, error: null },
        image: { isValid: null, error: null },
        categories: { isValid: null, error: null },
      };
  }
};

const useAuthForm = () => {
  const [input, dispatchInput] = useReducer(inputReducer, {
    name: { isValid: null, error: null },
    description: { isValid: null, error: null },
    price: { isValid: null, error: null },
    image: { isValid: null, error: null },
    categories: { isValid: null, error: null },
  });

  return [input, dispatchInput];
};

export default useAuthForm;
