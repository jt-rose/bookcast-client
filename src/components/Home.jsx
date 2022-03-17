import React, { useState, useEffect } from 'react'
import Edit from './Edit'
import axios from 'axios'
import Add from './Add'
import "../styles/Datas.css"
import "../styles/home.css";
const Home = () => {
 
    let [castings, setCastings] = useState([])

    const getCastings = () => {
     axios
       .get('https://bookcast-server.herokuapp.com/api/castings/')
       .then(
         (response) => setCastings(response.data),
         (err) => console.error(err)
       )
       .catch((error) => console.error(error))
    }

    const handleCreate = (addCasting) => {
    axios
      .post('https://bookcast-server.herokuapp.com/api/castings/', addCasting)
      .then((response) => {
        console.log(response)
        getCastings()
      })
  }
  const handleDelete = (event) => {
    axios
      .delete('https://bookcast-server.herokuapp.com/api/castings/' + event.target.value)
      .then((response) => {
        getCastings()
      })
  }
  const handleUpdate = (editCasting) => {
    console.log(editCasting)
    axios
      .put('https://bookcast-server.herokuapp.com/api/castings/' + editCasting.id + '/', editCasting)
      .then((response) => {
        getCastings()
      })
    }

    useEffect(() => {
        getCastings()
       }, [])

    return (
        <>
        <Add handleCreate={handleCreate} />
    <div className="castings">
      {castings.map((casting, index) => {
        return (
          <div className="casting" key={casting.id + index}>
              <h4><span>Date:</span> {casting.created}</h4>
              <h4><span>Name:</span> {casting.creator}</h4>
            <h1 className="title">{casting.source_name}</h1>
            <img src = {casting.source_image_url}></img>
            <h5><span>Description:</span> {casting.description}</h5>
            <Edit handleUpdate={handleUpdate} id={casting.id} />
            <button className="btn" onClick={handleDelete} value={casting.id}>X</button>
          </div>
        )
      })}
     </div>


        
        </>
  
    )
}

export default Home;
