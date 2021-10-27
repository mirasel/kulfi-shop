import React from "react";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../common/backendApi";
import { Stars } from "form-ratings";
import "./Kulfis.scss";

function Kulfis(props) {
  return (
    <div className="kulfi-grid">
      {props.kulfis.map((kulfi, index) => (
        <Link
          className="kulfi-card"
          to={`/kulfi/details/${kulfi.id}`}
          key={kulfi.id}
        >
          <img src={`${IMAGE_URL}/${kulfi.image}`} alt={kulfi.name} />
          <h3>{kulfi.name}</h3>
          <div>
            <Stars value={props.reviews[index].avg} color="orange" />
            <span>{props.reviews[index].avg.toPrecision(2)}</span>
          </div>
          <p>{kulfi.price} TK</p>
        </Link>
      ))}
    </div>
  );
}

export default Kulfis;
