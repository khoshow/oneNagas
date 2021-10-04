import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h1>Admin Dashboard</h1>
            </div>
            <div className="col-md-4">
              <ul class="list-group">
                <li className="list-group-item bg-dark">
                  <Link href="/admin/crud/blog">
                    <a  style={{color:"#E5E5E5"}}>Write</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Manage Blogs</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/manage-categories">
                    <a>Manage Categories</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="/admin/crud/manage-tags">
                    <a>Manage Tags</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/manage-tribes">
                    <a>Manage Tribes</a>
                  </Link>
                </li>

                
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8"></div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
