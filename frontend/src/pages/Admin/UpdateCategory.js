import React, { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { getCategoryToUpdate } from "../../common/backendApi";
import { useParams } from "react-router-dom";
import UpdateCategoryForm from "./UpdateCategoryForm";
import Spin from "../../components/UI/Loading/Spin";

function UpdateCategory() {
  const { status, data, sendRequest } = useApi(getCategoryToUpdate);
  const [infoValid, setInfoValid] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    sendRequest(categoryId);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setInfoValid(true);
    }
    if (status === "error") {
      setInfoValid(false);
    }
  }, [status]);
  return (
    <React.Fragment>
      {!infoValid && (
        <div className="loading">
          <Spin />
        </div>
      )}
      {infoValid && <UpdateCategoryForm id={categoryId} category={data} />}
    </React.Fragment>
  );
}

export default UpdateCategory;
