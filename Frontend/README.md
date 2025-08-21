# Frontend

Frontend for an Uber-like ride-hailing application built with React, Vite and Tailwind CSS.  
This app supports user & captain authentication, ride booking, live tracking (Google Maps) and real-time updates via Socket.io.

---

## Table of contents
- Project overview
- Prerequisites
- Environment variables
- Project structure
- Key components & pages

## Project overview
This frontend communicates with a backend API to:
- Register/login users and captains
- Create and confirm rides
- Display live tracking and directions on Google Maps
- Receive real-time ride updates using Socket.io

Tech: React 18 + Vite, Tailwind CSS, Axios, react-router, react-hot-toast / react-toastify, @react-google-maps/api, Socket.io-client.

## Prerequisites
- Node.js >= 16
- npm (or yarn)
- Backend server running and accessible (see `VITE_BASE_URL`)
- Google Maps API key with Maps JavaScript and Directions APIs enabled

## Environment variables
Create a `.env` file at the project root (Frontend/) with at least:

```
VITE_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

- VITE_BASE_URL — base URL for backend API.
- VITE_GOOGLE_MAPS_API_KEY — Google Maps JS API key.


## Project structure (important parts)
```
Frontend/
├── public/
│   └── images/
└── src/
    ├── App.jsx
    ├── assets/
    │   ├── assets.js
    ├── Components/
    │   ├── CaptainDetails.jsx
    │   ├── ConfirmRide.jsx
    │   ├── ConfirmRidePopUp.jsx
    │   ├── FinishRide.jsx
    │   ├── Livetracking.jsx
    │   ├── Livetracking1.jsx
    │   ├── LocationSearchPanel.jsx
    │   ├── LookingForDriver.jsx
    │   ├── RidePopUp.jsx
    │   ├── VehiclePanel.jsx
    │   └── WaitForDriver.jsx
    ├── Context/
    │   ├── CaptainContext.jsx
    │   ├── SocketContext.jsx
    │   └── UserContext.jsx
    └── pages/
        ├── CaptainHome.jsx
        ├── CaptainLogin.jsx
        ├── CaptainProtected.jsx
        ├── CaptainRiding.jsx
        ├── CaptainSignup.jsx
        ├── Home.jsx
        ├── Start.jsx
        ├── UserLogin.jsx
        ├── UserProtected.jsx
```

## Key Components & Pages (summary)

- src/Components/Livetracking.jsx, Livetracking1.jsx  
  - Google Maps integration. Renders map, markers, route (DirectionsRenderer). Used for live route visualization in both UserRiding and CaptainRiding.

- src/Components/LocationSearchPanel.jsx  
  - Address input and autocomplete. Calls maps API to resolve addresses to coordinates and updates pickup/destination.

- src/Components/VehiclePanel.jsx  
  - Vehicle selection UI and fare/option display for users.

- src/Components/RidePopUp.jsx & ConfirmRidePopUp.jsx  
  - Small overlays showing ride details, user/captain info and accept/confirm actions.

- src/Components/LookingForDriver.jsx / WaitForDriver.jsx / FinishRide.jsx  
  - Flow components for ride lifecycle: waiting for captain, in-progress, finish/payment screens.

- src/Components/CaptainDetails.jsx  
  - Displays captain profile and vehicle details inside ride UI.

- src/Components/ConfirmRide.jsx  
  - UI for confirming ride start/OTP and related actions.

- src/pages/Start.jsx  
  - Landing page / initial entry.

- src/pages/Home.jsx  
  - Main booking screen: location search, vehicle selection, fare preview.

- src/pages/UserSignup.jsx / UserLogin.jsx  
  - User auth forms, calls backend, shows validation toasts.

- src/pages/CaptainSignup.jsx / CaptainLogin.jsx  
  - Captain auth forms and vehicle registration.

- src/pages/UserRiding.jsx  
  - User side live ride screen. Embeds Livetracking, shows captain info, payment flow, listens to socket events.

- src/pages/CaptainRiding.jsx  
  - Captain side live ride screen. Shows driver location, route, controls to start/end ride and send updates.

- src/pages/CaptainHome.jsx  
  - Captain dashboard: incoming rides, nearby requests, statistics.

- src/pages/UserProtected.jsx / CaptainProtected.jsx  
  - Route guards for authenticated pages.

- src/Context/SocketContext.jsx  
  - Socket.io client provider; emits/listens to realtime events (new-ride, ride-confirmed, ride-started, ride-completed).

- src/Context/UserContext.jsx & CaptainContext.jsx  
  - Global auth state and helper methods (setUser/setCaptain, token management).