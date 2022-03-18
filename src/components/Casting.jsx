import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import axios from "axios";
import Add from "./Add";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Datas.css";

const Casting = (props) => {

    let [castings, setCastings] = useState([])
    let [filter, setFilter] = useState('')

    let navigate = useNavigate();

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
      .post('https://bookcast-server.herokuapp.com/api/castings/', addCasting,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + props.tokenData.token,
        },
      })
      .then((response) => {
        console.log(response)
        getCastings()
      })
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
        getCastings();
      });
  };

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
        getCastings();
      });
  };

  useEffect(() => {
    getCastings();
  }, []);


    return (
        <>
        <div className = 'searchDiv'>
        <input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => 
{e.preventDefault(); setFilter(e.target.value);
}}
></input>
</div>
        <Add handleCreate={handleCreate} />
    <div className="castings">
    {castings.filter((search) =>
        search.source_name.toLowerCase().includes(filter.toLowerCase())).map((casting, index) => {
        return (
          <div
              className="casting"
              key={casting.id + index}
              onClick={() => {
                navigate("/cast/" + casting.id);
              }}
            >
            <h4>Date: {casting.created}</h4>
            <h4>{casting.source_name}</h4>
            <img src = {casting.source_image_url}></img>
            <h5>Description: {casting.description}</h5>
              <Edit handleUpdate={handleUpdate} id={casting.id} />
            <button onClick={handleDelete} value={casting.id}>X</button>
          </div>
        )
      })}
     </div>


        
        </>
  
    )
}

export default Casting;
