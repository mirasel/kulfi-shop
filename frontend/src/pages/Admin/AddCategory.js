import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addCategory } from "../../common/backendApi";
import { isEmpty } from "../../common/commonFunctions";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import { useAuthContext } from "../../contextApi/authContext";
import useApi from "../../hook/useApi";
import "./AddCategory.scss";

function AddCategory() {
  const categoryRef = useRef();
  const { data, message, status, error, sendRequest } = useApi(addCategory);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const auth = useAuthContext();
  useEffect(() => {
    if (status === "completed") {
      categoryRef.current.setValue("");
      toast.success("category is created");
    }
    if (status === "error") {
      if (error === null) {
        toast.error(message);
      } else {
        toast.error(error.name[0]);
        setNameIsValid(false);
      }
    }
  }, [status, data, message, error]);

  const handleAddCategory = (event) => {
    event.preventDefault();
    if (nameIsValid) {
      sendRequest({
        data: { name: categoryRef.current.value() },
        token: auth.accessToken,
      });
    }
  };

  const handleSubmit = () => {
    if (isEmpty(categoryRef.current.value())) {
      setNameIsValid(false);
      setErrorMsg("Category name is required.");
    } else if (categoryRef.current.value().length < 3) {
      setNameIsValid(false);
      setErrorMsg("The length of name must be greater than or equal 3.");
    } else {
      setNameIsValid(true);
      setErrorMsg(null);
    }
  };

  return (
    <div className="add-category">
      <div className="add-category-content">
        <h1>Add a Category</h1>
        <form onSubmit={handleAddCategory}>
          <Input
            id="name"
            label="Category Name"
            type="text"
            isValid={nameIsValid}
            ref={categoryRef}
          />
          <div className="button-error-div">
            {errorMsg && (
              <div className="errors">
                <p>{errorMsg}</p>
              </div>
            )}
            <Button type="submit" onClick={handleSubmit}>
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
