import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteComment } from "../../common/backendApi";
import { useAuthContext } from "../../contextApi/authContext";
import useApi from "../../hook/useApi";

function CommentList(props) {
  const { status, data, message, sendRequest } = useApi(deleteComment);
  const [commentsList, setCommentsList] = useState([]);
  const [commentIndex, setCommentIndex] = useState(null);
  const auth = useAuthContext();

  useEffect(() => {
    setCommentsList(props.comments);
  }, [props.comments]);

  useEffect(() => {
    if (status === "completed") {
      const newComments = [...props.comments];
      newComments.splice(commentIndex, 1);
      setCommentsList(newComments);
      toast.success(message);
    }
    if (status === "error") {
      toast.error(message);
    }
  }, [status]);

  const deleteComments = (id, index) => {
    setCommentIndex(index);
    sendRequest({
      id: id,
      token: auth.accessToken,
    });
  };
  return (
    <div className="commentlist">
      {commentsList.map((comment, index) => (
        <div className="comment" key={comment.id}>
          <h3>{comment.user.name}</h3>
          <div>
            <p>{comment.body}</p>
            {auth.user.id === comment.user.id && (
              <button onClick={() => deleteComments(comment.id, index)}>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
