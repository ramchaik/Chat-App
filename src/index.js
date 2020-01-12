const express= require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicPathDirectory = path.join(__dirname, '../public');

app.use(express.static(publicPathDirectory));

io.on("connection", (socket) => {
	console.log("new WebSocket connection.")

	socket.emit("message", "Welcome to Chat App!");

	socket.on("sendMessage", (message) => {
		io.emit("message", message);
	});
})

server.listen(port, () => {
	console.log(`Server is up on port ${port}!`)
})