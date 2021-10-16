import { useState, useEffect } from 'react';
import Link from "next/link";
import { getCookie, isAuth } from "../../actions/auth";
import { likeReply, unlikeReply } from "../../actions/reply";
import EditReply from "./edit/EditReply"

import { API } from '../../config';
import Modal from './Modal'

const ReplyLikes = ({ blogId, i, data, r }) => {

  const [liked, setLiked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const [numberOfLikes, setNumberOfLikes] = useState()

  useEffect(() => {
    showNumberOfLikes()
    likedOrNot()
    // toShowReplyButton()

  }, []);


  const likedOrNot = () => {
    for (var j = 0; j < data.comments[i].replies[r].likes.length; j++) {
      if (isAuth() && isAuth()._id == data.comments[i].replies[r].likes[j]._id) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }
  }

  const showNumberOfLikes = () => {
    if (data.comments[i].replies[r].likes.length > 0) {
      setNumberOfLikes(<p>{data.comments[i].replies[r].likes.length} Likes</p>)
    } else {
      return ''
    }
  }

  const likeTheReply = () => {
    // console.log("blogId: "+ blogId);
    const replyId = data.comments[i].replies[r]._id

    // console.log("Comment Like: "+data.comments[i]._id);

    const token = getCookie("token");

    likeReply(blogId, replyId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Data after unLike:" + data);

        setLiked(true)

        setNumberOfLikes(<p>{data.comments[i].replies[r].likes.length + 1} Likes</p>)
      }
    });
  };


  const unlikeTheReply = () => {
    // console.log("blogId: "+ blogId);
    const replyId = data.comments[i].replies[r]._id

    // console.log("Comment Like: "+data.comments[i]._id);

    const token = getCookie("token");

    unlikeReply(blogId, replyId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("Data after unLike:" + data);

        setLiked(false)
        setNumberOfLikes(<p>{data.comments[i].replies[r].likes.length - 1} Likes</p>)
      }
    });
  };


  const likeUnlikeReply = () => {
    if (isAuth()) {
      return <div className="text-center">
        <p style={{ justifyItems: "center" }}>

          {liked
            ? <button
              className="unlike-button"
              style={{ marginLeft: "3px", }}
              onClick={() => unlikeTheReply()}
            >
              <i className="fas fa-thumbs-up">Liked</i>
            </button>
            : <button
              className="like-button"
              style={{ marginLeft: "3px", }}
              onClick={() => likeTheReply()}
            ><i className="far fa-thumbs-up">Like</i>
            </button>
          }

        </p>
      </div>
    } else {
      return <div>

        <div className="BUTTON_WRAPPER_STYLES" onClick={() => console.log('clicked')}>         
          <button className="usersLikeButton" onClick={() => setIsOpenLogin(true)}>
            <i
              type="button"
              className="far fa-thumbs-up"
              style={{ marginLeft: "3px" }}
            >
              Like</i></button>
          <Modal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
            <div>
              <h4>Please log in to Like a reply</h4>
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

  const editReply = () => {
    return <EditReply blogId={blogId} i={i} r={r} data={data} />
  }


  // const numberOfLikes = (i) => {
  //   if (data.comments[i].replies[r].likes.length > 0) {
  //     return <p>{data.comments[i].replies[r].likes.length} Likes</p>
  //   } else {
  //     return ''
  //   }
  // }
  return (
    <div className="hello-comment">
      <div className="like-numberOfLike-div">

        <button className=" reply-like-button" >{likeUnlikeReply()}</button>


        <div className="BUTTON_WRAPPER_STYLES" onClick={() => console.log('clicked')}>
          {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
          <button className="usersLikeButton" onClick={() => setIsOpen(true)}> {numberOfLikes}</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>



            {data.comments[i].replies[r].likes.map((blogLikes, i) => (

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
        {editReply()}
      </div>
    </div>
  )
}

export default ReplyLikes