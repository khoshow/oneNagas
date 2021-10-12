import Layout from '../components/Layout';
import Head from "next/head";
import { API } from "../config";
import { withRouter } from "next/router";
import { APP_NAME } from "../config";
import { FB_APP_ID } from "../config";
import { DOMAIN } from "../config";
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = ({router}) => {
    const head = () => (
    <Head>
      <title>Signup Page | {APP_NAME}</title>
      <meta
        name="description"
        content="Sign Up Page | The platform to know the Naga tribes."
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Sign up Page | The platform to know the Naga tribes. | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="The platform to know the Naga tribes. Know all about the Nagas and more here."
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
    )

    return (
        <Layout>
            {head()}
            <div className="container-fluid">
                <h1 className="text-center pt-4 pb-4">Sign Up</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <SignupComponent />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(Signup);
