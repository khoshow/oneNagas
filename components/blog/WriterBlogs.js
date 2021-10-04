import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";
import { DOMAIN } from "../../config";
import { smartTrim } from "../../helpers/trim";

const WriterBlogs = ({ blog }) => {
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    // blog.tags.map((t, i) => (
    //   <Link key={i} href={`/tags/${t.slug}`}>
    //     <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
    //   </Link>
    // ));

  blog.excerpt = smartTrim(blog.excerpt, 100, " ", " ...");
  const excerpt = blog.excerpt.replace(/<[^>]*>?/gm, "");

  let ur = "/static/images/avatar.png";
  let photoUrl = DOMAIN + ur;
  return (
    <div>
      <div className="row">
        <div className="col">
          {" "}
          <div className="">
            <div className="card-body">
              {/* <div className="row photoAndName">
                <img
                  src={`${API}/user/photo/${blog.postedBy.username}`}                
                  className="editorPickPhoto"
                  alt="User Profile Photo"
                />
                <Link href={`/profile/${blog.postedBy.username}`}>
                  <a>
                    <h4 className="username"> {blog.postedBy.name}</h4>
                    {console.log(blog)}
                  </a>
                </Link>
              </div> */}
              <section>
                <Link href={`/blogs/${blog.slug}`}>
                  <a>
                    <h3 className="card-title blog-title">{blog.title}</h3>
                  </a>
                </Link>
              </section>
              <section>
                <p className="card-text">{excerpt}</p>
              </section>

              <div className="">
                <br></br>
                <h5>{moment(blog.updatedAt).format("DD MMM YYYY")} </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="col-md-8">
            <figure>
              <img
                src={`${API}/blog/photo/${blog.slug}`}
                className="home-blog-image"
                alt="User Profile Photo"
              />
             
            </figure>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WriterBlogs;
