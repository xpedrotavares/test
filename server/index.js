const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "smarkioDatabase",
});

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) =>{
    const sqlSelect = 
    "SELECT * FROM comments";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    
});
})

app.post("/api/insert", (req, rest) => {

    const comment = req.body.comment;


    const sqlInsert = 
    "INSERT INTO comments (comment) VALUES (?)";
    db.query(sqlInsert, [comment], (err, result) => {
        console.log(err)
    })
})

app.get("/", (req, res) => {
  
});

app.listen(4000, () => {
    console.log("running on port 4000")
});