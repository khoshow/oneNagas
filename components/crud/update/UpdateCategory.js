import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../../actions/auth";

import { update, removeCategory } from "../../../actions/category";

import { QuillModules, QuillFormats } from "../../../helpers/quill";

const CategoryUpdate = ({ router }) => {
  const [categoryName, setCategoryName] = useState(router.query.category);
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(router.query.category);
  const [values, setValues] = useState({
    name: "",
    photo: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    formData: "",
  });

  const { name, error, success, categories, removed, formData } = values;

  const token = getCookie("token");

  const slug = router.query.category;

  const updateCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("name", categoryName);
    update(formData, slug, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
          error: "",
          formData: "",
          success: `Category "${data.name}" is updated`,
        });
      }
    });
  };

  const handlePhoto = (e) => {
    // console.log(e.target.value);
    const photo = e.target.files[0];
    setValues({
      ...values,
      photo: photo,
      error: false,
      success: false,
      removed: "",
    });
    setSelectedFile(photo);
  };

  const handleName = (name) => (e) => {
    const name = e.target.value;

    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
    setCategoryName(name);
  };

  const deleteConfirm = () => {
    let answer = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (answer) {
      console.log("Button Delete Clicked");
      deleteCategory();
    }
  };

  const deleteCategory = () => {
    // console.log('delete', slug);
    removeCategory(categoryName, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, success: `Category "${data.name}" is deleted` });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  // <input type="text" className="form-control" onChange={handleChange} value={name} required />

  const updateCategoryForm = () => {
    return (
      <form onSubmit={updateCategory}>
        <div className="form-group">
          <br></br>
          <hr />
          <label className="text-muted">Category</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={handleName("hello")}
            required
          />
        </div>

        <div>
          <div className="form-group pb-2">
            <small className="text-muted">Max size: 1mb</small>
            <br />
            <label className="btn btn-outline-info">
              Upload Category Image
              <input
                onChange={handlePhoto}
                type="file"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {showError()}
          {showSuccess()}
          {updateCategoryForm()}
          <div className="pt-3">
            <button type="" className="btn btn-primary" onClick={deleteConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CategoryUpdate);
