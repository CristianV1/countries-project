const {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRY_DETAILS,
  GET_TOURISM_ACTIVITIES,
} = require("../actions/actions");

const initialState = {
  countries: [],
  tourism_activities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: [...action.payload] };
    case GET_COUNTRIES_BY_NAME:
      return { ...state, countries: [...action.payload] };
    case GET_COUNTRY_DETAILS:
      return { ...state, countries: [...action.payload] };
    case GET_TOURISM_ACTIVITIES:
      return { ...state, tourism_activities: [...action.payload] };

    default:
      return state;
  }
}

export default rootReducer;
