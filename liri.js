require("dotenv").config();


var command = process.argv[2];
var thing = process.argv[3];
var Twitter = require('twitter');
var params = {
  screen_name: 'Aly@alybovee',
  count: 20
};

var keys = require('./keys');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: '37c05f4133704e6794fed05c77c27962',
  secret: 'e39f5dcf01e24572847d1babda5fd6c1'
});

var request = require('request');
var fs = require("fs");






// Twitter info.


var client = new Twitter({
  consumer_key: 'kloos9lVdmgI0Ut8IjF2kZvZU',
  consumer_secret: 'U9LuUF6FWsnB91uldUflooIZBVqoMILu6sgSXLorDXbIAo2vH0',
  access_token_key: '823211222174756864-CK8E2zTOJdTc9tbTflbRSpSDaVeRjfg',
  access_token_secret: 'Aom4ZuBQuDujgjAJxtah59z0u46nW9Y0gIRUNmBdqZkG8'

});


// Switch Statements

switch (command) {

  case 'my-tweets':
    myTweets();
    break;

  case 'spotify-this-song':
    spotifyThis(thing);
    break;

  case 'movie-this':
    movieThis(thing);
    break;

  case 'do-what-it-says':
    random();
    break;
}

// Tweet function

function myTweets() {
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i++) {
        var number = i + 1;

        console.log(tweets);
        console.log('-----------------------');
        console.log([i + 1] + '. ' + tweets[i].text);
        conosle.log('Tweeted on: ' + tweets[i].created_at);
        console.log('------------------------');

      }
    }
  });

}

// Spotify info.

function spotifyThis(thing) {
  if (thing == null) {
    thing = 'The Sign';
  }

  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
    console.log('--------------------');
    console.log('Artist(s): ' + data.tracks.item[0].artists[0].name);
    console.log('Song Title: ' + data.tracks.items[0].name);
    console.log('Preview Link: ' + data.tracks.items[0].preview_url);
    console.log('Album: ' + data.tracks.items[0].album.name);
  });

}

// Movie Omdbapi info


function movieThis(thing) {
  if (thing == null) {
    thing = 'Mr. Nobody';

  }
  let request = require("request");
  let title = process.argv[2];
  let queryUrl = `http://www.omdbapi.com/?t=${title}&y=&plot=short&apikey= 7501d130`;

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log(`Title: ${JSON.parse(body).Title}`);
      console.log(`Release Year: ${JSON.parse(body).Year}`);
      console.log(`Rating: ${JSON.parse(body).Rated}`);
      console.log(`Plot: ${JSON.parse(body).Plot}`);
      console.log(`Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}`);

    }


    else console.log(error);

  });

}

function random() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(error);

    } else {
      spotifyThis(data[1]);
    }

  });

}


