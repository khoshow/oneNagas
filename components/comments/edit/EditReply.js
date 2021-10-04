import { useState, useEffect } from 'react';
import Link from "next/link";
import { getCookie, isAuth } from "../../../actions/auth";
import { editReply, deleteReply } from "../../../actions/reply";
import { API } from '../../../config';
import Modal from '../Modal'

const EditReply = ({ blogId, i, data, r }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showEditButton, setShowEditButton] = useState(true)

  const [reply, setReply] = useState(data.comments[i].replies[r].replyContent);

  const token = getCookie('token');



  const showReplyForm = () => {
    setShowEditForm(true)

  }

  const showEditReply = () => {
    if (isAuth() && isAuth()._id == data.comments[i].replies[r].replyBy._id) {
      console.log("hdfg: " + data.comments[i].replies[r].commentBy);
      return <button
        className="unlike-button"
        style={{ marginLeft: "1rem", }}
        onClick={() => showReplyForm()}
      >
        Edit
      </button>
    } else {
      return
    }

  }



  const handleChange = e => {
    setReply(e.target.value)
  };

  const postEditReply = (req, res) => e => {
    e.preventDefault();
    console.log("trje");
    const replyId = data.comments[i].replies[r]._id
    editReply(blogId, replyId, reply, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setReply('')
      }
    });
  }

  const toDeleteReply = e =>{
    if (confirm('Are you sure you want to delete the reply?')) {
      const replyId = data.comments[i].replies[r]._id
      deleteReply(blogId, replyId, token).then(data => {
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
    // const confirm =confirm("Are you sure you want to delete the reply?")
    // if(confirm){
    //   const replyId = data.comments[i]._id
    //   deleteReply(blogId, replyId, token).then(data => {
    //     if (data.error) {
    //       console.log(data.error);
    //     } else {
    //       console.log("Deleted");
    //     }
    //   });
    // }
  }

  const showDeleteReply = () => {
    if (isAuth() && isAuth()._id == data.comments[i].replies[r].replyBy._id) {
      console.log("hdfg: " + data.comments[i].replies[r].replyBy._id);
      return <button
        className="unlike-button"
        style={{ marginLeft: "3px", }}
        onClick={() => toDeleteReply()}
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
    {console.log("Com: " + reply)}
    <div className="d-flex numberOfLike-div">
      <div>{showEditReply()}</div>
      <div>{showDeleteReply()}</div>
    </div>
    <div>
      {showEditForm ?
        <div className="edit-comment-form">
          <form onSubmit={postEditReply()} className="d-flex">
            <div className="form-group bd-highlight" >
              <textarea
                onChange={handleChange}
                type="text"
                className="form-control"
                style={{ display: "block" }}
                value={reply}
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

export default EditReply