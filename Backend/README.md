 # Backend API Documentation

This document describes all available API endpoints for the Uber backend, including request/response formats and descriptions.


## **User Endpoints**

### **Register User**
---
- **POST** `/api/users/register`
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john@example.com",
      "password": "password123",
      "phone": "9876543210"
    }
    ```
- **Success Response:**
    - **Status:** 201
    ```json
    {
      "token": "JWT_TOKEN",
      "user": { ...userObject }
    }
    ```
- **Error Response:**
    - **Status:** 422/400
    ```json
    { "errors": [ { "msg": "First name must be at least 3 characters long", ... } ] }
    ```
    or
    ```json
    { "message": "User already exists" }
    ```



### **Login User**
---
- **POST** `/api/users/login`
- **Description:** Login as a user.
- **Request Body:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
- **Success Response:**
    - **Status:** 200
    ```json
    {
      "token": "JWT_TOKEN",
      "user": { ...userObject }
    }
    ```
- **Error Response:**
    - **Status:** 401/422
    ```json
    { "message": "Invalid email or password" }
    ```



### **Get User Profile**
---
- **GET** `/api/users/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get the logged-in user's profile.
- **Success Response:**
    - **Status:** 200
    ```json
    { "user": { ...userObject } }
    ```
- **Error Response:**
    - **Status:** 404
    ```json
    { "message": "User not found" }
    ```



### **Logout User**
---
- **GET** `/api/users/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Logout the user (blacklists the token).
- **Success Response:**
    - **Status:** 200
    ```json
    { "message": "Logged out successfully" }
    ```



## **Captain Endpoints**

### **Register Captain**
---
- **POST** `/api/captains/register`
- **Description:** Register a new captain.
- **Request Body:**
    ```json
    {
      "fullname": { "firstname": "Jane", "lastname": "Smith" },
      "email": "jane@example.com",
      "password": "password123",
      "phone": "9876543211",
      "vehicle": {
        "color": "Red",
        "plate": "KA01AB1234",
        "capacity": 4,
        "vehicleType": "Car"
      }
    }
    ```
- **Success Response:**
    - **Status:** 201
    ```json
    {
      "token": "JWT_TOKEN",
      "captain": { ...captainObject }
    }
    ```
- **Error Response:**
    - **Status:** 422/400
    ```json
    { "errors": [ { "msg": "First name must be at least 3 characters long", ... } ] }
    ```
    or
    ```json
    { "message": "Captain already exists" }
    ```



### **Login Captain**
---
- **POST** `/api/captains/login`
- **Description:** Login as a captain.
- **Request Body:**
    ```json
    {
      "email": "jane@example.com",
      "password": "password123"
    }
    ```
- **Success Response:**
    - **Status:** 200
    ```json
    {
      "token": "JWT_TOKEN",
      "captain": { ...captainObject }
    }
    ```
- **Error Response:**
    - **Status:** 401/422
    ```json
    { "message": "Invalid email or password" }
    ```



### **Get Captain Profile**
---
- **GET** `/api/captains/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get the logged-in captain's profile.
- **Success Response:**
    - **Status:** 200
    ```json
    { "captain": { ...captainObject } }
    ```



### **Logout Captain**
---
- **GET** `/api/captains/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Logout the captain (blacklists the token).
- **Success Response:**
    - **Status:** 200
    ```json
    { "message": "Logout successfully" }
    ```



## **Ride Endpoints**

### **Create Ride**
---
- **POST** `/api/rides/create`
- **Headers:** `Authorization: Bearer <user_token>`
- **Description:** Create a new ride request.
- **Request Body:**
    ```json
    {
      "pickup": "MG Road, Bangalore",
      "destination": "BTM Layout, Bangalore",
      "vehicleType": "car"
    }
    ```
- **Success Response:**
    - **Status:** 201
    ```json
    {
      "_id": "...",
      "user": "...",
      "pickup": "...",
      "destination": "...",
      "fare": 120,
      "otp": "123456",
      "distanceKm": 8,
      ...
    }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



### **Get Fare**
---
- **GET** `/api/rides/get-fare?pickup=...&destination=...`
- **Headers:** `Authorization: Bearer <user_token>`
- **Description:** Get fare estimate for a route.
- **Success Response:**
    - **Status:** 200
    ```json
    {
      "auto": 100,
      "car": 120,
      "moto": 80
    }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



### **Confirm Ride**
---
- **POST** `/api/rides/confirm`
- **Headers:** `Authorization: Bearer <captain_token>`
- **Description:** Captain accepts a ride.
- **Request Body:**
    ```json
    { "rideId": "rideObjectId" }
    ```
- **Success Response:**
    - **Status:** 200
    ```json
    { ...rideObject }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



### **Start Ride**
---
- **GET** `/api/rides/start-ride?rideId=...&otp=...`
- **Headers:** `Authorization: Bearer <captain_token>`
- **Description:** Captain starts the ride after OTP verification.
- **Success Response:**
    - **Status:** 200
    ```json
    { ...rideObject }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



### **End Ride**
---
- **POST** `/api/rides/end-ride`
- **Headers:** `Authorization: Bearer <captain_token>`
- **Description:** Captain ends the ride.
- **Request Body:**
    ```json
    { "rideId": "rideObjectId" }
    ```
- **Success Response:**
    - **Status:** 200
    ```json
    { ...rideObject }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```


## **Maps Endpoints**

### **Get Coordinates**
---
- **GET** `/api/maps/get-maps?address=...`
- **Headers:** `Authorization: Bearer <user_token>`
- **Description:** Get latitude and longitude for an address.
- **Success Response:**
    - **Status:** 200
    ```json
    { "ltd": 12.9716, "lng": 77.5946 }
    ```
- **Error Response:**
    - **Status:** 404
    ```json
    { "error": "Failed to fetch coordinates" }
    ```



### **Get Distance and Time**
---
- **GET** `/api/maps/get-distance-time?origin=...&destination=...`
- **Headers:** `Authorization: Bearer <user_token>`
- **Description:** Get distance and time between two addresses.
- **Success Response:**
    - **Status:** 200
    ```json
    {
      "distance": { "text": "8 km", "value": 8000 },
      "duration": { "text": "20 mins", "value": 1200 },
      ...
    }
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



### **Get Autocomplete Suggestions**
---
- **GET** `/api/maps/get-suggestions?input=...`
- **Headers:** `Authorization: Bearer <user_token>`
- **Description:** Get address autocomplete suggestions.
- **Success Response:**
    - **Status:** 200
    ```json
    [
      { "description": "MG Road, Bangalore, India", ... },
      ...
    ]
    ```
- **Error Response:**
    - **Status:** 400/500
    ```json
    { "errors": [ ... ] }
    ```



## **Socket Events (Realtime)**

- **new-ride**: Sent to captains in radius when a new ride is created.
- **ride-confirmed**: Sent to user when a captain accepts a ride.
- **ride-started**: Sent to user when the ride starts.
- **ride-completed**: Sent to user when the ride ends.


## **Notes**
- All endpoints (except register/login) require authentication via JWT in the `Authorization` header.
- Validation errors are returned as an array in errors.
- All times and distances are based on Google Maps API responses.