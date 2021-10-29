import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const SmallCard = ({ blog }) => {
  return (
    <div className="card">
      <div className="card-body-canvas">
        <section style={{ textAlign: "center" }}>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <img
                className="main-photo-smallcard"
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </a>
          </Link>
        </section>
        <div className="card-body">
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h5 className="">{blog.title}</h5>
              </a>
            </Link>
          </section>
        </div>

        <div className="card-body">
          {moment(blog.updatedAt).format("DD MMM YYYY")}
          <br />
          <div>
            <img
              src={`${API}/user/photo/${blog.postedBy.username}`}
              className="photo-posted-by-card"
              alt="User Profile Photo"
            />
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a className="name-posted-by-card">{blog.postedBy.name}</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
