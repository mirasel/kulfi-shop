import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { FaWindowClose, FaUpload } from "react-icons/fa";
import "./AddKulfi.scss";
import MultiSelect from "../../components/MultiSelectOption/MultiSelect";
import { addKulfi, readCategories } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import useKulfiForm from "../../hook/useKulfiForm";
import { useAuthContext } from "../../contextApi/authContext";
import { toast } from "react-toastify";
import DoubleRing from "../../components/UI/Loading/DoubleRing";

function AddKulfi() {
  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const [imagefile, setImagefile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const {
    status: catStatus,
    data: categories,
    sendRequest: catSendRequest,
  } = useApi(readCategories);
  const {
    status: kulfiStatus,
    message: kulfiMessage,
    error: kulfiError,
    sendRequest: kulfiSendRequest,
  } = useApi(addKulfi);
  const [input, dispatchInput] = useKulfiForm();
  const auth = useAuthContext();

  useEffect(() => {
    catSendRequest();
  }, [catSendRequest]);

  useEffect(() => {
    if (imagefile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(imagefile);
    } else {
      setImgPreview(null);
    }
  }, [imagefile]);

  useEffect(() => {
    if (kulfiStatus === "completed") {
      toast.success(kulfiMessage);
      nameRef.current.setValue("");
      descriptionRef.current.setValue("");
      priceRef.current.setValue("");
      setImagefile(null);
      setImgPreview(null);
      setOptionSelected(null);
    }
    if (kulfiStatus === "error") {
      if (kulfiError === null) {
        toast.error(kulfiMessage);
      } else {
        const err = kulfiError.name[0];
        toast.error(err);
      }
    }
  }, [kulfiStatus, kulfiMessage, kulfiError]);

  const handleAddKulfi = (event) => {
    event.preventDefault();
    if (
      input.name.isValid &&
      input.description.isValid &&
      input.price.isValid &&
      input.image.isValid &&
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
      kulfiSendRequest({
        data: formData,
        token: auth.accessToken,
      });
    }
  };

  const handleSubmit = () => {
    dispatchInput({
      type: "addKulfi",
      name: nameRef.current.value(),
      description: descriptionRef.current.value(),
      price: priceRef.current.value(),
      image: imagefile,
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

  return (
    <div className="add-kulfi">
      <div className="add-kulfi-content">
        <h1>Add Kulfi</h1>
        <form onSubmit={handleAddKulfi}>
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
                <img src={imgPreview} alt="Kulfi" />
                <FaWindowClose onClick={() => setImagefile(null)} />
              </div>
            ) : (
              <div
                className={`uploadBtn ${
                  !input.image.isValid ? "img-invalid" : ""
                } `}
              >
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
                options={catStatus === "completed" ? categories : []}
                allowSelectAll={true}
                onChange={handleCategoryChange}
                value={optionSelected}
              />
            </div>
          </div>
          {kulfiStatus === "pending" && <DoubleRing />}
          {kulfiStatus !== "pending" && (
            <div className="button-error-div">
              {(!input.name.isValid ||
                !input.description.isValid ||
                !input.price.isValid ||
                !input.image.isValid ||
                !input.categories.isValid) && (
                <div className="errors">
                  <p>{input.name.error && <span>{input.name.error}</span>}</p>

                  <p>
                    {input.description.error && (
                      <span>{input.description.error}</span>
                    )}
                  </p>

                  <p>{input.price.error && <span>{input.price.error}</span>}</p>
                  <p>{input.image.error && <span>{input.image.error}</span>}</p>
                  <p>
                    {input.categories.error && (
                      <span>{input.categories.error}</span>
                    )}
                  </p>
                </div>
              )}

              <Button className="addBtn" type="submit" onClick={handleSubmit}>
                Done
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddKulfi;
