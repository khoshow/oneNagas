import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `${data.length} blogs found`,
      });
    });
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div
        className="query-search"
        style={{ backgroundColor: "white", padding: "5px" }}
      >
        {message && <p className=" text-muted font-italic"> {message}</p>}

        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  // const searchForm = () => (

  //     <form onSubmit={searchSubmit}>
  //         <div className="row">
  //             <div className="col-md-8">
  //                 <input type="search" className="form-control" placeholder="Search blogs" onChange={handleChange} />
  //             </div>

  //             <div className="col-md-4">
  //                 <button className="btn btn-block btn-outline-primary" type="submit">
  //                     Search
  //                 </button>
  //             </div>
  //         </div>
  //     </form>
  // );

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit} className="">
        <input
          className="form-control nav-link"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleChange}
        />
      </form>
    );
  };

  return (
    <div className="search-form">
      {searchForm()}
      {searched && (
        <div style={{ marginTop: "-20px", marginBottom: "-80px" }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
