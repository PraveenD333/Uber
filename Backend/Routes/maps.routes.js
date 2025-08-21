import express from 'express';
import { authUser } from '../Middleware/auth.middleware.js';
import { getAutoCompleteSuggestions1, getcoordinates, getdistanceTime } from '../Controllers/map.controllers.js';
import { query } from 'express-validator';


const router = express.Router();

router.get('/get-maps',
    query('address').isString().isLength({ min: 3 }),
    authUser, getcoordinates)

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser, getdistanceTime)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authUser,getAutoCompleteSuggestions1)

export default router;
