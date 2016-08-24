//Require mongoose
var mongoose = require('mongoose');
var gracefulShutdown;
//Assign mongoose URI to variable
var dbURI = 'mongodb://localhost/HerbVoreLyfe';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

//Used to listen for and log when mongoose is connected
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

//Used to listen for and log when mongoose has an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

//Used to listen for and log when mongoose is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

//gracefulShutdown function used close mongoose connection
//function is called from the three following processes below
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//Listen for nodemon SIGUSR2 and call gracefull shutdown function to kill process
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

//Listen for SIGINT on application termination
// and call gracefull shutdown function to exit Node process
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

//Listen for Heroku SIGTERM and call gracefull shutdown function to exit Node process
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

require('./locations');
