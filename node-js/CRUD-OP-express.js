const Joi = require('joi');
const express = require('express');
const app = express();
const mongo = require('mongodb');



app.use(express.json());

const courses = [

    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];



app.get('/', (req,res) => {

res.send('Hello Yazeeds World!!');

});


app.get('/api/courses', (req, res) => {

res.send(courses);


});





app.post('/api/courses', (req, res) => {
  const schema = {
  name: Joi.string().min(3).required()
  };

  const result = Joi.validate(req.body, schema);
  if(result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }


   if(!req.body.name || req.body.name.length < 3) {
   //Bad Request 400
  res.status(400 ).send('Name is required and name needs to be at least 3 charchaters');
     return; 
   }

    const course =  {
     id: courses.length + 1,
     name: req.body.name

    };


    courses.push(course);
    res.send(course);
 
});



app.put('/api/courses/:id', (req, res) =>  {

    //Look for the course if it doesnt exist display message    
    const course = courses.find( c => c.id === parseInt(req.params.id));
      if(!course)
         res.status(404).send('The course with the given ID doesnt exist in the database.');

    // Validation 
    const schema = {

        name: Joi.string().min(3).required()

    };     

    const {error} = validateCourse(req.body);
     if(error){
         res.status(400).send(result.error.details[0].message);
         return;   
     }


    //Update Course
    course.name = req.body.name; 
    res.send(course);

});




function validateCourse(course) {

const schema = {

name: Joi.string().min(3).required()

};

return Joi.validate(course, schema);

}




app.delete('/api/courses/:id', (req, res) => {

//Identify Course
const course = courses.find(c => c.id ===parseInt(req.params.id));
if(!course)
  res.status(404).send('The course with the given ID was not found');


//Delete
 const index = courses.indexOf(course);
 courses.splice(index, 1);

 res.send(course);


});

// /api/courses/1

app.get('/api/courses/:id', (req, res) => {
const course = courses.find(c => c.id === parseInt(req.params.id));
 if(!course) res.status(404).send('The course with the given ID was not found');// 404 ERROR
 res.send(course);

});



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
