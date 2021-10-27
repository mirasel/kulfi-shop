import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteKulfi, IMAGE_URL } from "../../common/backendApi";
import useApi from "../../hook/useApi";
import { useAuthContext } from "../../contextApi/authContext";
import "./KulfiList.scss";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

function KulfiList(props) {
  const [kulfis, setKulfis] = useState([]);
  const [kulfiIndex, setKulfiIndex] = useState(null);
  const { status, message, error, sendRequest } = useApi(deleteKulfi);
  const auth = useAuthContext();

  useEffect(() => {
    setKulfis(props.kulfis);
  }, [props.kulfis]);

  useEffect(() => {
    if (status === "completed") {
      const newKulfis = [...kulfis];
      newKulfis.splice(kulfiIndex, 1);
      setKulfis(newKulfis);
      toast.success(message);
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status, message, error]);
  const handleKulfiDelete = (kulfiId, index) => {
    setKulfiIndex(index);
    sendRequest({ id: kulfiId, token: auth.accessToken });
  };
  return (
    <table className="kulfilist-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th>Categories</th>
          <th>Acitons</th>
        </tr>
      </thead>
      <tbody>
        {kulfis.map((kulfi, index) => (
          <tr key={index}>
            <td>{kulfi.id}</td>
            <td>{kulfi.name}</td>
            <td>{kulfi.description}</td>
            <td>{kulfi.price}</td>
            <td>
              <img src={`${IMAGE_URL}/${kulfi.image}`} alt="kulfi_img" />
            </td>
            <td>
              {kulfi.categories.map((category, i, { length }) =>
                length - 1 === i ? (
                  <span key={category.id}>{category.name}</span>
                ) : (
                  <span key={category.id}>{category.name},</span>
                )
              )}
            </td>
            <td>
              <Link className="edit" to={`/dashboard/editkulfi/${kulfi.id}`}>
                <FaEdit />
              </Link>
              <MdDeleteForever
                className="delete"
                onClick={() => handleKulfiDelete(kulfi.id, index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default KulfiList;
