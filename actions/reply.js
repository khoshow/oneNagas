import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString, { stringify } from 'query-string';
import { isAuth, handleResponse } from './auth';


export const postReply = ({blogId, commentId, reply, token})=>{
   
    // console.log("id: "+ blogId);
    // console.log("content: "+ reply);
    // console.log("commentdId: "+ commentId);

    return fetch(`${API}/reply`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            blogId,
            commentId,
            reply
        })  
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));

}

export const likeReply = (blogId, replyId, token) => {


    return fetch(`${API}/likeReply`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, replyId:replyId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const unlikeReply = (blogId, replyId, token) => {
  

    return fetch(`${API}/unlikeReply`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, replyId:replyId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const editReply = (blogId, replyId, reply, token) => {
    return fetch(`${API}/editReply`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, replyId:replyId, content:reply })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteReply = (blogId, replyId, token) => {
    return fetch(`${API}/deleteReply`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, replyId:replyId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};