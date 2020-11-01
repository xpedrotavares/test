const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "smarkioDatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'u3SZEfRn8dTez3xlwKFqZUOywqvIIbVXf_d4Ood2kkHt',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/fcd31ceb-6f57-48d3-a499-8c6332644db9',
  disableSslVerification: true,
});


const getVoiceParams = {
  voice: 'en-US_AllisonV3Voice',
};

textToSpeech.getVoice(getVoiceParams)
  .then(voice => {
    console.log(JSON.stringify(voice, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });

 




app.get("/api/get", (req, res) =>{
    const sqlSelect = 
    "SELECT * FROM comments";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    
});

})

app.post("/api/insert", (req, rest) => {

    const comment = req.body.comment;
    const test = req.query
    console.log(`aqquuuuuiiiii ${test}`)

    const sqlInsert = 
    `INSERT INTO comments (comment) VALUES ("${comment}")`;
    db.query(sqlInsert, [comment], (err, result) => {
        console.log(err)


    })


const synthesizeParams = {

    text: comment,
    accept: 'audio/wav',
    voice: 'en-US_AllisonV3Voice',
  };

  textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    const audio = response.result;
    audio.pipe(fs.createWriteStream(`${comment}.mp3`));
})
  .then(buffer => {
    fs.writeFileSync('hello_world.wav', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });
})

// app.get("/api/get", async (req, res, next) => {
//     const comment = req.body.comment;
//     const params = {
//       text: comment,
//       accept: "audio/webm",
//       voice: "pt-BR_IsabelaVoice",
//     };
//     try {
//       const { result } = await textToSpeech.synthesize(params).catch((err) => {
//         console.log("error:", err);
//       });
//       const transcript = result;
//       transcript.pipe(res);
//     } catch (error) {
//       res.send(error);
//     }
//   });

 




app.get("/", (req, res) => {
  
});

app.listen(4000, () => {
    console.log("running on port 4000")
});