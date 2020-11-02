import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Illustration from "./illustration-01.png";

import "bootstrap/dist/css/bootstrap.css";

//Consumo do material UI 
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles(); // Material UI

  const [comment, setComment] = useState("");
  const [commenList, setCommentList] = useState([]);
 
  useEffect(() => {
    Axios.get("http://localhost:4000/api/get").then((response) => {
      setCommentList(response.data);
    });
  }, []);

  const submitComment = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/api/insert", {
      comment: comment,
    }).then(() => {
      alert("Successful insert");
    });
  };

  return (
    <div className={classes.root}>
      <div className="d-flex justify-content-center mt-5  mb-5">
        <h1>Text to Speech - IBM Watson</h1>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
        
          <Paper className=" ml-3 comment-paper">
            <div className="d-flex flex-column mr-5 ml-5">
              <label className="mt-5"> Escreva seu comentário abaixo:</label>
              <textarea
                type="text"
                name="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}/>
              
              <button className="mb-5 mt-2" onClick={submitComment}>
                Cadastrar
              </button>
           </div>
          
          </Paper>
          <img className="mt-5 ml-4" width="800px" src={Illustration}/>
        
        </Grid>

        <Grid item xs={6}>
        
          <Paper className="d-flex flex-column justify-content-center comment-paper-right">
            {commenList.map((val) => {
              return (
                <div className="d-flex justify-content-center">
                  <Paper className="w-50 align-items-center mt-5 comment-box">
                    <p className="mt-3 ml-3 ">Comment: {val.comment}</p>
                  </Paper>
                </div>
              );
            })}
          </Paper>
        
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
