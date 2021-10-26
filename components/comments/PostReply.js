import { useState, useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import Router from 'next/router';
import { API } from '../../config';
import { getCookie, isAuth } from '../../actions/auth';
import { postReply, getTribes, removeTribe } from '../../actions/reply';
import Modal from './Modal'
import BLogComments from './BlogComments';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';
import LoadReplies from './LoadReplies';





const PostReply = ({ blogId, i, data }) => {

    // console.log("Comment Id :" + data.comments[i]._id);
    // console.log("BLog Id :" + blogId);
    const [values, setValues] = useState({
        reply: '',
        error: false,
        success: false,

    });
    const [showReplyAfterPost, setShowReplyAfterPost] = useState('')
    const [showReplyForm, setShowReplyForm] = useState(true)
    const [newData, setNewData] = useState(data)
    const [isOpen, setIsOpen] = useState(false)
    const { reply, error } = values;
    const token = getCookie('token');



    const submitReply = (req, res) => e => {

        e.preventDefault();
        const commentId = data.comments[i]._id
        // console.log(commentId);


        // console.log('create tribe name', name);
        postReply({ blogId, commentId, reply, token }).then(newData => {
            if (newData.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: true, name: '' });
                setShowReplyAfterPost(true)
                setNewData(newData)
                loadNewPost(newData)
                // console.log("New Dta" +newData.comments[i].replies.at(-1).replyContent);
                // console.log("See: " + newData.comments.at(-1).replies.username);
                // console.log("See: " + newData.comments[i].replies.at(-1).replyBy.username)


            }
        });


    };

    const handleChange = e => {
        setValues({ ...values, reply: e.target.value, error: false, success: false, removed: '' });
    };

    const loadNewPost = (newData) => {

        setShowReplyAfterPost(<div> <div className="d-flex flex-wrap comments-username-image-div">
            <img
                src={`${API}/user/photo/${newData.comments[i].replies.at(-1).replyBy.username}`}
                className="img img-thumbnail"
                style={{
                    height: "32px",
                    width: "32px",
                    borderRadius: "50%",
                }}
                alt="user profile"
            />
            <p className="commentByName">{newData.comments[i].replies.at(-1).replyBy.name}</p>

        </div>
            <div className="contentAfterCommentByName"><p className="commentBy">{newData.comments[i].replies.at(-1).replyContent}</p></div>
        </div>)



    }
    // comment-reply-button d-flex bd-highlight

    const cancelReply = () => {
        setShowReplyForm(false)
    }

    return <div >
        <div>{showReplyAfterPost} <br></br></div>

        <div className="yoyo">
            {isAuth() ? <form onSubmit={submitReply()} className="d-flex" style={{ alignItems: "center" }}>

                <div className="form-group flex-grow-1 bd-highlight" >
                    <textarea
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        value={reply}
                        placeholder="Reply to comment"
                        required
                        rows="2"
                        cols="80"
                    ></textarea>


                </div>
                <div>  <button className="btn btn-outline-dark" type="submit" >Reply</button>  </div>

            </form>
                :
                <div className="comment-reply-button d-flex bd-highlight" >
                    <div className="form-group flex-grow-1 bd-highlightt" style={{ marginRight: "5px" }}>

                        <textarea
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            value={reply}
                            placeholder="Reply to comment"
                            required
                            rows="2"
                            cols="60"
                        ></textarea>
                    </div>


                    <div className="bd-highlight">

                        <div className="BUTTON_WRAPPER_STYLES" onClick={() => console.log('')}>
                            {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
                            <button className="btn btn-primary" onClick={() => setIsOpen(true)}> Reply</button>
                            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                                <div>
                                    <h4>Please log in to reply</h4>
                                    <Link href={`/signin`}>
                                        <a className=" btn btn-primary">Sign in</a>
                                    </Link>
                                </div>
                            </Modal>
                        </div>

                    </div>


                </div>
            }

        </div>

    </div>

}

export default PostReply