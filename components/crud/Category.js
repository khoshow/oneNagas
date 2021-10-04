import { useState, useEffect } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import Link from "next/link";
import Router from "next/router";
import { getCookie } from "../../actions/auth";
import { create, getCategories, removeCategory } from "../../actions/category";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    formData: "",
  });

  const { name, error, success, categories, removed, formData } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    loadCategories();
  }, [success, removed]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(c.slug)}
          title="Double click to delete"
          key={i}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {c.name}
        </button>
      );
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const deleteCategory = (slug) => {
    // console.log('delete', slug);
    removeCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
        });
      }
    });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    // console.log('create category', name);
    create(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: "" });
      }
    });
  };

  const handleChangePhoto = (name) => (e) => {
    console.log(e.target.value);
    const value = e.target.files[0];
    formData.set(name, value);
    setValues({
      ...values,

      formData,
      error: false,
      success: false,
      removed: "",
    });
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const nameCat = e.target.value;

    setValues({
      ...values,
      name: nameCat,
      formData,
      error: false,
      success: false,
      removed: "",
    });
  };

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exist</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
  };

  //   <div className="form-group">
  //   <label className="text-muted">Title</label>
  //   <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
  // </div>

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div>
        <div className="form-group pb-2">
          <small className="text-muted">Max size: 1mb</small>
          <br />
          <label className="btn btn-outline-info">
            Upload Category image
            <input
              onChange={handleChangePhoto("photo")}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
        </div>
      </div>
      {/* <label className="btn btn-outline-info">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label> */}
      <div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryFom()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;


// import Link from 'next/link';
// import { useState, useEffect } from 'react';
// import Router from 'next/router';
// import dynamic from 'next/dynamic';
// import { withRouter } from 'next/router';
// import { getCookie, isAuth } from '../../actions/auth';
// import { getCategories } from '../../actions/category';
// import { getTags } from '../../actions/tag';
// import { getTribes } from '../../actions/tribe';
// import { createBlog } from '../../actions/blog';
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import '../../node_modules/react-quill/dist/quill.snow.css';
// import { QuillModules, QuillFormats } from '../../helpers/quill';

// const CreateBlog = ({ router }) => {
//     const blogFromLS = () => {
//         if (typeof window === 'undefined') {
//             return false;
//         }

//         if (localStorage.getItem('blog')) {
//             return JSON.parse(localStorage.getItem('blog'));
//         } else {
//             return false;
//         }
//     };

//     const [categories, setCategories] = useState([]);
//     const [tags, setTags] = useState([]);
//     const [tribes, setTribes] = useState([]);

//     const [checked, setChecked] = useState([]); // categories
//     const [checkedTag, setCheckedTag] = useState([]); // tags
//     const [checkedTribe, setCheckedTribe] = useState([]); // tags

//     const [body, setBody] = useState(blogFromLS());
//     const [values, setValues] = useState({
//         error: '',
//         sizeError: '',
//         success: '',
//         formData: '',
//         title: '',
//         hidePublishButton: false
//     });

//     const { error, sizeError, success, formData, title, hidePublishButton } = values;
//     const token = getCookie('token');

//     useEffect(() => {
//         setValues({ ...values, formData: new FormData() });
//         initCategories();
    
//     }, [router]);

//     const initCategories = () => {
//         getCategories().then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setCategories(data);
//             }
//         });
//     };


//     const publishBlog = e => {
//         e.preventDefault();
//         // console.log('ready to publishBlog');
//         createBlog(formData, token).then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setValues({ ...values, title: '', error: '', success: `A new blog titled "${data.title}" is created` });
              
//             }
//         });
//     };

//     const handleChange = name => e => {
//         // console.log(e.target.value);
//         const value = name === 'photo' ? e.target.files[0] : e.target.value;
//         formData.set(name, value);
//         setValues({ ...values, [name]: value, formData, error: '' });
//     };

    

//     const showCategories = () => {
//         return (
//             categories &&
//             categories.map((c, i) => (
//                 <li key={i} className="list-unstyled">
//                     <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
//                     <label className="form-check-label">{c.name}</label>
//                 </li>
//             ))
//         );
//     };

   


//     const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );

//     const showSuccess = () => (
//         <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
//             {success}
//         </div>
//     );

//     const newCategoryForm = () => {
//         return (
//             <form onSubmit={publishBlog}>
//                 <div className="form-group">
//                     <label className="text-muted">Title</label>
//                     <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
//                 </div>
//                 <div>
//                         <div className="form-group pb-2">
//                             <h5>Featured image</h5>
//                             <hr />

//                             <small className="text-muted">Max size: 1mb</small>
//                             <br />
//                             <label className="btn btn-outline-info">
//                                 Upload featured image
//                                 <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
//                             </label>
//                         </div>
//                     </div>

              

//                 <div>
//                     <button type="submit" className="btn btn-primary">
//                         Create
//                     </button>
//                 </div>
//             </form>
//         );
//     };

//     return (
//         <React.Fragment>
//         {showSuccess()}
//         {showError()}
//         {showRemoved()}
//         <div onMouseMove={mouseMoveHandler}>
//           {newCategoryForm()}
//           {showCategories()}
//         </div>
//       </React.Fragment>
//     );
// };

// export default withRouter(CreateBlog);
