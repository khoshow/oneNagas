import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth, handleResponse } from './auth';

export const create = (category, token) => {
    return fetch(`${API}/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
           
            Authorization: `Bearer ${token}`
        },
        body:category,     
    })
        .then(response => {
            // console.log(category.name);
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleCategory = slug => {
    return fetch(`${API}/category/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeCategory = (slug, token) => {
    return fetch(`${API}/category/${slug}`, {
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



export const update = (category, slug, token) => {
// console.log("categroy: "+ category);
    return fetch(`${API}/category/update/${slug}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',           
            Authorization: `Bearer ${token}`
        },
        body: category
    })
        .then(response => {
            // console.log(category.name);
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

