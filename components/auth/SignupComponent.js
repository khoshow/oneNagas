import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { preSignup, isAuth, signup } from "../../actions/auth";
import { getTempProfilePhoto } from "../../actions/user";
import Router from "next/router";
import SignupGoogle from "./SignupGoogle";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  // const loadPhoto = ()=>{
  //    getTempProfilePhoto().then(data=>{
  //         if(data.error){
  //             console.log(data.error);
  //         }else{
  //             setValues({...values, photo:data.photo})

  //         }
  //     })

  // }

  useEffect(() => {
    isAuth() && Router.push(`/`);
    // loadPhoto()
  }, []);

  // const handleSubmit = e => {
  //     e.preventDefault();
  //     // console.table({ name, email, password, error, loading, message, showForm });
  //     setValues({ ...values, loading: true, error: false });
  //     const user = { name, email, password, photo };

  //     signup(user).then(data => {
  //         if (data.error) {
  //             setValues({ ...values, error: data.error, loading: false });
  //         } else {
  //             setValues({
  //                 ...values,
  //                 name: '',
  //                 email: '',
  //                 password: '',
  //                 error: '',
  //                 loading: false,
  //                 message: data.message,
  //                 showForm: false
  //             });
  //         }
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>

        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>
        {/* <div className="form-group">
          <input
            value={password}
            onChange={handleChange("passwor")}
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
        </div> */}

        <div className="text-center">
          <button className="btn btn-primary ">Sign Up</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      
    
      {showError()}
      {showLoading()}
      {showMessage()}

      {showForm && signupForm()}

      <div className="text-center">
        <br />
       
      </div>
      <div className="text-center">
      <p >OR</p> <SignupGoogle />
        <br />

        <Link href="/auth/password/forgot">
          <a className="">Forgot password?</a>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default SignupComponent;
