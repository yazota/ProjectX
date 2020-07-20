const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require('cors');

//Middlewares
app.use(cors());
app.use(bodyParser.json());



//Import Routes
const postsRoute = require('./routes/posts');



app.use('/posts', postsRoute);


//Routes

app.get('/', (req, res) => {

    res.send('Hoooary!');


});



//db connection
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true , useNewUrlParser: true }, () => {


console.log('Connected to Database ..');

});


//Server Listening 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on port ${port} ..`));

