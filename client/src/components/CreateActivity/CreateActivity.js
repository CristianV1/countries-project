import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actions";
import { bindActionCreators } from "redux";
import { LoadingPage } from "../LoadingPage/LoadingPage.js";
import "./CreateActivity.css";

const CreateActivity = (props) => {
  const [selectCountries, setSelectCountries] = useState([]);
  const [submitMessage, setSubmitMessage] = useState({
    failed: false,

    message: "",
  });
  const [inputActivity, setInputActivity] = useState({
    name: "",
    dificulty: 1,
    duration: 1,
    season: "",
    selectedCountries: [],
  });

  useEffect(() => {
    props.getCountries();
  }, []);

  useMemo(() => {
    if (props.countries.length > 0) {
      let countriesObj = props.countries.map((country) => {
        return { label: country.name, value: country.id };
      });
      setSelectCountries(countriesObj);
    }
  }, [props.countries]);

  const seasonOptions = [
    {
      value: "Spring",
      label: "Spring",
    },
    {
      value: "Summer",
      label: "Summer",
    },
    {
      value: "Autumn",
      label: "Autumn",
    },
    {
      value: "Winter",
      label: "Winter",
    },
  ];

  function handleSelectChange(e) {
    var index = e.nativeEvent.target.selectedIndex;

    setInputActivity({
      ...inputActivity,
      selectedCountries: inputActivity.selectedCountries.some(
        (country) => e.target.value === country.value
      )
        ? [...inputActivity.selectedCountries]
        : [
            ...inputActivity.selectedCountries,
            { value: e.target.value, label: e.target[index].innerText },
          ],
    });
  }

  function handleInputChange(e) {
    if (e.target.name === "name") {
      setInputActivity({
        ...inputActivity,
        [e.target.name]: e.target.value.replace(/[^a-zA-Z]/gi, ""),
      });
    } else {
      if (e.target.name === "dificulty") {
        if (e.target.value == 0) {
          e.target.value = "";
        } else if (e.target.value > 5) {
          e.target.value = 5;
        } else if (e.target.value < 0) {
          e.target.value = 1;
        }
      }
      if (e.target.name === "duration") {
        if (e.target.value < 1) {
          e.target.value = 1;
        }
      }

      setInputActivity({ ...inputActivity, [e.target.name]: e.target.value });
    }
  }

  function closeSelected(e) {
    console.log(e.target.value);
    let closeSelected = inputActivity.selectedCountries.filter(
      (country) => e.target.value !== country.value
    );
    setInputActivity({
      ...inputActivity,
      selectedCountries: [...closeSelected],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputActivity.selectedCountries.length === 0) {
      setSubmitMessage({
        ...submitMessage,
        failed: true,
        message: "countries not selected",
      });
      setTimeout(() => {
        setSubmitMessage({
          ...submitMessage,
          failed: true,
          message: "",
        });
      }, 3000);
    } else if (inputActivity.season === "" || inputActivity.season === "none") {
      setSubmitMessage({
        ...submitMessage,
        failed: true,
        message: "season not selected",
      });
      setTimeout(() => {
        setSubmitMessage({
          ...submitMessage,
          failed: true,
          message: "",
        });
      }, 3000);
    } else if (inputActivity.name === "") {
      setSubmitMessage({
        ...submitMessage,
        failed: true,
        message: "name empty",
      });
      setTimeout(() => {
        setSubmitMessage({
          ...submitMessage,
          failed: true,
          message: "",
        });
      }, 3000);
    } else {
      props.createTourismActivity(inputActivity);
      setSubmitMessage({
        ...submitMessage,
        failed: false,
        message: "Activity created successfuly",
      });
      setTimeout(() => {
        setSubmitMessage({
          ...submitMessage,
          failed: false,
          message: "",
        });
      }, 3000);
    }
    console.log(inputActivity);
  }

  if (selectCountries.length > 0) {
    return (
      <div className="activity__background">
        <div className="activity__holder">
          <Link to="/home">
            <button className="homeBtn2" />
          </Link>
          <form
            className="activity__form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h4 className="activity__title">CREATE NEW ACTIVITY</h4>
            <label className="label__activity-name">activity name</label>
            <label className="label__activity-season">select season</label>
            <div className="activity-name__holder">
              <input
                className="input__activity-name"
                name="name"
                value={inputActivity.name}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="name"
                required
              />
            </div>
            <div className="activity-season__holder">
              <select
                className="input__activity-season"
                name="season"
                onChange={(e) => handleInputChange(e)}
              >
                <option value="none">activity...</option>
                {seasonOptions.map((option, index) => (
                  <option key={index} label={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <label className="label__activity-dificulty">dificulty</label>
            <label className="label__activity-duration">duration(hours)</label>
            <div className="activity-dificulty__holder">
              <input
                className="input__activity-dificulty"
                value={inputActivity.dificulty}
                name="dificulty"
                min="1"
                max="5"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder="dificulty"
              />
            </div>
            <div className="activity-duration__holder">
              <input
                className="input__activity-duration"
                value={inputActivity.duration}
                name="duration"
                placeholder="duration(hours)"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                type="number"
                required
              />
            </div>
            <select
              className="input__countries-select"
              name="selectCountries"
              multiple
              onChange={(e) => {
                handleSelectChange(e);
              }}
            >
              {selectCountries.map((country) => {
                return (
                  <option
                    label={country.label}
                    key={country.value}
                    value={country.value}
                  >
                    {country.label}
                  </option>
                );
              })}
            </select>
            <div>
              {inputActivity.selectedCountries.map((selectedCountry) => {
                return (
                  <button
                    value={selectedCountry.value}
                    onClick={(e) => closeSelected(e)}
                    type="button"
                    key={selectedCountry.value}
                    className="removeSelectedCountry"
                  >
                    {selectedCountry.label}
                  </button>
                );
              })}
            </div>
            <div className="submit__message">
              {submitMessage.failed ? (
                <p>{submitMessage.message}</p>
              ) : (
                <p>{submitMessage.message}</p>
              )}
            </div>
            <button className="submit__btn" type="submit">
              Create activity
            </button>
          </form>
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
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);
