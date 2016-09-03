var request = require('request');
var apiOptions = {
    server: "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://murmuring-ocean-31109.herokuapp.com";
}

var _showError = function(req, res, status){
    var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var _formatDistance = function(distance){
    console.log(distance);
    var numDistance, unit;
    if(distance > 1){
        numDistance = parseFloat(distance).toFixed(3);
        unit = 'mi';
    }else{
        numDistance =  parseInt(distance * 1760, 10);
        unit = 'yds';
    }
    return numDistance + unit;
};

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
        title: 'HerbVoreLyfe - Find vegan/vegetarian eating options near your location!!',
        pageHeader: {title: 'HerbVoreLyfe', 
        strapline: 'Find vegan/vegetarian eating options near your location!'
        },
        locations:responseBody, 
        message: message
    });
};

var renderReviewForm = function(req, res, locDetail){
    res.render('location-review-form', {
        title: 'Review' + locDetail.name + 'on HerbVoreLyfe',
        pageHeader: {title: 'Review' + locDetail.name},
        error: req.query.err
    });
};

var getLocationInfo = function(req, res, callback){
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {}
    };
    request(
        requestOptions, 
        function(err, response, body){
            var data = body;
            if(response.statusCode === 200){
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            console.log(body);
            callback(req, res, data);
            }else{
                _showError(req, res, response.statusCode);
            }
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
    getLocationInfo(req, res, function(req, res, responseData){
        renderDetailsPage(req, res, responseData);
    });   
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    getLocationInfo(req, res, function(req, res, responseData){
        renderReviewForm(req, res, responseData);
    });
};

module.exports.doAddReview = function(req, res){
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 200) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};