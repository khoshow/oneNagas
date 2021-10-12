import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';
import { GOOGLE_CLIENT_ID } from '../../config';
import GoogleLogin from 'react-google-login'
import {getTempProfilePhoto } from '../../actions/user';

const LoginGoogle = () => {
//     const [values, setValues] = useState({       
//         photo: ''
//     });

// const [photo, setPhoto] = useState()


//     const loadPhoto = ()=>{
//         getTempProfilePhoto().then(data=>{
//              if(data.error){
//                  console.log(data.error);
//              }else{
//                  setPhoto(data.photo)
                 
//              }
//          })
       
//      }
     
//          useEffect(() => {
          
//              loadPhoto()
//          }, []);

const responseGoogle = (response)=>{
    // console.log(response);
    const tokenId = response.tokenId
    
    const user = {tokenId, photo}

    loginWithGoogle(user).then(data=>{
        if(data.error){
            console.log(data.error);
        }else{
            authenticate(data, () => {
                if (isAuth() && isAuth().role === 1) {
                    Router.push(`/admin`);
                } else {
                    Router.push(`/user`);
                }
            });
        }
    })
}

    return (
        <div className="pb-3">
            <GoogleLogin
                clientId={`${GOOGLE_CLIENT_ID}`}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
               theme="dark"
            />
        </div>
    )
}

export default LoginGoogle