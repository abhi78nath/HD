// Simple Api to find update from some given hostel object

const express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.json());

const hostels = [
  { id: 1, name: "hostel1" },
  { id: 2, name: "hostel2" },
  { id: 3, name: "hostel3" },
];

app.get("/", (req, res) => {
  res.send("HI there");
});

app.get("/api/hostels", (req, res) => {
  res.send(hostels);
});

app.get("/api/hostels/:id", (req, res) => {
  const hostel = hostels.find((c) => c.id === parseInt(req.params.id));
  if (!hostel) {
    res.status(404).send("Not Found with given id");
    console.log("Error");
  }
  res.send(hostel);
});

app.post("/api/hostels", (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Name is required and should be minimum 3 characters");
    console.log("Error");
    return;
  }
  if (req.body.name.length < 3) {
    res.status(400).send("Name Length should be atleast 3 characters");
    console.log("Error");
  }

  const hostel = {
    id: hostels.length + 1,
    name: req.body.name,
  };

  hostels.push(hostel);
  res.send(hostel);
});

app.put("/api/hostels/:id", (req, res) => {
  const hostel = hostels.find((c) => c.id === parseInt(req.params.id));
  if (!hostel) {
    res.status(404).send("Not Found with given id");
    console.log("Error");
  }

  if (!req.body.name) {
    res.status(400).send("Name is required");
    console.log("Error");
    return;
  }
  if (req.body.name.length < 3) {
    res.status(400).send("Name Length should be atleast 3 characters");
    console.log("Error");
  }

  hostel.name = req.body.name;
  res.send(hostel);
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
