import React from "react";
import loadGif from "../../img/earth3.gif";
import "./LoadingPage.css";

export const LoadingPage = () => {
  return (
    <div className="loadingBackground">
      <img alt="loading screen" src={loadGif} />
    </div>
  );
};
