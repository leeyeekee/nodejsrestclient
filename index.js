const express = require('express')
const app = express();
const port = 8000;
const json2html = require('node-json2html');
var path = require('path');
var fs = require('fs');

let html = json2html.render(
    [
        {"name": "Justice League", "year":2021},
        {"name": "Coming 2 America", "year":2021}
    ], 
    {"<>": "li", "html":[
    	{"<>": "span", "text": "${name} (${year})"}
      ]});

app.get('/render', (req, res) => {
	res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
