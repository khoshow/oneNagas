import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString, { stringify } from 'query-string';
import { isAuth, handleResponse } from './auth';


export const getComments = slug => {
    return fetch(`${API}/getComments/${slug}`, {
        method: 'GET',
   
    })
  
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const postComment = (blogId, comment, token)=>{
   
    console.log("id: "+ blogId);
    console.log("content: "+ comment);
    // console.log("id: "+ go);
    // console.log("content: "+ to);
    return fetch(`${API}/comment`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            blogId,
            comment
        })  
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));

}

export const likeComment = (blogId, commentId, token) => {


    return fetch(`${API}/likeComment`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, commentId:commentId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const unlikeComment = (blogId, commentId, token) => {
  

    return fetch(`${API}/unlikeComment`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, commentId:commentId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const editComment = (blogId, commentId, content, token) => {


    return fetch(`${API}/editComment`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, commentId:commentId, content:content })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteComment = (blogId, commentId, token) => {


    return fetch(`${API}/deleteComment`, {
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ blogId: blogId, commentId:commentId })
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};