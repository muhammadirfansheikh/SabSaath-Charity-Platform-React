import React from "react"
import CenteredLoader from "./CenteredLoader"

const ApiStateHandler = ({ loading, error, errorText, children }) => {
  if (error) {
    return (
      <div>
        {error && errorText ? errorText.message : "Something went wrong"}
      </div>
    )
  }
  return loading ? <CenteredLoader /> : children
}

export default ApiStateHandler
