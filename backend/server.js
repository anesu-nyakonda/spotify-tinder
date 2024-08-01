const express = require("express");
const querystring = require("querystring");
const app = express();
const redirect_uri = "http://localhost:3000/callback";
const client_id = "4f9780101aba4626af7627cf4c2426ac";
const response_type = "code";

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

app.listen(3000, () => {
  console.log("listening on port sd3000");
});
