import { useState, useEffect } from 'react';
import Link from "next/link";
import { API } from '../../config';
import Modal from './Modal'
import { getCookie, isAuth } from "../../actions/auth";
import { likeComment, unlikeComment } from "../../actions/comments";
import LoadReplies from "./LoadReplies"
import EditComment from "./edit/EditComment"
const CommentLikes = ({ blogId, i, data }) => {


  const [liked, setLiked] = useState(false)


  const [isOpen, setIsOpen] = useState(false)
  const [showReplies, setShowReplies] = useState(false)
  const [showReplyButton, setShowReplyButton] = useState(true)
  const [numberOfLikes, setNumberOfLikes] = useState()
  const [isOpenLogin, setIsOpenLogin] = useState(false)

  useEffect(() => {
    numberLikes()
    likedOrNot()
    toShowReplyButton()

  }, []);

  const toShowReplyButton = () => {
    if (data.comments[i].replies.length < 1) {
      setShowReplyButton(false)
    }
  }

  const numberLikes = () => {
    if (data.comments[i].likes.length > 0) {
      setNumberOfLikes(<p>{data.comments[i].likes.length} Likes</p>)
    } else {
      return ''
    }
  }

  const likedOrNot = () => {
    for (var j = 0; j < data.comments[i].likes.length; j++) {
      if (isAuth() && isAuth()._id == data.comments[i].likes[j]._id) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }
  }

  const likeTheComment = () => {
    // console.log("blogId: "+ blogId);
    const commentId = data.comments[i]._id

    // console.log("Comment Like: "+data.comments[i]._id);

    const token = getCookie("token");

    likeComment(blogId, commentId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Data after unLike:" + data);

        setLiked(true)

        setNumberOfLikes(<p>{data.comments[i].likes.length + 1} Likes</p>)
      }
    });
  };


  const unlikeTheComment = () => {
    // console.log("blogId: "+ blogId);
    const commentId = data.comments[i]._id

    // console.log("Comment Like: "+data.comments[i]._id);

    const token = getCookie("token");

    unlikeComment(blogId, commentId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Data after unLike:" + data);

        setLiked(false)
        setNumberOfLikes(<p>{data.comments[i].likes.length - 1} Likes</p>)
      }
    });
  };

  const editComment = () => {
    return <EditComment blogId={blogId} i={i} data={data} />
  }





  const likeUnlike = () => {
    if (isAuth()) {
      return <div className="text-center">
        <p style={{ justifyItems: "center" }}>

          {liked
            ? <button
              className="unlike-button"
              style={{ marginLeft: "3px", }}
              onClick={() => unlikeTheComment()}
            >
              <i className="fas fa-thumbs-up">Liked</i>
            </button>
            : <button
              className="like-button"
              style={{ marginLeft: "3px", }}
              onClick={() => likeTheComment()}
            ><i className="far fa-thumbs-up">Like</i>
            </button>
          }

        </p>
      </div>
    } else {
      return <div>

      <div className="BUTTON_WRAPPER_STYLES" onClick={() => console.log('')}>         
        <button className="usersLikeButton" onClick={() => setIsOpenLogin(true)}>
          <i
            type="button"
            className="far fa-thumbs-up"
            style={{ marginLeft: "3px" }}
          >
            Like</i></button>
        <Modal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
          <div>
            <h4>Please log in to like a comment</h4>
            <Link href={`/signin`}>
              <a className=" btn btn-primary">Sign in</a>
            </Link>
          </div>
        </Modal>
      </div>
      <div className="OTHER_CONTENT_STYLES" ></div>
    </div>
    }
  }

  const onClick = () => {
    setShowReplies(true)
    setShowReplyButton(false)
  }


  // const Results = () => (
  //   <div id="results" className="search-results">
  //     Some Results
  //   </div>
  // )

  return (
    <div className="hello-comment">
      <div className="like-numberOfLike-div">

        <button className="reply-like-button">{likeUnlike()}</button>

        <button className="reply-like-button" onClick={onClick}>Reply</button>

        <div className="BUTTON_WRAPPER_STYLES" onClick={() => console.log('')}>
          {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
          <button className="usersLikeButton" onClick={() => setIsOpen(true)}> {numberOfLikes}</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>



            {data.comments[i].likes.map((blogLikes, i) => (

              <div key={i} className="row likeStructure">
                <div> <img
                  src={`${API}/user/photo/${blogLikes.username}`}
                  className="likePhotoProfile"
                  alt="User Profile Photo"
                /></div>
                <div> <Link href={`/profile/${blogLikes.username}`}>
                  <a className="likeName"> <br></br>
                    <p className="username">&nbsp; &nbsp; {blogLikes.name}</p>

                  </a>
                </Link></div>
              </div>


            ))}
          </Modal>
        </div>
        <div className="OTHER_CONTENT_STYLES" ></div>

      </div>
      <div className=""> 
      {editComment()}
      </div>
      <div className="loadReplies-div"><button style={{ color: "#505257" }} className={showReplyButton ? "load-replies-button" : "no-load-replies-button"} onClick={onClick} > <i className="fas fa-angle-right"></i>Show {data.comments[i].replies.length} Replies </button>
        {showReplies ? <LoadReplies blogId={blogId} i={i} data={data} /> : null}</div>

    </div>
  )
}

export default CommentLikes