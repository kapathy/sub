import React, { Component } from "react";
import Cinema from "./components/Cinema";
import Search from "./components/Search";
import { WrappedMap } from "./components/Map";
import "./App.css";

//const api = ;
//const key = ;

class App extends Component {
  state = {
    all_cinemas: null,
    selectedCinema: null,
    query: "",
    loading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ loading: true }, () => {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `query { cinemas { id, name, location { latitude, longitude}, website, address, phone } }`
        })
      })
        .then(response => {
          return response.json();
        })
        .then(responseAsJson => {
          this.setState({ loading: false, all_cinemas: responseAsJson.data });
        });
    });
  };

  getCinema = event => {
    this.setState({ query: event.target.value });
  };

  handleOnClickCinema(cinema) {
    console.log(cinema.name);
    this.setState({ selectedCinema: cinema });
  }

  render() {
    const { all_cinemas, selectedCinema, loading } = this.state;

    if (!all_cinemas || loading) {
      return (
        <div className="app">
          <p>Loading...</p>
        </div>
      );
    }

    let filtered_cinemas = all_cinemas.cinemas.filter(cinema => {
      return (
        cinema.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      );
    });

    return (
      <div className="app">
        <div className="cinema-list">
          <Search value={this.state.query} onChange={this.getCinema} />
          <div className="cinema-container">
            <div>
              {filtered_cinemas.map(cinema => (
                <div
                  className="cinema"
                  onClick={() => this.handleOnClickCinema(cinema)}
                >
                  <Cinema
                    id={cinema.id}
                    name={cinema.name}
                    website={cinema.website}
                    address={cinema.address}
                    phone={cinema.phone}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="map">
          <WrappedMap
            selected={selectedCinema}
            cinemas={filtered_cinemas}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
