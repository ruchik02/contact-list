const mongoose = require("mongoose");

//connect to database
mongoose.connect("mongodb://localhost/contacts_list_db");

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running the print the message
db.once("open", function () {
  console.log("Succesfully Connected to the Database");
});
