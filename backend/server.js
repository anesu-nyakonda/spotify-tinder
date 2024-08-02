const express = require("express");

const app = express();
const redirect_uri = "http://localhost:3000/callback";
const url = "https://accounts.spotify.com/authorize?";
let code = null;

//if the user has authorized

redirectToAuth = async () => {
  const params = await new URLSearchParams();
  params.append("response_type", "code");
  params.append("client_id", process.env.client_id);
  params.append("redirect_uri", redirect_uri);

  app.get("/login", (req, res) => {
    res.redirect(url + `${params.toString()}`);
  });
};

getAuthcode = async () => {
  app.get("/callback", (req, res) => {
    code = req.query.code;
    res.send("nice");
  });
};

getAccess_token = async (code) => {
  const auth_options = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
  };

  console.log("hey");
  let response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: JSON.stringify(auth_options),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
  });

  console.log(response.json());
};

if (code == null) {
  redirectToAuth();
} else {
  getAuthcode();
  getAccess_token(code);
}

app.listen(3000, () => {
  console.log("listening on port sd3000");
});
