import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';

import { API } from '../../../config';

const Cat2 = ({ router }) => {
const slug= router.query.category
console.log(slug);
// const category = toTitleCase(slug)
// console.log("category: " + category);

// function toTitleCase(str) {
//     return str.replace(
//       /\w\S*/g,
//       function(txt) {
//         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//       }
//     );
//   }


  const handlePhoto =()=>{

  }

  const handleName =()=>{
      
}
    return (
        <form >
        <div className="form-group">
          <br></br>
          <hr />
          <label className="text-muted">Category</label>
          <input
            type="text"
            className="form-control"
            value={slug}
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
          <button type="submit" className="btn btn-primary">
            Delete
          </button>
        </div>
      </form>
    )
}

export default withRouter(Cat2)