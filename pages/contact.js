import Layout from '../components/Layout';
import Link from 'next/link';
import Head from "next/head";
import ContactForm from '../components/form/ContactForm';

const Contact = () => {
    const head =()=>{
        <Head><title>Hello</title></Head>
    }
    return (
        
           

        <Layout>
            {head()}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h2>Contact form</h2>
                        <hr />
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
