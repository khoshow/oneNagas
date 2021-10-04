// import React, { useState } from "react";
// import FileUploader from "./FileUploader";
// import { getCookie } from "../../actions/auth";
// import { create, getCategories, removeCategory } from "../../actions/category";
// import { useRef } from "react";

// const Cat = () => {
//   const [name, setName] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const token = getCookie("token");

//   const submitForm = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("file", selectedFile);

//     create(formData, token)
//       .then((res) => {
//         alert("File Upload success");
//       })
//       .catch((err) => alert("File Upload Error"));
//   };

//   const handleFileInput = (e) => {
//     // handle validations
//     const file = e.target.files[0];
//     if (file.size > 1024)
//       onFileSelectError({ error: "File size cannot exceed more than 1MB" });
//     else onFileSelectSuccess(file);
//   };
  

//   return (
//     <div className="App">
//       <form onSubmit={submitForm}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <div className="file-uploader">
//           <input type="file" onChange={handleFileInput}/>
//           <button
//             onClick={(e) => fileInput.current && fileInput.current.click()}
//             className="btn btn-primary"
//             type="submit"
//           >Create</button>
//         </div>
//         {/* <FileUploader
//           onFileSelectSuccess={(file) => setSelectedFile(file)}
//           onFileSelectError={({ error }) => alert(error)}
//         /> */}

      
//       </form>
//     </div>
//   );
// };

// export default Cat;
