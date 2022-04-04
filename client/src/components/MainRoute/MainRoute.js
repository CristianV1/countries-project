import React, { useState, useEffect, useMemo } from "react";
import { CountryCard } from "./CountryCard";
import { LoadingPage } from "../LoadingPage/LoadingPage";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../../actions/actions";
import lupa from "../../img/lupa.png";
import "./MainRoute.css";

export const MainRoute = (props) => {
  const [countries, setCountries] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loadPage, setLoadPage] = useState(false);
  const [dinamicFilter, setDinamicFilter] = useState(true);
  const [options, setOptions] = useState({
    AllcontinentsAvaible: [],
    AllTouristActivities: [],
  });
  const [input, setInput] = useState("");

  const [filters, setFilters] = useState({
    filterByContinent: "none",
    filterByTourismActivity: "none",
    sortType: "",
    orderByAlphabet: false,
    orderByPopulation: false,
    orderByArea: false,
  });
  const [check, setCheck] = useState(true);
  //cantidad de botones generados por el calculo
  const [paginationQuantity, setPaginationQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  //10 porque en el readme dice que son 10 por paginacion (por si se me olvida otra vez djasjd)
  const [cardsQuantity, setCardsQuantity] = useState(10);

  const [paginationButtons, setPaginationButtons] = useState([]);

  function handlePaginationButton(e, index) {
    setCurrentPage(index);
  }

  useEffect(() => {
    props.getTourismActivities();
    props.getCountries();
    setDinamicFilter(true);
  }, []);
  /*
  useMemo(() => {
    if (Array.isArray(props.countries)) {
      let tempCountries = [...props.countries];
      let pagination = 0;

      if (tempCountries.length > 9) {
        let secondPagination = Math.ceil(tempCountries.length / cardsQuantity);

        pagination = secondPagination;
        console.log(pagination);
      } else {
        pagination = 1;
      }
      if (currentPage === 0) {
        setCountries(props.countries.slice(0, 9));
      } else if (currentPage > 0) {
        let cutIndex = 0;
        currentPage === 1
          ? (cutIndex = currentPage * (cardsQuantity - 1))
          : (cutIndex = currentPage * cardsQuantity);
        setCountries(tempCountries.splice(cutIndex, 10));
      }
      setPaginationQuantity(pagination);
    }
  }, [currentPage]);*/

  useMemo(() => {
    if (Array.isArray(props.countries)) {
      let tempCountries = [...props.countries];

      let optionContinents = [];

      if (tempCountries.length > 0) {
        if (tempCountries[0].error === undefined && dinamicFilter) {
          tempCountries.forEach((country) => {
            if (!optionContinents.includes(country.continent)) {
              optionContinents.push(country.continent);
            }
          });
          setOptions({ ...options, AllcontinentsAvaible: optionContinents });
        }
        setLoadPage(true);
      }
      let pagination = 0;

      if (tempCountries.length > 9) {
        let secondPagination = Math.ceil(tempCountries.length / cardsQuantity);

        pagination = secondPagination;
      } else {
        pagination = 1;
      }
      if (currentPage === 0) {
        setCountries(props.countries.slice(0, 9));
      } else if (currentPage > 0) {
        let cutIndex = 0;
        currentPage === 1
          ? (cutIndex = currentPage * (cardsQuantity - 1))
          : (cutIndex = currentPage * cardsQuantity);

        setCountries(tempCountries.splice(cutIndex, 10));
      }
      setPaginationQuantity(pagination);
    }
  }, [props.countries, currentPage]);

  useMemo(() => {
    if (
      props.tourismActivities.length > 0 &&
      !props.tourismActivities[0].hasOwnProperty("error")
    ) {
      setActivities(props.tourismActivities);
    }
  }, [props.tourismActivities]);

  useMemo(() => {
    if (paginationQuantity > 1) {
      setPaginationButtons([]);
      for (let index = 0; index < paginationQuantity; index++) {
        setPaginationButtons((prevButtons) => [
          ...prevButtons,
          <button
            className={`pagination-btn`}
            key={index}
            onClick={(e) => {
              handlePaginationButton(e, index);
            }}
          >
            {index + 1}
          </button>,
        ]);
      }
    } else {
      setPaginationButtons([]);
    }
  }, [paginationQuantity]);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function checkRadios(e) {
    //setFilters.
    setCheck(!check);

    e.target.checked = check;
    if (e.target.checked) {
      setFilters({
        ...filters,
        sortType: e.target.value,
      });
    } else {
      setFilters({
        ...filters,
        sortType: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFilters({ ...filters, [e.target.name]: [e.target.value] });
    props.getCountriesByName(
      input,
      filters.filterByContinent,
      filters.filterByTourismActivity,
      filters.sortType,
      filters.orderByAlphabet,
      filters.orderByPopulation,
      filters.orderByArea
    );
  }

  function checkCheckBox(e) {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  }

  function handleSelect(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }
  if (loadPage) {
    return (
      <div>
        <nav className="navbar">
          <form
            className="search__form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="search-input__holder">
              <input
                className="search__input"
                placeholder="search country..."
                value={input}
                onChange={(e) => {
                  handleInput(e);
                }}
              />
              <button className="search__button" type="submit">
                <img className="search__button-img" src={lupa} alt="O-" />
              </button>
            </div>

            <h4 className="search__title">filter by:</h4>
            <section className="nav__filter-section">
              <div className="search__filter-holder">
                <select
                  className="search__select"
                  defaultValue={{ label: "select activity", value: 0 }}
                  name="filterByContinent"
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                >
                  <option
                    className="search__select default__option"
                    value="none"
                  >
                    continent
                  </option>
                  {options.AllcontinentsAvaible.map((continent, index) => {
                    return <option key={index}>{continent}</option>;
                  })}
                </select>

                <select
                  defaultValue={{ label: "select activity", value: 0 }}
                  name="filterByTourismActivity"
                  className="search__select"
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                >
                  <option
                    className="search__select default__option"
                    value="none"
                  >
                    tourist activity
                  </option>
                  {activities.map((activity) => {
                    return <option key={activity.id}>{activity.name}</option>;
                  })}
                </select>
              </div>
            </section>

            <h4 className="search__title">sort</h4>
            <div className="search__sorttype-holder">
              <div className="search__sortType">
                <label className="search__sortType-label">
                  ascending
                  <input
                    className="search__sortType-radio1"
                    type="radio"
                    name="sort"
                    value="ascending"
                    onClick={(e) => checkRadios(e)}
                  />
                </label>
              </div>
              <div className="search__sortType">
                <label className="search__sortType-label">
                  decently
                  <input
                    className="search__sortType-radio2"
                    type="radio"
                    name="sort"
                    value="descending"
                    onClick={(e) => checkRadios(e)}
                  />
                </label>
              </div>
            </div>
            <h4 className="search__title">by</h4>
            <div className="search__sorttype-holder">
              <div className="search__sortType">
                <label
                  className="search__sortType-label"
                  style={{ display: filters.sortType ? "inline" : "none" }}
                  disabled={!filters.sortType}
                >
                  alphabet
                  <input
                    className="search__sortType-checkbox1"
                    type="checkbox"
                    name="orderByAlphabet"
                    style={{ display: filters.sortType ? "inline" : "none" }}
                    disabled={!filters.sortType}
                    onClick={(e) => {
                      checkCheckBox(e);
                    }}
                  />{" "}
                </label>
              </div>
              <div className="search__sortType">
                <label
                  className="search__sortType-label"
                  style={{ display: filters.sortType ? "inline" : "none" }}
                  disabled={!filters.sortType}
                >
                  Area
                  <input
                    className="search__sortType-checkbox1"
                    type="checkbox"
                    name="orderByArea"
                    style={{ display: filters.sortType ? "inline" : "none" }}
                    disabled={!filters.sortType}
                    onClick={(e) => {
                      checkCheckBox(e);
                    }}
                  />{" "}
                </label>
              </div>
            </div>
          </form>
        </nav>
        <main className="main">
          <Link to="/create_activity">
            <button className="create-activity__btn">
              CREATE TOURISM ACTIVIY
            </button>
          </Link>
          <div className="countries-placeholder">
            {
              countries.map((country) => {
                if (country.error !== undefined) {
                  return <p key="1">{country.error}</p>;
                }
                return <CountryCard key={country.id} country={country} />;
              })
              /*props.countries.map((country) => {
          <CountryCard country={country} />;
        })*/
            }
          </div>

          <div className="pagination__holder">
            <div className="pagination-placeholder ">{paginationButtons}</div>
          </div>
        </main>
      </div>
    );
  } else {
    return <LoadingPage />;
  }
};

function mapStateToProps(state) {
  //console.log("EJECUTANDOSE");

  return {
    countries: state.countries,
    tourismActivities: state.tourism_activities,
  };
}

function mapDispatchToProps(dispatch) {
  //let { getCountries } = actionCreators;

  return bindActionCreators(actionCreators, dispatch);
  //getCountries: () => dispatch({ type: "GET_COUNTRIES" }) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
