// const jsonld_request = require("jsonld-request");

// jsonld_request("https://www.facebook.com/events/1007081202966526/", function(
//   err,
//   res,
//   data
// ) {
//   res.body = "";
//   console.log(res.json);
// });

// const request = require("request");
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
        var image =
          $(".scaledImageFitWidth").attr("src") ||
          $(".scaledImageFitHeight").attr("src");

        json.image = image;

        resp.send(json);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    resp.send("You need to add the event-url parameter");
  }
});

app.listen(8080);

//
