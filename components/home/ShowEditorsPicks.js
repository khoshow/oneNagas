import Link from "next/link";
import renderHTML from "react-render-html";
import moment, { now } from "moment";
import { API } from "../../config";
import { smartTrim } from "../../helpers/trim";
import { DOMAIN } from "../../config";
const EditorsPicks = ({ blog }) => {
  blog.excerpt = smartTrim(blog.excerpt, 100, " ", " ...");
  const excerpt = blog.excerpt.replace(/<[^>]*>?/gm, "");

  const showEditorsPicks = () => {
    let ur = "/static/images/avatar.png";
    let photoUrl = DOMAIN + ur;
    return (
      <div className="">
        <div className="card-body">
          <div className="row photoAndName">
            <img
              src={`${API}/user/photo/${blog.postedBy.username}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =photoUrl
              }}
              className="editorPickPhoto"
              alt="User Profile Photo"
            />
           
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>
                <h4 className="username"> {blog.postedBy.name}</h4>{" "}
              </a>
            </Link>
          </div>
          <section>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h2 className="card-title">{blog.title}</h2>
              </a>
            </Link>
            <p className="card-text">{excerpt}</p>
          </section>

          <div className="">
            <br></br>
            <h5>{moment(blog.updatedAt).format("DD MMM YYYY")} </h5>
          </div>
        </div>
      </div>
    );
  };

  return <div>{showEditorsPicks()}</div>;
};

export default EditorsPicks;
