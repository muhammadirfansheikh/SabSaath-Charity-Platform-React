import React from "react"
import { Spinner } from "reactstrap"

const CenteredLoader = ({ style }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "60px",
      }}
    >
      <Spinner
        style={{
          width: "10rem",
          height: "10rem",
          ...style,
        }}
        color="danger"
      />
    </div>
  )
}

export default CenteredLoader
