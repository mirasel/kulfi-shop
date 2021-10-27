import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormRatings from "form-ratings";
import { toast } from "react-toastify";
import useApi from "../../hook/useApi";
import { addReview, deleteReview, getReview } from "../../common/backendApi";
import { useAuthContext } from "../../contextApi/authContext";
import Spin from "../../components/UI/Loading/Spin";
import "./ReviewForm.scss";

function ReviewForm(props) {
  const auth = useAuthContext();
  const { status, data, sendRequest } = useApi(getReview);
  const {
    status: reviewStatus,
    data: reviewData,
    message: reviewMessage,
    sendRequest: reviewRequest,
  } = useApi(addReview);
  const {
    status: deleteReviewStatus,
    message: deleteReviewMessage,
    sendRequest: deleteReviewRequest,
  } = useApi(deleteReview);

  useEffect(() => {
    sendRequest({
      id: props.kulfiId,
      token: auth.accessToken,
    });
  }, []);

  useEffect(() => {
    if (reviewStatus === "completed") {
      toast.success(reviewMessage);
      props.onUserReviewChange("add", data, reviewData);
    }
    if (reviewStatus === "error") {
      toast.error(reviewMessage);
    }
  }, [reviewStatus]);

  useEffect(() => {
    if (deleteReviewStatus === "completed") {
      toast.success(deleteReviewMessage);
      props.onUserReviewChange("delete", data);
      sendRequest({
        id: props.kulfiId,
        token: auth.accessToken,
      });
    }
    if (deleteReviewStatus === "error") {
      toast.error(deleteReviewMessage);
    }
  }, [deleteReviewStatus]);

  const handleReview = (values) => {
    if (values.rating === 0) {
      toast.error("Please select the stars to give a review");
    } else {
      reviewRequest({
        data: {
          kulfiId: props.kulfiId,
          rating: values.rating,
        },
        token: auth.accessToken,
      });
    }
  };
  const handleReset = (formik) => {
    if (formik.values.rating === 0) {
      toast.error("You have no review to remove");
    } else if (data.rating === 0 && reviewData === null) {
      formik.resetForm();
    } else {
      deleteReviewRequest({
        data: {
          kulfiId: props.kulfiId,
        },
        token: auth.accessToken,
      });
    }
  };

  const handleCancel = () => {
    props.onCancelRateIt();
  };

  return (
    <div className="review">
      {status === "pending" && (
        <div className="loading-inline">
          <Spin />
        </div>
      )}
      {status === "completed" && (
        <Formik
          initialValues={{
            rating: data.rating,
          }}
          onSubmit={handleReview}
        >
          {(formik) => (
            <Form>
              <Field name="rating" as={FormRatings} />
              <button type="submit">Save</button>
              <button type="button" onClick={() => handleReset(formik)}>
                Remove
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default ReviewForm;
