import http from 'http';  
import app from './app.js';
import connectDB from './Database/db.js';
import { initializeToSocketId } from './socket.js';

const PORT = process.env.PORT || 3000;


const server = http.createServer(app)

// Initialize socket.io
initializeToSocketId(server);

server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});