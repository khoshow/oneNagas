import Layout from "../components/Layout";
import Link from "next/link";
import Head from "next/head";
import { API } from "../config";
import { withRouter } from "next/router";
import { APP_NAME } from "../config";
import { FB_APP_ID } from "../config";
import { DOMAIN } from "../config";
import SigninComponent from "../components/auth/SigninComponent";


const Signin = ({ router }) => {
  const head = () => (
<Head>
      <title>Sign In | {APP_NAME}</title>
      <meta
        name="description"
        content="Signin to avail what Nagamei offers, and build together a great platform for the Nagas."
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Signin to avail what Nagamei offers, and build together a great platform for the Nagas together.`}
      />
      <meta
        property="og:description"
        content="Signin to avail what Nagamei offers, and build together a great platform for the Nagas together."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/Nagamei-Logo-White.png`}
      />
      <meta
        property="og:image:secure_url"
        ccontent={`${DOMAIN}/static/images/Nagamei-Logo-White.png`}
      />
      <meta property="og:image:type" content="image/jpg" />
      {/* <meta property="fb:app_id" content={`${FB_APP_ID}`} /> */}
     <script></script>
    </Head>
  )

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      {head()}
      <div className="container-fluid">
        <h1 className="text-center pt-4 pb-4">Sign In</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SigninComponent />
           
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
