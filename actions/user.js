import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { handleResponse } from './auth';

export const userPublicProfile = username => {
    return fetch(`${API}/user/${username}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProfile = token => {
    return fetch(`${API}/user/profile`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (token, user) => {
    return fetch(`${API}/user/update`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getTempProfilePhoto = () => {
    return fetch(`${API}/getTempProfilePhoto`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',           
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const followWriter = (follows, token) => {
    // console.log("follows: "+follows);
    return fetch(`${API}/follows`, {
        method: 'PUT',
        headers: {         
             Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ follows: follows })
        
    })
        .then(response => {
            handleResponse(response);
            
            return response.json();
        })
        .catch(err => console.log(err));
};

export const unfollowWriter = (unfollow, token) => {
    return fetch(`${API}/unFollow`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ unfollow: unfollow })
    })
        .then(response => {
            handleResponse(response);
          
            return response.json();
        })
        .catch(err => console.log(err));
};
