var express = require('express');
var app = express();
const json2html = require('node-json2html');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const axios = require('axios');
//var main_url = = process.env.TARGET;
var main_url = "http://studentportal-sample.2886795288-80-hazel04.environments.katacoda.com";
var main_url_list = main_url + "/students";
var main_url_post = main_url + "/add";

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/main');
});

// render json page
app.get('/renderdata', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      res.render('pages/renderdata', {
        mascots: mascots
      });
});

// render json from external RestAPI
var request = require('request');
app.get('/request_ex', function(req, res) {
    request('https://jsonplaceholder.typicode.com/users', function(error, response, body) {
        var mascots = JSON.parse(body);
        res.render('pages/request_ex', {
            mascots: mascots
          });
    });
});

// render json from external RestAPI
app.get('/request_in', function(req, res) {
    request(main_url_list, function(error, response, body) {
        var mascots = JSON.parse(body);
        res.render('pages/request_in', {
            mascots: mascots
          });
    });
});

// insert json data page
app.get('/insertdata', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      res.render('pages/insertdata', {
        mascots: mascots
      });
});

// post the added json data page
app.post('/postdata', urlencodedParser, (req, res) => {
    var jsondata = JSON.stringify(req.body);
    const axios = require('axios');

    async function makeGetRequest() {

    //let payload = JSON.stringify(req.body);
    let payload = {"id":"999","name":req.body.name,"address":req.body.address};

    let res = await axios.post(main_url_post, payload);

    let data = res.data;
    console.log(data);
    }

    makeGetRequest();
    //res.render('pages/main');
    res.render('pages/insert_ok', {data: req.body});
});

app.listen(8080);
console.log('Server is listening on port 8080');
console.log(main_url_list);
console.log(main_url_post);