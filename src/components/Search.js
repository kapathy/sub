import React from "react";

const Search = props => (
  <div className="serach-button">
    <input
      className="box"
      type="text"
      placeholder="Søg biografer"
      value={props.query}
      onChange={props.onChange}
    ></input>
  </div>
);

export default Search;
