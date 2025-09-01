 # Uber Clone — MERN Fullstack (Frontend + Backend)

Monorepo implementing an Uber-like ride-hailing app:
- Frontend: React + Vite + Tailwind — UI, maps, sockets
- Backend: Node + Express + Mongoose + Socket.io — API, auth, real-time

## Project purpose
Provide a minimal but functional ride-hailing system where:
- Users can register/login, request rides, view live driver location and complete payments.
- Captains (drivers) can register/login, see nearby ride requests, accept rides, start/end rides.
- Real-time updates via Socket.io and route/directions via Google Maps.

## Features

- User & Captain (driver) registration and login (JWT auth)  
- Ride booking: pickup/destination selection, vehicle type, fare estimate  
- Ride lifecycle: request → accept → start (OTP) → end  
- Real‑time notifications and location updates via Socket.io  
- Live tracking & route visualization using Google Maps (Directions)  
- Geocoding, distance & ETA calculations via Maps APIs  
- Validation and error handling with user-friendly toast messages  
- Token blacklist on logout (security)  
- Responsive UI built with Tailwind CSS

## Tech Stack

- **Frontend**
  - React 18 (Vite)
  - Tailwind CSS
  - Axios
  - React Router
  - @react-google-maps/api
  - react-hot-toast / react-toastify
  - socket.io-client

- **Backend**
  - Node.js + Express
  - MongoDB + Mongoose
  - Socket.io (server)
  - Google Maps APIs (Geocoding, Distance Matrix, Directions)
  - JWT for authentication
  - Validation with express-validator


## Prerequisites
- Node.js >= 16, npm (or yarn)
- MongoDB running (local or cloud)
- Google Maps API key Google Cloud project with Maps JavaScript + Directions APIs enabled

## Environment variables

Backend (.env)
- PORT=5000
- MONGO_URI=mongodb://localhost:27017/uber
- JWT_SECRET=your_jwt_secret
- GOOGLE_MAPS_API_KEY=your_key

Frontend (.env)
- VITE_BASE_URL=http://localhost:5000/api
- VITE_GOOGLE_MAPS_API_KEY=your_key

## API Documentation

For detailed API documentation:
- [Backend API Documentation](Backend/README.md)
- [Frontend Documentation](Frontend/README.md)


## Frontend — detailed files & descriptions

Path: /Frontend

Important files
- package.json, vite.config.js, tailwind.config.js — build & tooling.
- .env — VITE_BASE_URL and VITE_GOOGLE_MAPS_API_KEY.

src/
- main.jsx — React entry, mounts App and providers (Toaster/ToastContainer).
- App.jsx — Routes setup, global providers (User/Captain/Socket contexts).
- index.css — Tailwind/global styles.

src/assets/
- assets.js — centralized image imports and helpers.

src/Context/
- UserContext.jsx — user auth state, setUser, token helpers.
- CaptainContext.jsx — captain auth state.
- SocketContext.jsx — socket.io client provider (connect, emit/listen).

src/Components/
- Livetracking.jsx / Livetracking1.jsx — Google Map component. Renders map, Markers, and DirectionsRenderer. Important: use onLoad/onUnmount and only access window.google after maps load.
- LocationSearchPanel.jsx — Address input, autocomplete, uses Maps API for suggestions and geocoding.
- VehiclePanel.jsx — Vehicle type selection and fare display.
- RidePopUp.jsx / ConfirmRidePopUp.jsx — UI overlays for ride details and confirm actions.
- LookingForDriver.jsx / WaitForDriver.jsx — Waiting flows shown after ride creation.
- FinishRide.jsx — End-of-ride screen (fare, payment).
- CaptainDetails.jsx / ConfirmRide.jsx — Captain-specific UIs for ride acceptance and OTP confirmation.

src/pages/
- Start.jsx — Landing screen.
- Home.jsx — Main booking page (LocationSearchPanel + VehiclePanel).
- UserSignup.jsx / UserLogin.jsx — user registration/login flows; show backend validation errors via toasts.
- CaptainSignup.jsx / CaptainLogin.jsx — captain registration with vehicle fields.
- UserRiding.jsx — user live ride screen: embeds Livetracking, shows captain info, listens to socket events (ride-started, ride-completed).
- CaptainRiding.jsx — captain-side live screen: shares live location, start/end controls.
- CaptainHome.jsx — captain dashboard (incoming requests).
- UserProtected.jsx / CaptainProtected.jsx — route guards.

Notes
- Toasts: project uses react-hot-toast or react-toastify — ensure Toaster/ToastContainer is mounted in App.jsx.
- Maps: disable adblockers while testing; ensure correct API key restrictions.



## Backend — detailed files & descriptions

Path: /Backend

Important files
- server.js — starts server and socket layer.
- app.js — Express app, middleware, route mounts, error handler.
- socket.js — socket.io server logic and event handlers.

Controllers/ (HTTP handlers)
- user.controllers.js — registerUser, login, profile handlers; returns JWT on success.
- captain.controllers.js — registerCaptain, login, captain profile.
- map.controllers.js — geocoding, distance/time endpoints using Maps service.
- ride.controllers.js — createRide1, getfare1, confirmRide1, startRide1, endRide. Core ride lifecycle and validation.

Services/ (business logic / external APIs)
- user.service.js — DB operations for users.
- captain.service.js — DB operations for captains.
- maps.service.js — wrappers for Google Maps Geocoding/DistanceMatrix/Places APIs.
- ride.service.js — fare calculation, distance handling, getCaptainsInTheRadius helper.

Models/ (Mongoose schemas)
- user.model.js — user schema (fullname, email, phone, password, etc).
- captain.model.js — captain schema (fullname, vehicle details, location).
- ride.model.js — ride schema (user, captain, pickup/destination, fare, otp, status).
- blacklistToken.model.js — stores invalidated JWTs for logout.

Routes/
- user.routes.js — /api/users endpoints; attaches user.controllers.
- captain.routes.js — /api/captains endpoints.
- ride.routes.js — /api/rides endpoints.
- maps.routes.js — /api/maps endpoints.

Middleware/
- auth.middleware.js — JWT verification and role-based guards (user vs captain).

Database/
- db.js — mongoose connection bootstrap.

Notes on key backend flows
- createRide1: geocodes pickup/destination, calculates distance/time, computes fare via ride.service.getfare, finds captains within radius (e.g., 20 km), emits `new-ride` socket events to nearby captains.
- confirmRide1: captain accepts ride, updates ride record and emits `ride-confirmed` to the user.
- startRide1: verifies OTP, marks ride started and emits `ride-started`.
- endRide: finalizes ride, calculates final fare, emits `ride-completed`.

Error handling
- Validation errors returned as structured JSON: { errors: [ { msg, param, ... } ] } or { message: "..." }.
- Controllers should catch and return proper status codes (400/422/500).



## API summary (important endpoints)

Users
- POST /api/users/register — register user
- POST /api/users/login — login
- GET /api/users/profile — get profile (auth)

Captains
- POST /api/captains/register — register captain
- POST /api/captains/login — login
- GET /api/captains/profile — get profile (auth)

Rides
- POST /api/rides/create — create ride (user)
- GET /api/rides/get-fare?pickup=&destination= — fare estimate
- POST /api/rides/confirm — captain accepts ride
- GET /api/rides/start-ride?rideId=&otp= — start ride (otp)
- POST /api/rides/end-ride — end ride

Maps
- GET /api/maps/get-maps?address= — geocode address
- GET /api/maps/get-distance-time?origin=&destination= — distance/time

Sockets (Realtime)
- new-ride (server -> captains in radius)
- ride-confirmed (captain -> user)
- ride-started
- ride-completed
- captain-location updates

Refer to Backend/Controllers for full JSON request/response shape and validation details.
