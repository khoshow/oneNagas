import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const selectWriter = (selectedWriter, token) => {
    return fetch(`${API}/select-writer/${selectedWriter}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify(selectedWriter)
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deselectWriter = (selectedWriter, token) => {
    return fetch(`${API}/deselect-writer/${selectedWriter}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify(selectedWriter)
    })
        .then(response => {
            handleResponse(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getWriterOfTheWeek = () => {
    return fetch(`${API}/selected-writer`, {
        method: 'GET'
    })
        .then(response => {
            // console.log("helklo me")
            return response.json();
        })
        .catch(err => console.log(err));
};

