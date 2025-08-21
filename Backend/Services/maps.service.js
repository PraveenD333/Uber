import axios from 'axios';
import captainModel from '../models/captain.model.js';

export const getMap = async (address) => {

    if (!address || typeof address !== 'string') {
        throw new Error('Invalid or empty address');
    }

    const apiKey = process.env.GoogleMapsAPIKey;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            console.error(`Google Maps API error: ${response.data.status}`);
            throw new Error('No results found for the given address');
        }
    } catch (error) {
        console.error('Error fetching map data:', error);
        throw error;
    }
}

export const getdistancetime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("origin and destination are required")
    }
    const apiKey = process.env.GoogleMapsAPIKey;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            // if(response.data.rows[0].elements[0].status === 'ZERO_RESULT'){
            //     throw new error('NO result Found');
            // }

            return response.data.rows[0].elements[0];

        } else {
            throw new Error('Unable to Fetch distance and time');
        }
    } catch (error) {
        console.error('Error fetching map distance and time:', error);
        throw error;
    }

}

export const getAutoCompleteSuggestions = async (input) => {
    const apiKey = process.env.GoogleMapsAPIKey;

    if (!input) {
        throw new Error('query is required');
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions;
            // .map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {

    //   console.log('Querying captains within radius:', { ltd, lng, radius });

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371] // radius in kilometers
            }
        }
    });
    
    return captains;
}

