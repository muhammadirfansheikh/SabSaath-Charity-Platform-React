import React from "react";
import { Spinner } from "reactstrap";

const FormLoader = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {props.loading && (
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 999,
          }}
        >
          <Spinner
            color="danger"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: "0 auto",
            }}
          />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default FormLoader;
