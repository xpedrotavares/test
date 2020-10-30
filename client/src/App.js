import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';


function App() {
  const [comment, setComment] = useState('')
  const [commenList, setCommentList] = useState([])
  useEffect(() => {
    Axios.get('http://localhost:4000/api/get').then((response) => {
      setCommentList(response.data)
    })
  }, [])

  const submitComment = () => {
    Axios.post('http://localhost:4000/api/insert', {
      comment: comment
    }).then(() => {
      alert("Successful insert")
    })
  }

  return (
    <div className="App">
      <h1>Comentário:</h1>
    <div className="form">
      <label> Comentário</label>
      <textarea type="text" name="comment" onChange={(e) => {
        setComment(e.target.value)
      }}/>
      <button onClick={submitComment}>Cadastrar</button>
<div>teste</div>

    {commenList.map((val) => {
      return <h1>Comment: {val.comment}</h1>
    })}
    </div>  
    </div>
  );
}

export default App;
