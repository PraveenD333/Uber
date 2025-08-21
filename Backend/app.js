import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouters from './Routes/user.routes.js';
import captainRouters from './Routes/captain.routes.js';
import mapsRouters from './Routes/maps.routes.js';
import rideRouters from './Routes/ride.routes.js'

const app = express();  

app.use(cors({
    origin: 'https://uber1235praveen.vercel.app/',
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouters);
app.use('/captains',captainRouters);
app.use('/maps',mapsRouters);
app.use('/rides',rideRouters)

export default app;  
