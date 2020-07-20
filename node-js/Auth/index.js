const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();


//db connect
mongoose.connect(process.env.db_connect, { useNewUrlParser: true, useUnifiedTopology: true  }, () => {

    console.log('[Success]: connected to Database..');
    
});

//midllewares
app.use(express.json());


//Routes middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


//start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisening on port ${port} ..`));
