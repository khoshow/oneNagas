import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';


export const createEditorPick = (slug, token) => {
    let createEditorPickEndpoint;
    if (isAuth() && isAuth().role === 1) {
        createEditorPickEndpoint = `${API}/editors-picks/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        createEditorPickEndpoint = `${API}/user/blog`;
    }
   
    return fetch(`${createEditorPickEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(slug)
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getEditorsPicks = () => {
    return fetch(`${API}/editors-picks`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
