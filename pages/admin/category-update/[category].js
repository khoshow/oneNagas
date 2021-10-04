import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import CategoryUpdate from '../../../components/crud/update/UpdateCategory';
import Link from 'next/link';

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update Category</h2>
                        </div>
                        <div className="col-md-12">
                            <CategoryUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Blog;
