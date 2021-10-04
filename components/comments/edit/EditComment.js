import { useState, useEffect } from 'react';
import Link from "next/link";
import { getCookie, isAuth } from "../../../actions/auth";
import { editComment, deleteComment } from "../../../actions/comments";
import { API } from '../../../config';
import Modal from '../Modal'

const EditComment = ({ blogId, i, data, r }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showEditButton, setShowEditButton] = useState(true)

  const [comment, setComment] = useState(data.comments[i].content);

  const token = getCookie('token');



  const showCommentForm = () => {
    setShowEditForm(true)

  }

  const showEditComment = () => {
    if (isAuth() && isAuth()._id == data.comments[i].commentBy._id) {
      console.log("hdfg: " + data.comments[i].commentBy);
      return <button
        className="unlike-button"
        style={{ marginLeft: "1rem", }}
        onClick={() => showCommentForm()}
      >
        Edit
      </button>
    } else {
      return
    }

  }



  const handleChange = e => {
    setComment(e.target.value)
  };

  const postEditComment = (req, res) => e => {
    e.preventDefault();
    console.log("trje");
    const commentId = data.comments[i]._id
    editComment(blogId, commentId, comment, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComment('')
      }
    });
  }

  const toDeleteComment = e =>{
    if (confirm('Are you sure you want to delete the comment?')) {
      const commentId = data.comments[i]._id
      deleteComment(blogId, commentId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Deleted");
        }
      });
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
    // const confirm =confirm("Are you sure you want to delete the comment?")
    // if(confirm){
    //   const commentId = data.comments[i]._id
    //   deleteComment(blogId, commentId, token).then(data => {
    //     if (data.error) {
    //       console.log(data.error);
    //     } else {
    //       console.log("Deleted");
    //     }
    //   });
    // }
  }

  const showDeleteComment = () => {
    if (isAuth() && isAuth()._id == data.comments[i].commentBy._id) {
      console.log("hdfg: " + data.comments[i].commentBy);
      return <button
        className="unlike-button"
        style={{ marginLeft: "3px", }}
        onClick={() => toDeleteComment()}
      >
        Delete
      </button>
    } else {
      return
    }

  }

  const cancelEdit=()=>{
    setShowEditForm(false)
  }

  return <div >
    {console.log("Com: " + comment)}
    <div className="d-flex numberOfLike-div">
      <div>{showEditComment()}</div>
      <div>{showDeleteComment()}</div>
    </div>
    <div>
      {showEditForm ?
        <div className="edit-comment-form">
          <form onSubmit={postEditComment()} className="d-flex">
            <div className="form-group bd-highlight" >
              <textarea
                onChange={handleChange}
                type="text"
                className="form-control"
                style={{ display: "block" }}
                value={comment}
                required
                rows="3"
                cols="80"
              ></textarea>
               <button className="btn btn-outline-dark" type="submit">Update</button>
               <button className="btn btn-outline-dark" onClick={cancelEdit}>Cancel</button>
              {/* <button className="btn btn-outline-dark">Update</button> */}
            </div>
            <div className="bd-highlight">
              {/* <button className="btn btn-outline-dark">Update</button> */}

            </div>
          </form>
        </div>
        : ''
      }
    </div>
    {/* <div className="loadReplies-div"><button style={{ color: "#505257" }} className={setShowEditButton ? "load-replies-button" : "no-load-replies-button"} onClick={onClick} > Edit </button> */}
    {/* {showEditForm ? <EditForm blogId={blogId} i={i} data={data} /> : null} */}
    {/* </div> */}
  </div>

}

export default EditComment