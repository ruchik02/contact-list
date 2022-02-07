const { urlencoded } = require("express");
const express = require("express");
const req = require("express/lib/request");
const path = require("path");
const port = 8000;

const db = require("./Config/mongoose");
const Contact = require("./Models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static("assets"));



var contactList = [
  {
    name: "Ruchika",
    phone: "88888888",
    email: "Ruchika@email.com",
  },
  {
    name: "Kriti",
    phone: "333333390",
    email: "Kriti@email.com",
  },
  {
    name: "Tushar",
    phone: "0987123402",
    email: "Tushar@email.com",
  },
];

app.get("/delete-contact/", function (req, res) {
  //get the id from query in the url
  let id = req.query.id;

  //find the contact in the database using id and delete
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("err in deleting an object from db");
      return;
    }

    return res.redirect("/display-contacts");
  });
});

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Err in fetching contact from DB");
      return;
    }
    return res.render("home", {
      title: "Create Contact",
      contact_List: contacts,
    });
  });
});

app.get("/display-contacts", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("Err in fetching contact from DB");
      return;
    }
    return res.render("displayContacts", {
      title: "Display Contact",
      contact_List: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "PlayGround",
  });
});

app.post("/create-contact", function (req, res) {

  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a contact!!");
        return;
      }

      console.log("*********", newContact);
      return res.redirect("back");
    }
  );
});

app.listen(port, function (err) {
  if (err) {
    console.log("An occur has occured!!");
  }

  console.log("Your Server is running on port", port);
});
