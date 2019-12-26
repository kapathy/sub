import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function Map(props) {
  const cinemas = props.cinemas;
  const selected = props.selected;

  const [selectedCinema, setSelectedCinema] = useState(null);

  if (!cinemas) {
    return (
      <div className="app">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <GoogleMap defaultZoom={7.3} defaultCenter={{ lat: 56, lng: 11 }}>
      {cinemas.map(cinema => (
        <Marker
          key={cinema.id}
          position={{
            lat: cinema.location.latitude,
            lng: cinema.location.longitude
          }}
          onClick={() => {
            setSelectedCinema(cinema);
          }}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{
            lat: selected.location.latitude,
            lng: selected.location.longitude
          }}
          onCloseClick={() => {
            console.log("figure out what to do");
          }}
        >
          <div>
            <h3>{selected.name}</h3>
            <p>{selected.address}</p>
            <p>{selected.phone}</p>
          </div>
        </InfoWindow>
      )}

      {selectedCinema && (
        <InfoWindow
          position={{
            lat: selectedCinema.location.latitude,
            lng: selectedCinema.location.longitude
          }}
          onCloseClick={() => {
            setSelectedCinema(null);
          }}
        >
          <div>
            <h3>{selectedCinema.name}</h3>
            <p>{selectedCinema.address}</p>
            <p>{selectedCinema.phone}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
