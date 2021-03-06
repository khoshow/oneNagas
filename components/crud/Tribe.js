import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";

import { getTribes, removeTribe } from "../../actions/tribe";

import { create } from "../../actions/tribe";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const Tribes = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [tribeName, setTribeName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [values, setValues] = useState({
    name: "",
    photo: "",
    error: false,
    success: false,
    tribes: [],
    removed: false,
    formData: "",
  });

  const { name, error, success, tribes, removed, formData } = values;

  const token = getCookie("token");

  useEffect(() => {
    loadTribes();
  }, [success, removed]);

  const loadTribes = () => {
    getTribes().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tribes: data });
      }
    });
  };

  const showTribes = () => {
    return tribes.map((t, i) => {
      return (
        <Link href={`/admin/tribe-update/${t.slug}`}  key={i}>
          <a className="btn btn-outline-primary mr-1 ml-1 mt-3" >{t.name}</a>
        </Link>
      );
    });
  };

  // const showTribes = () => {
  //   return Tribes.map((c, i) => {
  //     return (
  //       <button
  //         onDoubleClick={() => deleteConfirm(c.slug)}
  //         title="Double click to delete"
  //         key={i}
  //         className="btn btn-outline-primary mr-1 ml-1 mt-3"
  //       >
  //         {c.name}
  //       </button>
  //     );
  //   });
  // };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      "Are you sure you want to delete this tribe?"
    );
    if (answer) {
      deleteTribe(slug);
    }
  };

  const deleteTribe = (slug) => {
    // console.log('delete', slug);
    removeTribe(slug, token).then((data) => {
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

  const publishTribeName = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("name", tribeName);
    create(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
          error: "",
          formData: "",
          success: `A new Tribe "${data.name}" is created`,
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
    setTribeName(name);
  };

//   const showTribes = () => {
//     return (
//       tribes &&
//       tribes.map((t, i) => (
//         <li key={i} className="list-unstyled">
//           <input
//             onChange={handleTribesToggle(t._id)}
//             type="checkbox"
//             className="mr-2"
//           />
//           <label className="form-check-label">{t.name}</label>
//         </li>
//       ))
//     );
//   };

//   const showMyTribes = () => {
//     return (
//       tribes &&
//       tribes.map((tr, i) => (
//         <li key={i} className="list-unstyled">
//           <input
//             onChange={handleTribesToggle(tr._id)}
//             type="checkbox"
//             className="mr-2"
//           />
//           <label className="form-check-label">{tr.name}</label>
//         </li>
//       ))
//     );
//   };

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

  const createTribeNameForm = () => {
    return (
      <form onSubmit={publishTribeName}>
        <div className="form-group">
          <br></br>
          <hr />
          <label className="text-muted">Tribe</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleName("hello")}
            required
          />
        </div>

        <div>
          <div className="form-group pb-2">
            <small className="text-muted">Max size: 1mb</small>
            <br />
            <label className="btn btn-outline-info">
              Upload Tribe Image
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
            Create
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createTribeNameForm()}
          <div className="pt-3">
            {showTribes()}
            {showError()}
            {showSuccess()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tribes;
