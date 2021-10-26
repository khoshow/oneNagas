import Head from "next/head";
import Link from "next/link";
import { getCookie, isAuth } from "../../actions/auth";
import Layout from "../../components/Layout";
import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import {
  singleBlog,
  listRelated,
  likeBlog,
  unlikeBlog,
} from "../../actions/blog";
import { userPublicProfile } from "../../actions/user";
import { followWriter, unfollowWriter } from "../../actions/user";

import { createEditorPick } from "../../actions/editorsPicks";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import SmallCard from "../../components/blog/SmallCard";
import LikesPop from "../../components/blog/LikesPop";
import Modal from "../../components/blog/Modal";
import DisqusThread from "../../components/DisqusThread";
import BlogComments from "../../components/comments/BlogComments";
import ReactShare from "../../components/socialShare/ReactShare";

const SingleBlog = ({ blog, query }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      {/* <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} /> */}
      <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${API}/blog/photo/${blog.slug}`}
        itemProp="image"
      />
      <meta
        property="og:image:secure_url"
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      <link rel="stylesheet" href="/static/css/blog.css" />
      <link rel="stylesheet" href="/static/css/likesPop.css" />

      <script></script>
    </Head>
  );

  const [values, setValues] = useState({
    name: "",
    error: false,
    sale: false,
  });

  const { error, sale } = values;
  const [related, setRelated] = useState([]);

  const [theBlog, setTheBlog] = useState(blog);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenFollow, setIsOpenFollow] = useState(false);
  const [user, setUser] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [following, setFollowing] = useState();
  const [followers, setFollowers] = useState();
  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  const likeOrNot = () => {
    for (var i = 0; i < blog.likes.length; i++) {
      // console.log("BLog My Likes: " + blog.likes[i]._id);
      if (isAuth() && isAuth()._id == blog.likes[i]._id) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  };

  const followOrUnfollow = (blog) => {
   
          for (var i = 0; i < blog.postedBy.followers.length; i++) {
            if (isAuth() && isAuth()._id == blog.postedBy.followers[i]) {
              setFollowing(true);
              setFollowers(blog.postedBy.followers.length);
            } else {
              setFollowing(false);
              setFollowers(blog.postedBy.followers.length);
            }
          }
  
  };

  useEffect(() => {
    // console.log("From Blog: " + blog.postedBy.name);
    likeOrNot();
    followOrUnfollow(blog);
    // console.log("Form Outside: " + following);
    loadRelated();
  }, []);

  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn category-button">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn tag-button">{t.name}</a>
      </Link>
    ));

    const showBlogTribes = (blog) =>
    blog.tribes.map((tr, i) => (
      <Link key={i} href={`/tags/${tr.slug}`}>
        <a className="btn tribe-button">{tr.name}</a>
      </Link>
    ));

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className="col-md-4" key={i}>
        <article>
          <SmallCard blog={blog} />
        </article>
      </div>
    ));
  };

  // const showComments = () => {
  //   return (
  //     <div>
  //       <DisqusThread
  //         id={blog._id}
  //         title={blog.title}
  //         path={`/blog/${blog.slug}`}
  //       />
  //     </div>
  //   );
  // };

  const showMyComments = () => {
    return (
      <div >
        <BlogComments blogId={blog._id} blogSlug={blog.slug} />
      </div>
    );
  };

  const clickSubmit = (slug) => (e) => {
    e.preventDefault();
    const token = getCookie("token");
    // console.log('create category', name);
    createEditorPick(slug, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true, sale: false });
      } else if (!data.error) {
        setValues({ ...values, error: false, sale: true });
      }
    });
  };

  const showSuccess = () => {
    if (sale) {
      return (
        <p className="text-danger">
          The blog is successfully selected as Editor Picks
        </p>
      );
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Couldn't process. An error occured!</p>;
    }
  };
  const adminRole = () => {
    if (isAuth() && isAuth().role == 1) {
      let slug = blog.slug;
      return (
        <div className="text-center">
          <button
            onClick={clickSubmit(slug)}
            className="far fa-star btn siteButton"
            style={{ padding: "0.5rem" }}
          >
            Editor Pick
          </button>
          <br></br>
          <br></br>
        </div>
      );
    }
  };

  const likeTheBlog = () => {
    const blogId = theBlog._id;
    const token = getCookie("token");

    likeBlog(blogId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(blog);
        setTheBlog(data);
        setLiked(true);
      }
    });
  };

  const unlikeTheBlog = () => {
    const blogId = theBlog._id;
    const token = getCookie("token");

    unlikeBlog(blogId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log(blog);
        setTheBlog(data);
        setLiked(false);
      }
    });
  };

  //   const showLikes = ()=>{
  //     return theBlog.likes.map((blog, i) => {
  //       <div className="col-md-4" key={i}>
  //         <article>
  //         <button onClick={()=>setButtonPopup(true)}>{theBlog.likes.length} Likes</button>
  //         <LikesPop trigger={buttonPopup} setTrigger={setButtonPopup} likedBy={theBlog}>
  //         <h2>Hello therer</h2>

  // </LikesPop>
  //         </article>
  //       </div>
  //     });
  //   }

  // return related.map((blog, i) => (
  //   <div className="col-md-4" key={i}>
  //     <article>
  //       <SmallCard blog={blog} />
  //     </article>
  //   </div>
  // ));

  // const showLikes = () => {
  //       return <LikesPop trigger={buttonPopup} setTrigger={setButtonPopup}>
  //           {theBlog.likes.map((blogLikes, i) => (
  //             <div key={i}> <p>{blogLikes.name}</p>
  //            </div>
  //           ))}
  //           </LikesPop>

  //     }

  const showLikes = () => {
    if (theBlog.likes.length > 0) {
      return (
        // {theBlog.likes.length >0 :}
        <div>
          <div
            className="BUTTON_WRAPPER_STYLES"
            onClick={() => console.log("")}
          >
            {/* <button onClick={() => setButtonPopup(true)} className="text-center likesButton">{theBlog.likes.length} Likes</button> */}
            <button
              className="text-center btn siteButton"
              onClick={() => setIsOpen(true)}
            >
              {theBlog.likes.length} Likes
            </button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              {theBlog.likes.map((blogLikes, i) => (
                <div key={i} className="row likeStructure">
                  <div>
                    {" "}
                    <img
                      src={`${API}/user/photo/${blogLikes.username}`}
                      className="likePhotoProfile"
                      alt="User Profile Photo"
                    />
                  </div>
                  <div>
                    {" "}
                    <Link href={`/profile/${blogLikes.username}`}>
                      <a className="likeName">
                        {" "}
                        <br></br>
                        <p className="username">
                          &nbsp; &nbsp; {blogLikes.name}
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

  const likeUnlike = () => {
    if (isAuth()) {
      return (
        <div className="text-center">
          <p style={{ justifyItems: "center" }}>
            {liked ? (
              <i
                type="button"
                className="fas fa-thumbs-up btn siteButtonClicked"
                style={{ marginLeft: "3px" }}
                onClick={() => unlikeTheBlog()}
              >
                Unlike
              </i>
            ) : (
              <i
                type="button"
                className="far fa-thumbs-up  btn siteButton"
                style={{ marginLeft: "3px" }}
                onClick={() => likeTheBlog()}
              >
                Like
              </i>
            )}
          </p>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <div
            className="BUTTON_WRAPPER_STYLES"
            onClick={() => console.log("")}
          >
            <button
              className="text-center btn siteButton"
              onClick={() => setIsOpenLogin(true)}
            >
              <i
                type="button"
                className="far fa-thumbs-up "
                style={{ marginLeft: "3px" }}
              >
                Like
              </i>
            </button>
            <Modal open={isOpenLogin} onClose={() => setIsOpenLogin(false)}>
              <div>
                <h4>Please log in to Like a reply</h4>
                <Link href={`/signin`}>
                  <a className=" btn btn-primary">Sign in</a>
                </Link>
              </div>
            </Modal>
          </div>
          <div className="OTHER_CONTENT_STYLES"></div>
        </div>
      );
    }
  };

  const followTheWriter = () => {
    const writer = blog.postedBy._id;
    const token = getCookie("token");
    // console.log("ID: " + blog.postedBy._id);
    followWriter(writer, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Hello Data: " + data);

        setFollowing(true);
      }
    });
  };

  const unFollowTheWriter = () => {
    const writer = blog.postedBy._id;
    const token = getCookie("token");

    unfollowWriter(writer, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        // console.log("Hello Data: " + data);
        setFollowing(false);
      }
    });
  };

  const showFollowOrUnfollow = () => {
    if (isAuth()) {
      return (
        <div className="text-center">
          <p style={{ justifyItems: "center" }}>
            {following ? (
              <i
                type="button"
                className="btn siteButtonClicked"
                style={{ marginLeft: "3px" }}
                onClick={() => unFollowTheWriter()}
              >
                Following <i className="fas fa-chevron-down"></i>
              </i>
            ) : (
              <i
                type="button"
                className="btn siteButton"
                style={{ marginLeft: "3px" }}
                onClick={() => followTheWriter()}
              >
                Follow <i className="fas fa-chevron-up"></i>
              </i>
            )}
          </p>
        </div>
      );
    } else
      return (
        <div className="text-center">
          <div
            className="BUTTON_WRAPPER_STYLES"
            onClick={() => console.log("clicked")}
          >
            <button
              className="text-center btn siteButton"
              onClick={() => setIsOpenFollow(true)}
            >
              <i
                type="button"
                className="far fa-thumbs-up "
                style={{ marginLeft: "3px" }}
              >
                Follow
              </i>
            </button>
            <Modal open={isOpenFollow} onClose={() => setIsOpenFollow(false)}>
              <div>
                <h4>Please log in to follow an author</h4>
                <Link href={`/signin`}>
                  <a className=" btn btn-primary">Sign in</a>
                </Link>
              </div>
            </Modal>
          </div>
          <div className="OTHER_CONTENT_STYLES"></div>
        </div>
      );
  };

  const followedBy = () => {
    if (followers == 1) {
      return <p className="text-center">{followers} follower</p>;
    } else if (followers > 1) {
      return <p className="text-center">{followers} followers</p>;
    } else {
      return "";
    }
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main className="">
          <article>
            <div>
              <div className="row">
                <div className="col-md-3 my-side">
                  <div className="my-side-content" id="dynamic">
                    <img
                      src={`${API}/user/photo/${blog.postedBy.username}`}
                      className="img img-thumbnail mb-3"
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                      alt="user profile"
                    />
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a> {blog.postedBy.name}</a>
                    </Link>
                    {followedBy()}
                   
                    <br />
                    <p>{blog.postedBy.about}</p>
                    <br />
                    {}
                    {showFollowOrUnfollow()}
                  
                    <br></br>
                    <hr></hr>
                    <ReactShare blog={blog} />
                    <br></br>
                    <div className="pb-3">
                      {showBlogCategories(blog)}
                      {showBlogTags(blog)}
                      {showBlogTribes(blog)}
                      <br />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {adminRole()}
                      <br />
                      {likeUnlike()}
                      <br />
                      {showLikes()}
                      <br />
                      <a href="#comments">
                        <i
                          className="material-icons"
                          style={{ marginLeft: "3px", color: "#2D2424" }}
                        >
                          comment
                        </i>
                        <p style={{ marginLeft: "3px", color: "#2D2424" }}>
                          Comments
                        </p>
                      </a>

                      <br></br>

                      {showSuccess()}
                      {showError()}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                <div className="row" style={{ marginTop: "2rem" }}>
                    <figure
                      style={{
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      <img
                        src={`${API}/blog/photo/${blog.slug}`}
                        alt={blog.title}
                        className="img img-fluid featured-image"
                      />
                      <figcaption>{blog.caption}</figcaption>
                    </figure>
                  </div>
                  <div className="container-fluid">
                  <h1 className=" pt-3 font-weight-bold">{blog.title}</h1>
                  <div className="show-only-desktop below-title-desktop">
                    <img
                      src={`${API}/user/photo/${blog.postedBy.username}`}
                      className="img img-thumbnail mb-3"
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "50%",
                      }}
                      alt="user profile"
                    />
                  
                    <Link href={`/profile/${blog.postedBy.username}`}>
                            <a><p>&nbsp;{blog.postedBy.name}</p></a>
                          </Link>
                    <p> &nbsp;&nbsp; | &nbsp;&nbsp; {moment(blog.updatedAt).format("MMM DD YYYY")}</p>
                  </div>
                    <section>
                      <div className="container">
                        <div className="show-only-mobile">
                          <div className="d-flex" style={{alignItems:"center"}}>
                          <img
                            src={`${API}/user/photo/${blog.postedBy.username}`}
                            className="img img-thumbnail mb-3"
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50%",
                            }}
                            alt="user profile"
                          />
                          <Link href={`/profile/${blog.postedBy.username}`}>
                            <a><p>&nbsp;{blog.postedBy.name}&nbsp;</p></a>
                          </Link>
                          <p> | {moment(blog.updatedAt).format("MMM DD YYYY")}</p>
                          </div>
                         
                        
                          {adminRole()}
                          {showSuccess()}
                          {showError()}
                          <ReactShare blog={blog} />
                          <br />
                          <div className="pb-3">
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}
                            {showBlogTribes(blog)}
                            <br />
                           

                            <br />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>

                

                  <div className="container">
                    <section>
                      <div className="col-md-12 lead">
                        {renderHTML(blog.body)}
                      </div>
                    </section>
                    <div></div>
                  </div>

                  <div className="container">
                    <h4 className="text-center pt-5 pb-5">Related Blogs</h4>
                    <div className="row">{showRelatedBlog()}</div>
                  </div>

                  {/* <div className="container pt-5 pb-5">{showComments()}</div> */}
                  <div id="comments" className="container pt-5 pb-5">
                    {showMyComments()}
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
      return { blog: data, query, userId: isAuth() };
    }
  });
};

export default SingleBlog;
