import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
global.access_token;

app.get("/kaj", (req, res) => {
  res.send("hello");
});

app.get("/authorize", (req, res) => {
  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: "",
    redirect_uri: "http://localhost:5000/callback",
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  var body = new URLSearchParams({
    code: code,
    redirect_uri: "http://localhost:5000/callback",
    grant_type: "authorization_code",
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: body,
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from("" + ":" + "").toString("base64"),
    },
  });

  const data = await response.json();
  global.access_token = data.access_token;

  res.redirect("http://localhost:5000/dashboardStart");
});

async function FetchData(endpoint) {
  const response = await fetch("https://api.spotify.com/v1" + endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();

  return data;
}

async function FetchDataPlayLIst(endpoint) {
  const response = await fetch(endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + global.access_token,
    },
  });

  const data = await response.json();

  return data;
}

app.get("/dashboardStart", async (req, res) => {
  const sendData = await FetchData("/browse/categories");

  res.send(sendData);
});

app.get("/getTracks", async (req, res) => {
  const categ = req.query["categ"];

  const sendData = await FetchData(
    "/browse/categories/" + categ + "/playlists"
  );

  res.send(sendData);
});

app.get("/end", async (req, res) => {
  const Pid = req.query["Pid"];
  const sendData = await FetchDataPlayLIst(
    "https://api.spotify.com/v1/playlists/" + Pid + "/tracks"
  );

  res.send(sendData);
});

app.get("/endTrack", async (req, res) => {
  const sendData = await FetchDataPlayLIst(
    "https://api.spotify.com/v1/tracks/4tEr9oykqAlnLnaltbjoDe"
  );

  res.send(sendData);
});

app.listen(5000);
