import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import ReactDOM from 'react-dom';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta  content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossOrigin="anonymous" />
          <link rel="icon" href="/static/images/nagamei-favicon.png" type="image/gif" sizes="16x16" />
        </Head>
        <body>
          <Main />
          <div id='myportal' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
