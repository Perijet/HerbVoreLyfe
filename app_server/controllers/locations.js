var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://murmuring-ocean-31109.herokuapp.com";
}

var renderHomepage = function(req, res, responseBody){
    var message;
    if(!(responseBody instanceof Array)){
        message = "API lookup error";
        responseBody = [];
    }else{
        if(!responseBody.length){
            message = "No places found nearby";
        }
    }
    res.render('locations-list', { 
        title: 'HerbVoreLyfe - Find vegan friendly eating establishments near you!!',
        pageHeader: {title: 'HerbVoreLyfe', 
        strapline: 'Find vegan friendly eating establishments near you!!'
        },
        locations:responseBody, 
        message: message
    });
};

/* GET 'home' page */
module.exports.homelist = function(req, res) {
    var requestOptions, path;
    path ='/api/locations';
    requestOptions = {
        url: apiOptions.server + path,
        method: "get",
        json: {},
        qs: {
            lng: -81.1972750,
            lat: 28.6068900,
            maxDistance: 20
        }
    };
    request(
        requestOptions,
        function(err, response, body){
            var i, data;
            data = body;
            if(response.statusCode === 200 && data.length){
                for (i = 0; i < data.length; i++){
                    data[i].distance = _formatDistance(data[i].distance);
                }
            }
           renderHomepage(req, res, data); 
       });
};

var _formatDistance = function(distance){
    var numDistance, unit;
    if(distance > 1){
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'mi';
    }else{
        numDistance =  parseInt(distance * 1760,10);
        unit = 'mi';
    }
};

var renderDetailsPage = function(req, res, locDetail){
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {
            title: locDetail.name
        },
        sidebar: {
            context: 'is on HerbVoreLyfe because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: locDetail
    });
};

/* GET 'Location onformation' page */
module.exports.locationInfo = function(req, res) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    };
    request(
        requestOptions, 
        function(err, response, body){
            var data = body;
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            console.log(body);
            renderDetailsPage(req, res, data);
        });   
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  res.render('location-review-form', { 
  	title: 'Review Green Spot on HerbVoreLyfe',
  	pageHeader: {title: 'Review Green Spot'}
  	 });
};