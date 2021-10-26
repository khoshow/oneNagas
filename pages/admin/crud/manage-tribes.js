import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Cat from '../../../components/crud/Cat';
import Cat2 from '../../../components/crud/Cat2';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Tribe from '../../../components/crud/Tribe';
import Link from 'next/link';

const ManageTribe = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>Manage Tribes</h1>
                        </div>
                       
                        <div className="col-md-6">
                            <Tribe />
                        </div>
                    </div>
                   
                </div>
            </Admin>
        </Layout>
    );
};

export default ManageTribe;
