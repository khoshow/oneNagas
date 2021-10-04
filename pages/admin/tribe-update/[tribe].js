import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import TribeUpdate from '../../../components/crud/update/UpdateTribe';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Tribe</h2>
                        </div>
                        <div className="col-md-12">
                            <TribeUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;
