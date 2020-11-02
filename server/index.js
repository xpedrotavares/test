const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mysql = require("mysql");

const TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const fs = require("fs"); 

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); //uma das tentativas de enviar o .mp3 para a /public e depois pega-la no front.

// Configuração do mysql
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "smarkioDatabase",
});

// Configuração da API Text-to-Speech
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.APIKEY,
  }),
  serviceUrl: process.env.SERVICEURL,
  disableSslVerification: true,
});

const getVoiceParams = {
  voice: "pt-BR_IsabelaVoice",
};

textToSpeech
  .getVoice(getVoiceParams)
  .then((voice) => {
    console.log(JSON.stringify(voice, null, 2));
  })
  .catch((err) => {
    console.log("error:", err);
  });

//rotas

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM comments";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, rest) => {
  const comment = req.body.comment;

  const sqlInsert = `INSERT INTO comments (comment) VALUES ("${comment}")`;
  db.query(sqlInsert, [comment], (err, result) => {
    console.log(err);
  });

 
  const synthesizeParams = {
    text: comment,
    accept: "audio/wav",
    voice: "pt-BR_IsabelaVoice",
  };

  //consumo da API
  textToSpeech
    .synthesize(synthesizeParams)
    .then((response) => {
      const audio = response.result;
      audio.pipe(fs.createWriteStream(`${comment}.mp3`));
    })
    .then((buffer) => {
      fs.writeFileSync("hello_world.wav", buffer);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});

app.get("/", (req, res) => {});

app.listen(4000, () => {
  console.log("running on port 4000");
});
