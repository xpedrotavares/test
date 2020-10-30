const express = require("express")
const app = express()
const mysql = require("mysql")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "smarkioDatabase",
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO comments (comment, name) VALUES ('good', 'pedro alm');"
    db.query(sqlInsert, (err, result) =>{
        res.send("hello world")

    })
});

app.listen(4000, () => {
    console.log("running on port 4000")
});