import { getMap, getdistancetime, getAutoCompleteSuggestions } from "../Services/maps.service.js";
import { validationResult } from "express-validator";



export const getcoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await getMap(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ error: "Failed to fetch coordinates" });
    }
}

export const getdistanceTime = async (req, res, next) => {

    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

    try {
        const distancetime = await getdistancetime(origin, destination);
        res.status(200).json(distancetime)

        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }

    }

export const getAutoCompleteSuggestions1 = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}