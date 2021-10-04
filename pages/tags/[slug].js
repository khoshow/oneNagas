import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import { singleTag, listRelated } from "../../actions/tag";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import Card from "../../components/blog/Card";

const Tags = ({ tag, blogs }) => {
  return (
    <React.Fragment>
      <Layout>
        <link rel="stylesheet" href="/static/css/home.css" />
        <main>
          <header>
            <br />
            <br />
            <h1>{tag.name}</h1>
            {blogs.map((t, i) => {
              return <Card key={i} blog={t} />;
            })}
          </header>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tags.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.err);
    } else {
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tags;
