import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../styles/jihee.css"
import Add from './Add'



const Discover = (props) => {
    let [discovers, setDiscovers] = useState([])
    let [filter, setFilter] = useState('')
    
    const getDiscovers = () => {
        axios
        .get('https://bookcast-server.herokuapp.com/api/castings/')
        .then(
          (response) => setDiscovers(response.data),
          (err) => console.error(err)
        )
        .catch((error) => console.error(error))
     }


     const handleDelete = (event) => {
        axios
          .delete(
            "https://bookcast-server.herokuapp.com/api/castings/" +
              event.target.value,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + props.tokenData.token,
              },
            }
          )
          .then((response) => {
            getDiscovers();
          });
      };
    
      useEffect(() => {

        getDiscovers()
       }, [])

   const handleUpdate = (editCasting) => {
    console.log(editCasting);
    axios
      .put(
        "https://bookcast-server.herokuapp.com/api/castings/" +
          editCasting.id +
          "/",
        editCasting,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then((response) => {
        getDiscovers();
      });
  };


    return (
        <>
        <h1>discover</h1>
        <div className = 'searchDiv'>

<input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => 
{e.preventDefault(); setFilter(e.target.value);
}}
></input>
</div>
        <div className="discovers">

      {discovers.filter((search) =>
        search.source_name.toLowerCase().includes(filter.toLowerCase())).map((discover, index) => {
        return (
          <div className="discover" key={discover.id + index}>
              <p>Date: {discover.created}</p>
            <h4>{discover.source_name}</h4>
            <img src = {discover.source_image_url}></img>
            <h5>Description: {discover.description}</h5>
            {/* <button onClick={handleDelete} value={discover.id}>X</button> */}
          </div>
        )
      })}
     </div>

        </>
    )
}

export default Discover;