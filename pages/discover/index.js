import Layout from "../../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";

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
import { DOMAIN } from "../../config";

const Index = () => {
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
          <div className="discover-second" key={i}>
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
          <div className="discover-second" key={i}>
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
          <div className="discover-second" key={i}>
            <DiscoverTribes tribes={tribes} />
          </div>
        );
      });
    }
  };

  return (
    <Layout>
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

export default Index;
