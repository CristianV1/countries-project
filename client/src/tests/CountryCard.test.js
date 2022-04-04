import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { CountryCard } from "../components/MainRoute/CountryCard.js";
import { Link, BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("<CountryCard />", () => {
  let wrapper;
  let country;
  beforeEach(() => {
    country = {
      id: "NOS",
      name: "nebrazka",
      continent: "america",
      flag: "https://cdn10.bigcommerce.com/s-hhbbk/products/1470/images/50041/UNST0126__89612.1580483840.600.400.png?c=2",
    };
    wrapper = mount(
      <Router>
        <CountryCard country={country} />
      </Router>
    );
  });
  it("It should have two labels, one for the name of the country and another for the continent", () => {
    expect(wrapper.find("label")).toHaveLength(2);
  });

  it("It should render a label with the name that receive from props", () => {
    expect(wrapper.find("label").at(0).text()).toEqual(country.name);
  });

  it("It should have an img for a flag", () => {
    expect(wrapper.find("img")).toHaveLength(1);
  });
  it("it should render a link", () => {
    expect(wrapper.find(Link)).toHaveLength(1);
  });
  it("the Link element should route to the country id", () => {
    expect(wrapper.find(Link).at(0).prop("to")).toEqual(
      `/country/${country.id}`
    );
  });
});
