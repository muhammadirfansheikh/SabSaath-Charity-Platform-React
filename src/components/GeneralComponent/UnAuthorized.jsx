import React from "react"

const UnAuthorized = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          color: "rgb(214, 11, 17)",
          fontWeight: "500",
        }}
      >
        You are not authorized to access this page
      </h1>
    </div>
  )
}

export default UnAuthorized
