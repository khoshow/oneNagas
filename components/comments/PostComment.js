import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import Router from "next/router";
import { API } from "../../config";
import { getCookie, isAuth } from "../../actions/auth";
import { postComment, getTribes, removeTribe } from "../../actions/comments";
import Modal from "./Modal";
import { set } from "js-cookie";

const PostComment = ({ blogId, data }) => {
  const [values, setValues] = useState({
    comment: "",
    error: false,
    success: false,
  });
  const [showCommentAfterPost, setShowCommentAfterPost] = useState(false);
  const [newData, setNewData] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const { comment, error } = values;
  const token = getCookie("token");


  useEffect(() => {
   if(showCommentAfterPost){
    Router.reload();
   }

  }, []);

  const submitComment = (req, res) => (e) => {
    console.log("Comingfrom button");
    e.preventDefault();
    // console.log('create tribe name', name);
    postComment(blogId, comment, token).then((newData) => {
      if (newData.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: "" });
        setShowCommentAfterPost(true);
        setNewData(newData);
        loadNewPost(newData);
        // console.log(newData);
        // console.log("See: " + newData.comments.at(-1).username);
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      comment: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const loadNewPost = (newData) => {
    setShowCommentAfterPost(
      <div>
      
        <div className="d-flex flex-wrap comments-username-image-div">
          <img
            src={`${API}/user/photo/${
              newData.comments.at(-1).commentBy.username
            }`}
            className="img img-thumbnail"
            style={{
              height: "32px",
              width: "32px",
              borderRadius: "50%",
            }}
            alt="user profile"
          />
          <p className="commentByName">
            {newData.comments.at(-1).commentBy.name}
          </p>
        </div>
        <div className="contentAfterCommentByName">
          <p className="commentBy">{newData.comments.at(-1).content}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{paddingBottom:"1rem"}}>
      <div>
        {showCommentAfterPost} <br></br>
      </div>
      {isAuth() ? (
        <form onSubmit={submitComment()} className="pb-2">
          <div className=" d-flex bd-highlight">
            <div
              className="form-group flex-grow-1 bd-highlightt"
             
            >
              <textarea
                onChange={handleChange}
                type="text"
                className="form-control"
                value={comment}
                placeholder="Write a comment"
                required
                rows="3"
                cols="60"
              ></textarea>
            </div>
          </div>
          <div className="bd-highlight">
            <button type="submit" className="btn btn-primary form-group">
              Comment
            </button>
          </div>
        </form>
      ) : ( <div>
          <div className=" d-flex bd-highlight">
          <div
            className="form-group flex-grow-1 bd-highlightt"
            style={{ marginRight: "5px" }}
          >
            <textarea
              onChange={handleChange}
              type="text"
              className="form-control"
              value={comment}
              placeholder="Write a comment"
              required
              rows="3"
              cols="60"
            ></textarea>
          </div>

          <div className="bd-highlight">
            <div
              className="BUTTON_WRAPPER_STYLES"
              onClick={() => console.log("clicked")}
            >
              {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
             
              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div>
                  <h4>Please log in to make a comment</h4>
                  <Link href={`/signin`}>
                    <a className=" btn btn-primary">Sign in</a>
                  </Link>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <button className="btn btn-dark" onClick={() => setIsOpen(true)}>
               
                Comment
              </button>
   
              </div>
      )}
    </div>
  );
};

export default PostComment;
