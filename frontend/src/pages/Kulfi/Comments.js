import React, { useEffect, useState } from "react";
import { addComment } from "../../common/backendApi";
import { isEmpty } from "../../common/commonFunctions";
import { useAuthContext } from "../../contextApi/authContext";
import useApi from "../../hook/useApi";
import CommentList from "./CommentList";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";

function Comments(props) {
  const { status, data, message, sendRequest } = useApi(addComment);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentValid, setCommentValid] = useState(false);
  const auth = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    setAllComments(props.comments);
  }, []);

  useEffect(() => {
    if (status === "completed") {
      const newComments = [data, ...props.comments];
      setAllComments(newComments);
      toast.success(message);
      setComment("");
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status]);

  useEffect(() => {
    if (!isEmpty(comment)) {
      setCommentValid(true);
    } else {
      setCommentValid(false);
    }
  }, [comment]);

  const handleAddComment = (event) => {
    event.preventDefault();
    if (!auth.isLoggedIn) {
      history.push("/login");
    }
    if (commentValid) {
      sendRequest({
        data: {
          kulfiId: props.kulfiId,
          body: comment,
        },
        token: auth.accessToken,
      });
    }
  };
  return (
    <div className="comments">
      <form onSubmit={handleAddComment}>
        <textarea
          id="comment"
          rows="2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add Comment"
        />
        <button
          type="submit"
          className={!commentValid ? "btnDisabled" : ""}
          disabled={!commentValid}
        >
          <IoSend />
        </button>
      </form>
      <CommentList comments={allComments} />
    </div>
  );
}

export default Comments;
