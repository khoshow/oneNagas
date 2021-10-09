import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import RecentBlogs from "../components/home/RecentBlogs";
import DiscoverEditorsPicks from "../components/home/ShowEditorsPicks";
import Card from "../components/blog/Card";
import WriterOfTheWeek from "../components/home/writerOfTheWeek";
import { API } from "../config";
import { APP_NAME } from "../config";
import { FB_APP_ID } from "../config";
import { DOMAIN } from "../config";

import { listBlogsWithCategoriesAndTags } from "../actions/blog";
import { getWriterOfTheWeek } from "../actions/home";
import { getEditorsPicks } from "../actions/editorsPicks";

const Index = ({
  blogs,
  categories,
  tags,
  tribes,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web developoment tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node next vue php laravel and web developoment"
      />
      <meta property="og:type" content="webiste" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        ccontent={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
     <script></script>
    </Head>
  );

  const [writerSelect, setWriterSelect] = useState([]);
  const [editorsPick, setEditorsPick] = useState([]);
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadWriterSelect = () => {
    getWriterOfTheWeek().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setWriterSelect(data);
      }
    });
  };

  const loadEditorsPick = () => {
    getEditorsPicks().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEditorsPick(data);
      }
    });
  };

  useEffect(() => {
    loadWriterSelect();
    loadEditorsPick();
  }, []);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
          Load more
        </button>
      )
    );
  };

  const showWriterOfTheWeek = () => {
    if (writerSelect) {
      return writerSelect.map((writer, i) => {
        return (
          <div
            className="col-md-4 text-center"
            style={{ marginLeft: "auto", marginRight: "auto", border:"1px solid rgba(0, 0, 0, .2)", borderRadius:"12px", paddingTop:"5px" }}
          >
            <div className="">
           
                <h2 >Writer of the Week</h2>
            
              <div className="card-body" key={i}>
                <img
                  src={`${API}/user/photo/${writer.username}`}
                  className="img img-fluid mb-3"
                  style={{ maxHeight: "100px", maxWidth: "100%" }}
                  alt="user profile"
                />
                <h6 className="card-subtitle mb-2 text-muted">{writer.name}</h6>
                <div>
                  <Link href={`${DOMAIN}/profile/${writer.username}`}>
                    <a className="btn btn-success tag-button">Writer's space</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  const showRecentBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <div className="col-md-3">
          <div key={i}>
            <article>
              <RecentBlogs blog={blog} />

              <hr />
            </article>
          </div>
        </div>
      );
    });
  };

  const showEditorsPicks = () => {
    if (editorsPick) {
      return editorsPick.map((editorsPick, i) => {
        return (
          <div className="editorPickItem" key={i}>
            <DiscoverEditorsPicks blog={editorsPick} />
          </div>
        );
      });
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-outline category-button">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className="btn btn-outline tag-button">{t.name}</a>
      </Link>
    ));
  };

  const showAlltribes = () => {
    return tribes.map((t, i) => (
      <Link href={`/tribes/${t.slug}`} key={i}>
        <a className="btn btn-outline tag-button">{t.name}</a>
      </Link>
    ));
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };

  return (
    <Layout>
      {head()}
      <link rel="stylesheet" href="/static/css/home.css" />

      <div className="" style={{ backgroundColor: "" }}>
        <div className="row">
          <div className="col-md-6">
            <div className="text-center">
              <div className="text-center">
                <div
                  className="col-sm-7 ml-auto mr-auto home-main-heading"
                  style={{ marginTop: "10vh" }}
                >
                  <h1>Created to take the world closer to our Naga family!                 
                  </h1>
                  <h2>We believe your stories could be the next big thing. So, write something awesome today!</h2>
                </div>
                <div>
                  <Link href="/discover">
                    <a className="btn my-primary-button">Discover</a>
                  </Link>
                  <Link href="/user/crud/blog">
                    <a className="btn my-primary-button">Start Writing</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="home-image-div">
              <img
                className="home-image"
                src="/static/images/couple-Naga.png"
              ></img>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div >{showWriterOfTheWeek()}</div>
        <div className="recent-blogs-card-outer container">
          <div className="">
            <br></br>
            <h3>EDITORS PICKS</h3>
          </div>
          <hr />
          <div className="row">{showEditorsPicks()}</div>
          <br />
        </div>

        <div>
          <div className="row lower-body">
            <div className="col-md-8">
              <div>
                <h3>BLOGS</h3>
              </div>
              <hr />

              <div className="">{showAllBlogs()}</div>
              <div className="">{showLoadedBlogs()}</div>
              <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </div>
            <div className="col-md-4 writer-sticky">
              <div className="home-side">
              <div >
                <h3 className="discover ">DISCOVER MORE</h3>
              </div>
              <hr />

              <div>
                <h3>Categories</h3>
                <div>{showAllCategories()}</div>
              </div>
              <div>
                <br></br>
                <h3>Tags</h3>
                <div>{showAllTags()}</div>
              </div>
              <div>
                <br></br>
                <h3>Naga tribes</h3>
                <div>{showAlltribes()}</div>
              </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>


    </Layout>
  );
};

Index.getInitialProps = () => {
  let skip = 0;
  let limit = 4;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        tribes: data.tribes,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Index);
