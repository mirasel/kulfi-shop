import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getKulfiDetails, IMAGE_URL } from "../../common/backendApi";
import Comments from "./Comments";
import useApi from "../../hook/useApi";
import { Stars } from "form-ratings";
import "./KulfiDetails.scss";
import { useAuthContext } from "../../contextApi/authContext";
import ReviewForm from "./ReviewForm";
import Spin from "../../components/UI/Loading/Spin";

function KulfiDetails() {
  const { status, data, sendRequest } = useApi(getKulfiDetails);
  const [avgRating, setAvgRating] = useState(0);
  const [rateIt, setRateIt] = useState(true);
  const { kulfiId } = useParams();
  const history = useHistory();
  const auth = useAuthContext();

  useEffect(() => {
    sendRequest(kulfiId);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      setAvgRating(data.reviews.avg);
    }
    if (status === "error") {
      history.push("/");
    }
  }, [status, history]);

  const handleUserReviewChange = (
    action,
    previousReview = null,
    currentReview = null
  ) => {
    if (action === "add") {
      let newAvgRating = 0;
      if (previousReview.rating === 0) {
        newAvgRating =
          (data.reviews.total + currentReview.rating) /
          (data.reviews.count + 1);
      } else {
        newAvgRating =
          (data.reviews.total - previousReview.rating + currentReview.rating) /
          data.reviews.count;
      }
      setAvgRating(newAvgRating);
    }
    if (action === "delete") {
      if (data.reviews.count === 1) {
        if (data.reviews.total === previousReview.rating) {
          setAvgRating(0);
        } else {
          setAvgRating(data.reviews.avg);
        }
      } else {
        const newAvgRating =
          (data.reviews.total - previousReview.rating) /
          (data.reviews.count - 1);
        setAvgRating(newAvgRating);
      }
    }
  };

  const handleRateIt = () => {
    if (!auth.isLoggedIn) {
      history.push("/login");
    } else if (!auth.user.isVerified) {
      history.push("/email/verify");
    } else {
      setRateIt(!rateIt);
    }
  };
  const handleCancelRateIt = () => {
    setRateIt(!rateIt);
  };

  return (
    <React.Fragment>
      {status === "pending" && (
        <div className="loading">
          <Spin />
        </div>
      )}
      <main className="details-main">
        {status === "completed" && (
          <div className="kulfi-details-content">
            <div className="details-img">
              <img
                src={`${IMAGE_URL}/${data.kulfi.image}`}
                alt={data.kulfi.name}
              />
            </div>
            <div className="details-info">
              <div className="info">
                <div className="details-head">
                  <h1>{data.kulfi.name}</h1>
                  <div>
                    <Stars value={avgRating.toFixed(1)} color="orange" />
                    <span>{avgRating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="details-foot">
                  <p>{data.kulfi.description}</p>
                  <p>
                    Flavours:
                    {data.kulfi.categories.map((category, i, { length }) =>
                      length - 1 === i ? (
                        <Link to={`/category/${category.id}`} key={category.id}>
                          <span>{category.name}</span>
                        </Link>
                      ) : (
                        <Link to={`/category/${category.id}`} key={category.id}>
                          <span>{category.name},</span>
                        </Link>
                      )
                    )}
                  </p>
                  <div className="details-value">
                    <p>TK {data.kulfi.price.toFixed(2)}</p>
                    <div>
                      {rateIt && (
                        <button type="button" onClick={handleRateIt}>
                          Review
                        </button>
                      )}
                      <Link to="/order">Order</Link>
                    </div>
                  </div>
                </div>

                {!rateIt && auth.isLoggedIn && auth.user.isVerified && (
                  <ReviewForm
                    kulfiId={kulfiId}
                    onUserReviewChange={handleUserReviewChange}
                    onCancelRateIt={handleCancelRateIt}
                  />
                )}
              </div>
              <Comments kulfiId={kulfiId} comments={data.kulfi.comments} />
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}

export default KulfiDetails;
