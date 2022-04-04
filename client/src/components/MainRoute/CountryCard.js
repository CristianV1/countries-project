import React from "react";
import { Link } from "react-router-dom";
import "./CountryCard.css";

export const CountryCard = (props) => {
  //console.log("tes el country");
  // console.log(props);
  return (
    <Link
      className="countryCard"
      key={props.country.name}
      to={`/country/${props.country.id}`}
    >
      <img alt="una bandera" src={props.country.flag} />
      <div className="country__text-holder">
        <div className="country__name-holder">
          <label className="country__name">{props.country.name}</label>
        </div>
        <div className="country__continent-holder">
          <label className="country__continent">
            {props.country.continent}
          </label>
        </div>
      </div>
    </Link>
  );
};
