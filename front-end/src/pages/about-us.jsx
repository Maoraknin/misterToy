import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import 'animate.css';

export function AboutUs() {


  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
  const zoom = 9

  const handleClick = ({ lat, lng }) => {
    setCoordinates({ lat, lng })
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50%',minWidth:'350px', margin: '0 auto' }} className='animate__animated animate__fadeIn'>
      <h2 className="about-title">Our Branches</h2>
      <GoogleMapReact
        onClick={handleClick}
        bootstrapURLKeys={{ key: "AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={zoom}
      >
        <AnyReactComponent
          lat={31.8}
          lng={35}
          // {...coordinates}
          text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
        />
        <AnyReactComponent
          lat={32.5}
          lng={35}
          // {...coordinates}
          text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
        />
        <AnyReactComponent
          lat={31.5}
          lng={34.6}
          // {...coordinates}
          text={<span style={{ color: 'red', fontWeight: '900' }} className="material-symbols-outlined">location_on</span>}
        />
      </GoogleMapReact>
      <div className="map-btn-container">
        <button className="btn-map" onClick={() => handleClick({ lat: 31.8, lng: 35 })}>Jerusalem</button>
        <button className="btn-map" onClick={() => handleClick({ lat: 32.5, lng: 35 })}>Pardes Hanna</button>
        <button className="btn-map" onClick={() => handleClick({ lat: 31.5, lng: 34.6 })}>Sderot</button>
      </div>
    </div>
  );



  return (
    <>
      <section>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
      </section>
    </>
  )

}