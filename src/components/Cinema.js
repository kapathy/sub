import React from "react";

const Cinema = props => (
  <div className="cinemas" key={props.id}>
    <h2>{props.name}</h2>
    <p>{props.address}</p>
    <a href={props.website} target="_blank">
      {props.website}
    </a>
    <p>{props.phone}</p>
  </div>
);

export default Cinema;
