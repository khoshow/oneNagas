import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth, handleResponse } from './auth';

export const create = (tribe, token) => {
    return fetch(`${API}/naga-tribe`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
           
            Authorization: `Bearer ${token}`
        },
        body:tribe,     
    })
        .then(response => {
            // console.log(tribe.name);
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTribes = () => {
    return fetch(`${API}/naga-tribes`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleTribe = slug => {
    return fetch(`${API}/naga-tribe/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeTribe = (slug, token) => {
    return fetch(`${API}/naga-tribe/${slug}`, {
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



export const update = (tribe, slug, token) => {
    // console.log("categroy: "+ tribe);
        return fetch(`${API}/naga-tribe/update/${slug}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',           
                Authorization: `Bearer ${token}`
            },
            body: tribe
        })
            .then(response => {
                // console.log(tribe.name);
                handleResponse(response)
                return response.json();
            })
            .catch(err => console.log(err));
    };
    
    