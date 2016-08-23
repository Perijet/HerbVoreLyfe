/* GET 'home' page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', { 
  	    title: 'HerbVoreLyfe - Find vegan friendly eating establishments near you!!',
        pageHeader: {title: 'HerbVoreLyfe', 
        strapline: 'Find vegan friendly eating establishments near you!!'
		},
		locations:[{
			name: 'Vegan World',
			address: '100 Weldon Blvd, Sanford, FL 32773',
			rating: 3,
			facilities: ['Hot drinks', 'Food', 'wifi'],
			distance: '100m'
		},
		{	name: 'Health Spot',
			address: '4000 Central Florida Blvd, Orlando, FL 32816',
			rating: 4,
			facilities: ['Hot drinks', 'Food', 'wifi'],
			distance: '200m'
		},
		{	name: 'Green Town',
			address: '701 Econlockhatchee Trail, Orlando, FL 32825',
			rating: 2,
			facilities: ['Hot drinks', 'Food', 'wifi'],
			distance: '100m'
		}] 
	});
};

/* GET 'Location onformation' page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
        title: 'Vegan World',
        pageHeader: {
            title: 'Vegan World'
        },
        sidebar: {
            context: 'is on HerbVoreLyfe because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Vegan World',
            address: '100 Weldon Blvd, Sanford, FL 32773',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 28.6068900,
                lng: -81.1972750
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Paul Simon',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'This is a great restaurant. I can\'t say enough good things about it.'
            }, {
                author: 'Bob Barker',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'This was an ok spot. Good selection of vegan treats.'
            }]
        }
    });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
  res.render('location-review-form', { 
  	title: 'Review Green Spot on HerbVoreLyfe',
  	pageHeader: {title: 'Review Green Spot'}
  	 });
};