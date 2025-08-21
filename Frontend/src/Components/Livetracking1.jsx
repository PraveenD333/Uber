import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const Livetracking1= ({ pickup, destination }) => {
    const [directions, setDirections] = useState(null);

    useEffect(() => {
        if (pickup && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: pickup,
                    destination: destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirections(result);
                    } else {
                        setDirections(null);
                    }
                }
            );
        }
    }, [pickup, destination]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={pickup || { lat: 0, lng: 0 }}
                zoom={15}>

                {pickup && typeof pickup.lat === 'number' && typeof pickup.lng === 'number' && (
                    <Marker position={{ lat: pickup.lat, lng: pickup.lng }} />
                )}

                {destination && typeof destination.lat === 'number' && typeof destination.lng === 'number' && (
                    <Marker position={{ lat: destination.lat, lng: destination.lng }} />
                )}

                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default Livetracking1;