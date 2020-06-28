import React from "react";
import "./App.css";
import CountryList from "./components/CountryList/CountryList";
import SearchBox from "./components/SearchBox/SearchBox";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      stats: [],
      searchField: "",
    };
  }
  async componentDidMount() {
    const resp = await fetch("https://api.covid19api.com/countries");
    const countries = await resp.json();
    this.setState({ countries });
    this.state.countries.forEach(async (country) => {
      const resp = await fetch(
        `https://api.covid19api.com/total/country/${country.Slug}`
      );
      const data = await resp.json();
      if (data.length)
        this.setState((prevState) => ({
          stats: prevState.stats.concat({
            ...data[data.length - 1],
            CountryCode: country.ISO2,
          }),
        }));
    });
  }
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    const { stats, searchField } = this.state;
    const filteredCountries = stats.filter((country) =>
      country.Country.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <div className=" box_shadow">
          <h1>Covid19 App</h1>
        </div>
        <SearchBox
          placeholder="Enter Country Name ..."
          handleChange={this.handleChange}
        />
        <CountryList stats={filteredCountries} />

        <div className="copyRight">
          <h4> Made By Ahmed Raza </h4>
          <a href="https://github.com/ahmedraza17260" rel="noreferrer">
            {" "}
            <h3> &copy; Ahmed Raza </h3>{" "}
          </a>
        </div>
      </div>
    );
  }
}

export default App;
