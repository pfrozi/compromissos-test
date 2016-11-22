var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:c0mpr0m1ss0s-test@ds159737.mlab.com:59737/compromissos-test')
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));
