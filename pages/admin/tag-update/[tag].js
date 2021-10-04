import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import TagUpdate from '../../../components/crud/update/UpdateTag';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Tag</h2>
                        </div>
                        <div className="col-md-12">
                            <TagUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;
