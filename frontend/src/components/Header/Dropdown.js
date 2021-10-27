import React, { useState } from "react";
import "./Dropdown.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contextApi/authContext";

function Dropdown(props) {
  const [click, setClick] = useState(false);
  const auth = useAuthContext();
  const handleClick = () => setClick(!click);

  const onClickLogout = () => {
    setClick(false);
    auth.onLogout();
  };
  return (
    <React.Fragment>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        <li>
          <button className="dropdown-link" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Dropdown;
