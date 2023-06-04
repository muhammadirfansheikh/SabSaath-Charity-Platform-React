import React from "react";
import { Spinner } from "reactstrap";

const Loader = (props) => {
  return props.loading === true ? <Spinner color="danger"></Spinner> : null;
};

export default Loader;
