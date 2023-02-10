// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

// Get the connection object
const db = mongoose.connection;

// error
db.on('error', (err)=>{
    console.log('Mongoose error',err);
});

db.once('open', ()=>{
    console.log('Connection to db successfully established')
});
