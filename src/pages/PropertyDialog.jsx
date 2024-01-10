import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = withGoogleMap(({ location }) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={location}
  >
    <Marker position={location} />
  </GoogleMap>
));

const PropertyDialog = ({ property, onClose }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${property.location}&key=AIzaSyBxR7GMBGiKSstZfbCK7mSYjtp1sO10B2s`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const locationData = data.results[0].geometry.location;
          setLocation({ lat: locationData.lat, lng: locationData.lng });
        } else {
          setLocation({ lat: 0, lng: 0 });
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setLocation({ lat: 0, lng: 0 });
      }
    };

    fetchLocation();
  }, [property.location]);

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>{property.type}</h2>
        <img
          src={process.env.PUBLIC_URL + property.picture}
          alt={property.type}
          className="tileImage"
        />
        <p>Description: {property.description}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Price: {property.price}</p>
        <p>Tenure: {property.tenure}</p>

        {/* Display Google Map */}
        <MapComponent
          location={location}
          containerElement={<div style={{ height: '200px', width: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PropertyDialog;
