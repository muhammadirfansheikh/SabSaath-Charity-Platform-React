import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar_S, { modules, formats } from "./EditorToolbar_S";
import "react-quill/dist/quill.snow.css";
import '../assets/css/homestyles.css'


export const Editor_Success = () => {
  // const [state, setState] = React.useState({ value: null });
  // const handleChange = value => {
  //   setState({ value });
  // };
  // return (
       
  //   <div className="text-editor">
  //     <EditorToolbar />
  //     <ReactQuill
  //       theme="snow"
  //       value={state.value}
  //       onChange={handleChange}
       
  //       modules={modules}
  //       formats={formats}
  //     />
  //   </div>
  // );
//   const [editorText, setEditorText] = React.useState('');
//   const caseKey = localStorage.getItem('GetCaseDesc')
//   const handleChange = value => {
//     localStorage.setItem('CaseDesc', value)
//     setEditorText(value)
//   };
  return (
       
    <div className="text-editor">
      <EditorToolbar_S />
       <ReactQuill
       theme="snow"
        //defaultValue={caseKey !== null ? caseKey : editorText}
       // key={caseKey}
        //onChange={handleChange}
        //modules={modules}
        //formats={formats}
        //height={250}
        
      /> 
    </div>
  );
};

export default Editor_Success;
