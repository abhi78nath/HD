// Simple Api to find update from some given course object
// SHould be run in Thunder client or Postman
const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var url = String(process.env.HOSTNAME).split("-");

app.use(express.json());

const courses = [
  { id:1, name: 'course1' },
  { id:2, name: 'course2' },
  { id:3, name: 'course3' },
];

app.get('/', (req,res) => {
  res.send("HI there");
});

app.get('/api/courses', (req,res) => {
  res.send(courses);
});

app.get('api/courses/:id'), (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
    {
        res.status(404).send('Not Found with given id');
    }
    res.send(course)
}

app.post('api/courses', (req,res) => {
  if(!req.body.name) {
    res.status(400).send('Name is required and should be minimum 3 characters')
    return;
  }
  if(req.body.name.length < 3) {
    res.status(400).send("Name Length should be atleast 3 characters")
  }
  
  const course = {
    id: course.length + 1,
    name: req.body.name
  };
  
  courses.push(course);
  res.send(course);
})

app.put('/api/courses/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course)
    {
        res.status(404).send('Not Found with given id');
    }

    if(!req.body.name) {
        res.status(400).send('Name is required')
        return;
      }
      if(req.body.name.length < 3) {
        res.status(400).send("Name Length should be atleast 3 characters")
      }


      course.name = req.body.name;
      res.send(course);
})



// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
