const express= require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;
const publicPathDirectory = path.join(__dirname, '../public');

app.use(express.static(publicPathDirectory));


app.listen(port, () => {
	console.log(`Server is up on port ${port}!`)
})