import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { FaWindowClose, FaUpload } from "react-icons/fa";
import "./AddKulfi.scss";
import MultiSelect from "../../components/MultiSelectOption/MultiSelect";
import { updateKulfi, IMAGE_URL } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import useKulfiForm from "../../hook/useKulfiForm";
import { useAuthContext } from "../../contextApi/authContext";
import { toast } from "react-toastify";
import DoubleRing from "../../components/UI/Loading/DoubleRing";
import { useHistory } from "react-router-dom";

function UpdateKulfiForm(props) {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const [imagefile, setImagefile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const [input, dispatchInput] = useKulfiForm();
  const { status, message, sendRequest } = useApi(updateKulfi);
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    nameRef.current.setValue(props.kulfi.name);
    descriptionRef.current.setValue(props.kulfi.description);
    priceRef.current.setValue(props.kulfi.price);
    setImagefile(`${IMAGE_URL}/${props.kulfi.image}`);
    setOptionSelected(props.defaultCategories);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      toast.success(message);
      history.push("/dashboard/kulfis");
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status, message]);

  useEffect(() => {
    if (imagefile) {
      if (typeof imagefile !== "string") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgPreview(reader.result);
        };
        reader.readAsDataURL(imagefile);
      } else {
        setImgPreview(imagefile);
      }
    } else {
      setImgPreview(null);
    }
  }, [imagefile]);

  const handleUpdateKulfi = (event) => {
    event.preventDefault();
    if (
      input.name.isValid &&
      input.description.isValid &&
      input.price.isValid &&
      input.categories.isValid
    ) {
      let formData = new FormData();
      formData.append("name", nameRef.current.value());
      formData.append("description", descriptionRef.current.value());
      formData.append("price", priceRef.current.value());
      formData.append("image", imagefile);
      formData.append(
        "categories",
        optionSelected.map((item) => item.value)
      );
      sendRequest({
        id: props.id,
        data: formData,
        token: auth.accessToken,
      });
    }
  };

  const handleSubmit = () => {
    dispatchInput({
      type: "updateKulfi",
      name: nameRef.current.value(),
      description: descriptionRef.current.value(),
      price: priceRef.current.value(),
      categories: optionSelected,
    });
  };

  const handleImageInput = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImagefile(file);
    } else {
      setImagefile(null);
    }
  };

  const handleCategoryChange = (selected) => {
    setOptionSelected(selected);
  };

  const removeImage = () => {
    setImagefile(null);
    setImgPreview(null);
  };

  return (
    <React.Fragment>
      <h1>Update Kulfi</h1>
      <form onSubmit={handleUpdateKulfi}>
        <Input
          id="name"
          label="Kulfi Name"
          type="text"
          isValid={input.name.isValid}
          ref={nameRef}
        />
        <Input
          id="description"
          label="Description"
          type="text"
          isValid={input.description.isValid}
          ref={descriptionRef}
        />
        <Input
          id="price"
          label="Kulfi Price"
          type="number"
          min="10.0"
          step="0.01"
          isValid={input.price.isValid}
          ref={priceRef}
        />
        <div className="kulfi-image">
          <label htmlFor="kulfi_image">Kulfi Image</label>
          {imgPreview ? (
            <div className="img-div">
              <img src={imgPreview} alt="Kulfi" width="200px" height="100px" />
              <FaWindowClose onClick={removeImage} />
            </div>
          ) : (
            <div className={`uploadBtn`}>
              <FaUpload onClick={() => imageRef.current.click()} />
            </div>
          )}
          <input
            type="file"
            style={{ display: "none" }}
            ref={imageRef}
            accept="image/*"
            onChange={handleImageInput}
          />
        </div>
        <div className="kulfi-category">
          <label htmlFor="kulfi_category">Categories</label>
          <div
            className={`category-input-div ${
              !input.categories.isValid ? "cat-invalid" : ""
            } `}
          >
            <MultiSelect
              options={props.categories}
              allowSelectAll={true}
              onChange={handleCategoryChange}
              value={optionSelected}
            />
          </div>
        </div>
        {status === "pending" && <DoubleRing />}
        {status !== "pending" && (
          <div className="button-error-div">
            {(!input.name.isValid ||
              !input.description.isValid ||
              !input.price.isValid ||
              !input.categories.isValid) && (
              <div className="errors">
                <p>{input.name.error && <span>{input.name.error}</span>}</p>

                <p>
                  {input.description.error && (
                    <span>{input.description.error}</span>
                  )}
                </p>

                <p>{input.price.error && <span>{input.price.error}</span>}</p>
                <p>
                  {input.categories.error && (
                    <span>{input.categories.error}</span>
                  )}
                </p>
              </div>
            )}

            <Button type="submit" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        )}
      </form>
    </React.Fragment>
  );
}

export default UpdateKulfiForm;
