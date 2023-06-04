import React from "react";

export default function VideoInput(props) {
  const { height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
     
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mp4"
      />

      {!source && <p onClick={handleChoose}></p>}
      {source && (
        <>
          {" "}
          <video
            className="VideoInput_video"
            width="100%"
            height={height}
            controls
            src={source}
          />
        
        </>
      )}
   
    </div>
  );
}
