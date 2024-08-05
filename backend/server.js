const express = require("express");
const { get } = require("http");
const querystring = require("querystring");
const app = express();
const redirect_uri = "http://localhost:3000/callback";
const url = "https://accounts.spotify.com/authorize?";
let code = undefined;
const params = new URLSearchParams();

if (code == undefined) {
  redirectAuthflow(process.env.CLIENT_ID);
}

async function redirectAuthflow(client_id) {
  app.get("/login", (req, res) => {
    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          redirect_uri: redirect_uri,
        })
    );
  });

  app.get("/callback", (req, res) => {
    code = req.query.code;
    if (code != undefined) {
      getAccessToken(code, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
    }

    res.send("hey");
  });
}

async function getAccessToken(code, client_id, client_secret) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  });

  const result = await response.json();
  console.log(result.access_token);
}

app.listen(3000, () => {
  console.log("listening on port sd3000");
});
