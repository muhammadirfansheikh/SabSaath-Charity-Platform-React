
// import { useState } from "react";
// import useBase64 from "./useBase64";

// const DropUploadFilePicker = (props) => {
//   // let { span } = props;

//   const {base64, setBase64, getBase64} = useBase64();
//   const [data, setData] = useState({
//     previewVisible: false,
//     previewTitle: "",
//     fileList: [],
//   });

//   const handleCancel = () => setData({ ...data, previewVisible: false });

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await setBase64(file.originFileObj);
//     }

//     setData({
//       ...data,
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle:
//         file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
//     });
//   };

//   const handleChange =  (file) => { 
//     file.target.files.forEach(async (img) => {
//       data.fileList.push(await getBase64(img))  
//     });
//     setData(data);
//   };

//   const { fileList } = data;
//   const uploadButton = (
//     <div>
//       +
//       <div style={{ marginTop: 8 }}>Company Logo</div>
//     </div>
//   );

//   // opening file picker on button click
//   const openDialog = () => {
//     document.querySelector("#fileInput").click();
//   };

//   return (
//     <>
//       <input
//         id="fileInput"
//         type="file"
//         accept="image/*"
//         multiple={true}
//         style={{ display: "none" }}
//         onChange={handleChange}
//       />
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           flexDirection: "column",
//           justifyContent: "center",
//           width: 90,
//           height: 90,
//           margin: "0 5px",
//           padding: 5,
//           background: "#dee4e9",
//         }}
//       >
//         <button onClick={handleCancel}>x</button>
//         {fileList.length >= 1 ? (
//           <img
//             src={base64}
//             style={{
//               height: "100%",
//               width: "100%",
//               objectFit: "contain",
//               overflow: "hidden",
//             }}
//           />
//         ) : (
//           <button
//             onClick={openDialog}
//             type="button"
//             style={{
//               border: "1px dashed gray",
//               padding: 6,
//               cursor: "pointer",
//             }}
//           >
//             +
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default DropUploadFilePicker;
