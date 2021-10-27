import React, { useEffect, useState } from "react";
import useApi from "../../hook/useApi";
import { getKulfiToUpdate } from "../../common/backendApi";
import { useParams } from "react-router-dom";
import UpdateKulfiForm from "./UpdateKulfiForm";

function UpdateKulfi() {
  const { status, data, sendRequest } = useApi(getKulfiToUpdate);
  const [kulfi, setKulfi] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [infoValid, setInfoValid] = useState(false);
  const { kulfiId } = useParams();

  useEffect(() => {
    sendRequest(kulfiId);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      const kulfiCategories = data.kulfi.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
      setKulfi(data.kulfi);
      setDefaultCategories(kulfiCategories);
      setCategories(data.categories);
      setInfoValid(true);
    }
  }, [status]);
  return (
    <React.Fragment>
      {infoValid && (
        <UpdateKulfiForm
          id={kulfiId}
          kulfi={kulfi}
          defaultCategories={defaultCategories}
          categories={categories}
        />
      )}
    </React.Fragment>
  );
}

export default UpdateKulfi;
