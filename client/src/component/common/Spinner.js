import React from "react";
import spinner from "./spinner.gif";

export default function Spinner() {
  return (
    <div className="column">
      <img
        src={spinner}
        style={{ width: "60px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
}
