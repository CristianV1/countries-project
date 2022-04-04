import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as ActionCreators from "../../actions/actions";
import styles from "./CountryDetails.module.css";
import { LoadingPage } from "../LoadingPage/LoadingPage";

const CountryDetails = (props) => {
  const [country, setCountry] = useState({});

  function Capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  useEffect(() => {
    props.getCountryDetails(props.id);
    setCountry({});
  }, []);

  useMemo(() => {
    if (props.countries.length > 0) {
      setCountry(props.countries[0]);
    }
    /*
    
    });*/
  }, [props.countries]);

  /*
   */
  if (country.name !== undefined) {
    return (
      <div className={styles.background}>
        <div className={styles.card__holder2}>
          <Link className={styles.homeBtn__holder} to="/home">
            <button className={styles.homeBtn}></button>
          </Link>
          <div className={styles.card__holder} key={country.id}>
            <div className={styles.card__inner_size}>
              <div className={styles.name_and_id__holder}>
                <p className={styles.country__name}>
                  {country.name.toUpperCase()}
                </p>

                <p className={styles.country__id}>({country.id})</p>
              </div>
              <div className={styles.continent__holder}>
                <p className={styles.country__continent}>
                  {country.continent.toUpperCase()}
                </p>
              </div>
              <div className={styles.img__holder}>
                <img className={styles.country__img} src={country.flag} />
              </div>

              <div className={styles.description__holder}>
                <p
                  className={`${styles.description__text} ${styles.area__text} `}
                >
                  Area:{" "}
                </p>
                <p
                  className={`${styles.description__text} ${styles.value__area}`}
                >
                  {country.area} km2
                </p>
                <p></p>

                <p
                  className={`${styles.description__text} ${styles.population__text}`}
                >
                  Population:{" "}
                </p>

                <p
                  className={`${styles.description__text} ${styles.value__population}`}
                >
                  {country.population} Persons
                </p>
                <p></p>

                <p
                  className={`${styles.description__text} ${styles.subregion__text}`}
                >
                  Subregion:{" "}
                </p>
                <p
                  className={`${styles.description__text} ${styles.value__subregion}`}
                >
                  {country.subregion}
                </p>
                <p></p>

                <label
                  className={`${styles.description__text} ${styles.activity__text}`}
                >
                  Tourism activities:{" "}
                </label>
                <div className={styles.activities__holder}>
                  {country.tourism_activities.length > 0 ? (
                    country.tourism_activities.map((activity) => {
                      return (
                        <label
                          className={`${styles.description__text} ${styles.value__activity}`}
                          key={activity.id}
                        >
                          {Capitalize(activity.name)}{" "}
                        </label>
                      );
                    })
                  ) : (
                    <label className={styles.description__text}>none</label>
                  )}
                </div>
                <div>
                  <label>{country.capital}</label>
                </div>
              </div>
            </div>
            <div className={styles.card__description_effect}></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

function mapStateToProps(state) {
  return { countries: state.countries };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);
