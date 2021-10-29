import Document, { Html,Head, Main, NextScript } from "next/document";
// import {Head} from 'next/head'
import React from "react";
import ReactDOM from "react-dom";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.APP_PRODUCTION) {
      return {
        __html: `      
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-ZP3BPHFM9N');  
    `,
      };
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
       
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
            integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
            crossOrigin="anonymous"
          />
          <link
            rel="icon"
            href="/static/images/nagamei-favicon.png"
            type="image/gif"
            sizes="16x16"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-ZP3BPHFM9N"
          ></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
        </Head>
        <body>
          <Main />
          <div id="myportal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
