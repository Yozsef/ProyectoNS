const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost/notes-app'

mongoose.connect(MONGODB_URI, {
})
    .then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.log(err));