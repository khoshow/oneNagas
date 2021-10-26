import Head from "next/head";
import Link from "next/link";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import moment from "moment";
import ContactForm from "../../components/form/ContactForm";
import WriterBlogs from "../../components/blog/WriterBlogs";
import {
  selectWriter,
  deselectWriter,
  getWriterOfTheWeek,
} from "../../actions/home";
import Modal from "../../components/blog/Modal";

const UserProfile = ({ user, blogs, pickedAuthors, query }) => {
  const head = () => (
    <Head>
      <title>
        {user.name} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by ${user.username}`} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/nagamei-favicon.png`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/nagamei-favicon.png`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      <link rel="stylesheet" href="/static/css/home.css" />
      <link rel="stylesheet" href="/static/css/blog.css" />
    </Head>
  );

  const [writerSelectMessage, setWriterSelectMessage] = useState([]);
  const [writerSelected, setWriterSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   writerOfTheWeeek()
  // }, []);

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <WriterBlogs blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const token = getCookie("token");

  const selectedOrNot = () => {};

  // const writerOfTheWeeek = ()=>{
  //   getWriterOfTheWeek().then((data)=>{
  //     if(data.error){
  //       console.log(data.error);
  //     }else if(data.length>0){
  //       for(var i=0; i<data.length; i++){
  //         if(data[i].username ==user.username){
  //           setWriterSelected(true)
  //         }else if(data[i].username !== user.username){
  //           setWriterSelected(false)
  //         }
  //       }
  //       console.log("Length: "+data.length)
  //     }else return
  // } )}

  const likedOrNot = () => {
    for (var j = 0; j < data.comments[i].likes.length; j++) {
      if (isAuth() && isAuth()._id == data.comments[i].likes[j]._id) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }
  }


  const writerOfTheWeeek = () => {
   if(pickedAuthors.length >0){
      for (var i = 0; i < pickedAuthors.length; i++) {
        // console.log("Hello Len: "+pickedAuthors.length);
        if (pickedAuthors[i].username == user.username) {
          return (
            <button
              className="btn btn-outline-secondary mt-3 mb-3 ml-1"
              onClick={() => unpickAuthor()}
            >
              Deselect Author
            </button>
          );
        } else if (pickedAuthors[i].username !== user.username) {
          return (
            <button
              className="btn btn-outline-secondary mt-3 mb-3 ml-1"
              onClick={() => pickAuthor()}
            >
              Pick Author
            </button>
          );
        }
      }}else{
        return (
          <button
            className="btn btn-outline-secondary mt-3 mb-3 ml-1"
            onClick={() => pickAuthor()}
          >
            Pick Author
          </button>
        );
      }
     
     
  };

  const selectWriterFunction = () => {
    if (isAuth() && isAuth().role == 1) {
      if (writerSelected == false) {
        return (
          <form onSubmit={pickAuthor()}>
            <button className="btn btn-outline-secondary mt-3 mb-3 ml-1">
              Pick Author
            </button>
          </form>
        );
      } else if (writerSelected == true) {
        if (isAuth() && isAuth().role == 1) {
          return (
            <form onSubmit={unpickAuthor()}>
              <button className="btn btn-outline-secondary mt-3 mb-3 ml-1">
                Deselect Author
              </button>
            </form>
          );
        }
      }
    }
  };

  const pickAuthor = () => {
    const selectedWriter = user.username;
    // console.log(selectedWriter);
    selectWriter(selectedWriter, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Hello Data: " + data);
        setWriterSelectMessage("Selected Successfully");
        // setWriterSelected(true)
      }
    });
  };

  const unpickAuthor = () => {
    const selectedWriter = user.username;
    deselectWriter(selectedWriter, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Hello Data: " + data);
        setWriterSelectMessage("Unselected Successfully");
        // setWriterSelected(false)
      }
    });
  };

  const noOfFollowers = (user) => {
    if (user.followers.length > 0) {
      return (
        <div>
          <div
            className="BUTTON_WRAPPER_STYLES"
            // onClick={() => console.log("clicked")}
          >
            {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
            <button className="text-center btn" onClick={() => setIsOpen(true)}>
              Followers <br /> {user.followers.length}
            </button>
            {/* {console.log("User: " + user.followers)} */}
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              {user.followers.map((follower, i) => (
                <div key={i} className="row likeStructure">
                  {/* {console.log("Follower: " + follower)} */}
                  <div>
                    <img
                      src={`${API}/user/photo/${follower.username}`}
                      className="likePhotoProfile"
                      alt="User Profile Photo"
                    />
                  </div>
                  <div>
                    <Link href={`/profile/${follower.username}`}>
                      <a className="likeName">
                        {" "}
                        <br></br>
                        <p className="username">
                          &nbsp; &nbsp; {follower.name}
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </Modal>
          </div>
          <div className="OTHER_CONTENT_STYLES"></div>
        </div>
      );
    } else {
      return "";
    }
  };
  return (
    <React.Fragment>
      {head()}
      <Layout>
        <div className="" style={{ textAlign: "center" }}>
          <div
            // className="row"
            style={{
              textAlign: "center",
              border: "1px solid rgb(0, 0, 0, 0.2)",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <div className="card">
              <div className="" style={{ backgroundColor: "#E5E5E5" }}>
                <div
                  className="card-body text-center"
                  style={{ textAlign: "center" }}
                >
                  <h3>{user.name}</h3>
                  <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <img
                      src={`${API}/user/photo/${user.username}`}
                      className="img img-thumbnail mb-3"
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100%",
                        textAlign: "center",
                      }}
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <p className="text-muted">
                      Joined {moment(user.createdAt).format("DD MMM YYYY")}
                    </p>
                    <p className="text-muted">{noOfFollowers(user)}</p>
                  </div>
                  <div
                    className="col-md-6"
                    style={{ marginRight: "auto", marginLeft: "auto" }}
                  >
                    <p
                      className=""
                      style={{ marginLeft: "auto", marginRight: "auto" }}
                    >
                      {user.about}
                    </p>
                    <Link href={`/profile/contact-author/${user.username}`}>
                      <a className="btn btn-outline-secondary ">Message</a>
                    </Link>
                    {writerSelectMessage ? <p>{writerSelectMessage}</p> : ""}
                    {writerOfTheWeeek()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="container pb-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title ">Writings by {user.name}</h5>
              <div className="d-flex">
                <div> {showUserBlogs()}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({ query }) => {
  // console.log("Query: "+query.username);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log(data);
      return getWriterOfTheWeek().then((pickedAuthors) => {
        return { user: data.user, blogs: data.blogs, pickedAuthors, query };
      });
    }
  });
};

export default UserProfile;
