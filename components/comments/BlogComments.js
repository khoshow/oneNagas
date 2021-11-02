import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { useState, useEffect } from 'react';
import { getComments } from '../../actions/comments';
import PostComment from './PostComment'
import PostReply from './PostReply'
import CommentLikes from './CommentLikes'
import ReplyLikes from './ReplyLikes'
import LoadReplies from './LoadReplies'


const BLogComments = ({ blogId, blogSlug }) => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState()
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [likeButton, setLikeButton] = useState()
    const [showReplies, setShowReplies] = useState(false)

    const loadComments = () => {

        return getComments(blogId).then(data => {
            const comm = []
            if (!data) {
                return setMessage(<div className="no-comments-message"><p>No comments yet. Be the first to write a comment.</p></div>)
            }

            // console.log("Length: " + data.comments.length);




            for (var i = 0; i < data.comments.length; i++) {

                // const likeButton = (i) => {
                //     return "fas fa-thumbs-up comment-like-button"
                // }

                // const numberOfCommentLikes = (i) => {
                //     if (data.comments[i].likes.length > 0) {
                //         return <p>{data.comments[i].likes.length} Likes</p>
                //     } else {
                //         return ''
                //     }

                // }

                // const onClick = () => setShowReplies(true)

                const check = <div className="comments-box">

                    <div className="d-flex flex-wrap comments-username-image-div">
                        <img
                            src={`${API}/user/photo/${data.comments[i].commentBy.username}`}
                            className="img img-thumbnail"
                            style={{
                                height: "32px",
                                width: "32px",
                                borderRadius: "50%",
                            }}
                            alt="user profile"
                        />
                        <a href={`/profile/${data.comments[i].commentBy.username}`}><p style={{fontWeight:"bold"}}>{data.comments[i].commentBy.name}</p></a>

                    </div>
                    <div className="contentAfterCommentByName"><p className="commentBy" style={{fontSize:"14px"}}>{data.comments[i].content}</p></div>

                    <div className="reply-like-div">

                        {showCommentLikes(data, i)}

                    </div>

                    <br />



                    <hr></hr>

                </div>
                comm.push(check)
            }

            setComments(comm)
        });
    }

    // loadTheReplies(i, data)

    // const Results = () => (
    //     <div id="results" className="search-results">
    //       Some Results
    //     </div>
    //   )


    const loadTheReplies = (blogId, i, data) => {
        return <div key={i}>
            <LoadReplies blogId={blogId} i={i} data={data} />

        </div>
    }

    const showCommentLikes = (data, i) => {
        return <div  key={i}>
            <CommentLikes blogId={blogId} i={i} data={data} />

        </div>

    }





    const showComments = () => {
        return comments

    }

    const showUserMessage = () => {
        return message

    }




    const postCommentForm = () => {
        return <div>
            <PostComment blogId={blogId} data />

        </div>
    }



    return (
        <div className="all-comments-box">
            <div className="col">

                <button onClick={loadComments} className="btn load-comments-button"><i className="far fa-comment-alt fa-2x load-comments-icon"></i>  Show Comments</button>
            </div>
            <div className="">{showUserMessage()}</div>
            <br></br>


            <div className="show-comments-box">{showComments()}</div>
            {postCommentForm()}
          

        </div>
    )
};

export default BLogComments;
