import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth, handleResponse } from './auth';


export const create = (tag, token) => {
    return fetch(`${API}/tag`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
           
            Authorization: `Bearer ${token}`
        },
        body:tag,     
    })
        .then(response => {
            // console.log(tag.name);
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTags = () => {
    return fetch(`${API}/tags`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleTag = slug => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeTag = (slug, token) => {
    return fetch(`${API}/tag/${slug}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};




export const update = (tag, slug, token) => {
    // console.log("tag: "+ tag);
        return fetch(`${API}/tag/update/${slug}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',           
                Authorization: `Bearer ${token}`
            },
            body: tag
        })
            .then(response => {
                // console.log(tag.name);
                handleResponse(response)
                return response.json();
            })
            .catch(err => console.log(err));
    };
    