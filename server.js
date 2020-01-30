// This is to fetch the json data from a facebook event url
// Example: https://www.facebook.com/events/1007081202966526/

const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();

app.get("/", (req, resp) => {
  console.log(req.query);

  if (req.query["event-url"]) {
    axios
      .get(req.query["event-url"], {
        headers: { "Accept-Language": "da-DK" }
      })
      .then(res => {
        var $ = cheerio.load(res.data);
        var json = $('script[type="application/ld+json"]')[0].children[0].data;
        resp.send(JSON.parse(json));
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    resp.send("You need to add the event-url parameter");
  }
});

app.listen(8080);
