
import { useState, useEffect } from 'react';
import Link from "next/link";
import { API } from '../../config';
import Modal from './Modal'
import { getCookie, isAuth } from "../../actions/auth";
import { likeComment, unlikeComment } from "../../actions/comments";
import PostReply from './PostReply'
import ReplyLikes from './ReplyLikes'

const LoadReplies = ({ blogId, i, data }) => {

    // console.log("Blog Id start: " + blogId);
    const arr = []
    for (var r = 0; r < data.comments[i].replies.length; r++) {
        arr.push(
            <div className="replies-div-canvas">
                <div className="d-flex flex-wrap align-items-center replies-div">
                    <img
                        src={`${API}/user/photo/${data.comments[i].replies[r].replyBy.username}`}
                        className="img img-thumbnail"
                        style={{
                            height: "32px",
                            width: "32px",
                            borderRadius: "50%",
                        }}
                        alt="user profile"
                    />
                   <a href={`/profile/${data.comments[i].replies[r].replyBy.username}`}></a> <p className="replyByName">{data.comments[i].replies[r].replyBy.name}</p>
                </div>
                <div className="contentAfterReplyByName"><p>{data.comments[i].replies[r].replyContent}</p></div>
                <div className="reply-like-to-comment-div">
                <ReplyLikes blogId={blogId} i={i} data={data} r={r} />
                </div>

            </div>)



    }

    const postReplyForm = () => {
        return <div>
            <PostReply blogId={blogId} i={i} data={data}/>    
        </div>
    }

    // const showReplyLikes = (data, i, r) => {
    //     return <div >
    //         <ReplyLikes blogId={blogId} i={i} data={data} r={r} />

    //     </div>

    // }


    return <div className="">

        {arr}
       <div className="">
       {postReplyForm(i)}
       </div>
       

    </div>


}

export default LoadReplies