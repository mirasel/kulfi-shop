import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import { useAuthContext } from "../../contextApi/authContext";
import "./KulfiList.scss";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function CategoryList(props) {
  const [categories, setCategories] = useState([]);
  const [kulfiIndex, setKulfiIndex] = useState(null);
  const { status, message, error, sendRequest } = useApi(deleteCategory);
  const auth = useAuthContext();

  useEffect(() => {
    setCategories(props.categories);
  }, [props.categories]);

  useEffect(() => {
    if (status === "completed") {
      const newCategories = [...categories];
      newCategories.splice(kulfiIndex, 1);
      setCategories(newCategories);
      toast.success(message);
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status, message, error]);

  const handleCategoryDelete = (categoryId, index) => {
    setKulfiIndex(index);
    sendRequest({ id: categoryId, token: auth.accessToken });
  };

  return (
    <table className="kulfilist-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Acitons</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index}>
            <td>{category.value}</td>
            <td>{category.label}</td>
            <td>
              <Link
                className="edit"
                to={`/dashboard/editcategory/${category.value}`}
              >
                <FaEdit />
              </Link>
              <MdDeleteForever
                className="delete"
                onClick={() => handleCategoryDelete(category.value, index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CategoryList;
