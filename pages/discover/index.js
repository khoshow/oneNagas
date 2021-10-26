import Layout from "../../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import EditorsPicks from "../../components/discover/ShowEditorsPicks";
import { getEditorsPicks } from "../../actions/editorsPicks";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { getTribes } from "../../actions/tribe";
import DiscoverEditorsPicks from "../../components/discover/ShowEditorsPicks";
import DiscoverCategories from "../../components/discover/ShowCategories";
import DiscoverTags from "../../components/discover/ShowTags";
import DiscoverTribes from "../../components/discover/ShowTribes";
import { API } from "../../config";
import { APP_NAME } from "../../config";
import { DOMAIN } from "../../config";

const Index = ({router}) => {
 const head =()=>{
  <Head>
     
      <title>Discover the Nagas | {APP_NAME}</title>
      <meta
        name="description"
        content="Discover lifestyles, news, politics, updates, stories and folktales of the Naga tribes. Sorted by Tags, Categoories, Tribes"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Discover more about the Nagas here. | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Discover lifestyles, news, politics, updates, stories and folktales of the Naga tribes. Know all about the Nagas and more here."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/couple-Naga.png`}
      />
      <meta
        property="og:image:secure_url"
        ccontent={`${DOMAIN}/static/images/couple-Naga.png`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
     <script></script>
    </Head>
 }

  const [editorsPick, setEditorsPick] = useState([]);
  const [categories, setCategories] = useState([]);

  const [tags, setTags] = useState([]);
  const [tribes, setTribes] = useState([]);

  const loadEditorsPick = () => {
    getEditorsPicks().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setEditorsPick(data);
      }
    });
  };

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadTribes = () => {
    getTribes().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTribes(data);
      }
    });
  };

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTags(data);
      }
    });
  };

  useEffect(() => {
    loadEditorsPick();
    loadCategories();
    loadTags();
    loadTribes()
  }, []);

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

  const showCategories = () => {
    if (categories) {
      return categories.map((categories, i) => {
        return (
          <div className=" d-flex" key={i}>
            <DiscoverCategories categories={categories} />
          </div>
        );
      });
    }
  };

  
  const showTags = () => {
    if (tags) {
      return tags.map((tags, i) => {
        return (
          <div className="d-flex" key={i}>
            <DiscoverTags tags={tags} />
          </div>
        );
      });
    }
  };

  const showTribes = () => {
    if (tribes) {
      return tribes.map((tribes, i) => {
        return (
          <div className="d-flex" key={i}>
            <DiscoverTribes tribes={tribes} />
          </div>
        );
      });
    }
  };

  return (
    <Layout>
      {head()}
      <link rel="stylesheet" href="/static/css/discover.css" />
      <div className="container">
        <br />
        <br />
        <h1 style={{textAlign:"center"}}>Discover</h1>
        <a href="#showCategories" className="btn-success btn tag-button">By Categories</a>
        <a href="#showTags" className="btn btn-success tag-button">By Tags</a>
        <a href="#showTribes" className="btn btn-success tag-button">By Tribes</a>
        {/* <a href="#showTribes" className="btn btn-success tag-button">By Writers</a> */}
        <hr />
        <div>
          <div>
            <h3>Editors Picks</h3>
          </div>
          <div className="editorsPick"> {showEditorsPicks()}</div>
          <hr />
        </div>
        <div>
          <div id="showCategories">
            <h3>Discover by Categories</h3>
          </div>
          <div className="discover-cover"> {showCategories()}</div>
          <hr />
        </div>
        <div>
          <div id="showTags">
            <h3>Discover by Tags</h3>
          </div>
          <div className="discover-cover"> {showTags()}</div>
          <hr />
        </div>
        <div>
          <div id="showTribes">
            <h3>Discover by Tribes</h3>
          </div>
          <div className="discover-cover"> {showTribes()}</div>
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Index);
