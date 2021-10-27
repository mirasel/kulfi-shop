import { useReducer } from "react";
import { isEmpty } from "../common/commonFunctions";

const inputReducer = (state, action = { type: "" }) => {
  switch (action.type) {
    case "addKulfi":
      return {
        name: {
          isValid: !isEmpty(action.name) && action.name.length >= 3,
          error: isEmpty(action.name)
            ? "Kulfi name is required."
            : action.name.length < 3
            ? "Kulfi name must be greater than or equal 3 in length."
            : null,
        },
        description: {
          isValid:
            !isEmpty(action.description) && action.description.length >= 3,
          error: isEmpty(action.description)
            ? "A good description is required."
            : action.description.length < 3
            ? "Kulfi description must be greater than or equal 3 in length."
            : null,
        },
        price: {
          isValid: !isEmpty(action.price) && action.price >= 10,
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
          isValid: action.categories !== null && action.categories.length !== 0,
          error:
            action.categories === null || action.categories.length === 0
              ? "Kulfi Category is required."
              : null,
        },
      };

    case "updateKulfi":
      return {
        name: {
          isValid: !isEmpty(action.name) && action.name.length >= 3,
          error: isEmpty(action.name)
            ? "Kulfi name is required."
            : action.name.length < 3
            ? "Kulfi name must be greater than or equal 3 in length."
            : null,
        },
        description: {
          isValid:
            !isEmpty(action.description) && action.description.length >= 3,
          error: isEmpty(action.description)
            ? "A good description is required."
            : action.description.length < 3
            ? "Kulfi description must be greater than or equal 3 in length."
            : null,
        },
        price: {
          isValid: !isEmpty(action.price) && action.price >= 10,
          error: isEmpty(action.price)
            ? "Kulfi should have a price."
            : action.price < 10
            ? "Kulfi price needs to be 10 taka or more."
            : null,
        },
        categories: {
          isValid: action.categories.length !== 0,
          error:
            action.categories.length === 0
              ? "Kulfi Category is required."
              : null,
        },
      };
    default:
      return {
        name: { isValid: true, error: null },
        description: { isValid: true, error: null },
        price: { isValid: true, error: null },
        image: { isValid: true, error: null },
        categories: { isValid: true, error: null },
      };
  }
};

const useAuthForm = () => {
  const [input, dispatchInput] = useReducer(inputReducer, {
    name: { isValid: true, error: null },
    description: { isValid: true, error: null },
    price: { isValid: true, error: null },
    image: { isValid: true, error: null },
    categories: { isValid: true, error: null },
  });

  return [input, dispatchInput];
};

export default useAuthForm;
