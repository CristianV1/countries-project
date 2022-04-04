import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export const LandingPage = () => {
  /* 
  <div className="background__effect"></div>
  */
  return (
    <div className="background__overflow">
      <h2 className="landingpage__title">COUNTRIES PROJECT</h2>
      <Link to="/home">
        <button className="home__button">CLICK TO START</button>
      </Link>
      <svg
        preserveAspectRatio="none"
        className="background__blob"
        id="visual"
        viewBox="0 0 900 600"
        width="900"
        height="600"
      >
        <path
          className="background__blob-path"
          d="M493 0L495.3 16.7C497.7 33.3 502.3 66.7 477 100C451.7 133.3 396.3 166.7 372.8 200C349.3 233.3 357.7 266.7 365.5 300C373.3 333.3 380.7 366.7 377 400C373.3 433.3 358.7 466.7 351.7 500C344.7 533.3 345.3 566.7 345.7 583.3L346 600L0 600L0 583.3C0 566.7 0 533.3 0 500C0 466.7 0 433.3 0 400C0 366.7 0 333.3 0 300C0 266.7 0 233.3 0 200C0 166.7 0 133.3 0 100C0 66.7 0 33.3 0 16.7L0 0Z"
          fill="#CAD0FC99"
        ></path>
      </svg>
      <div className="background__holder">
        <img
          className="background__image"
          src="https://c.tenor.com/EhXBLBx7n9sAAAAd/planet-earth.gif"
        />
      </div>
    </div>
  );
};
