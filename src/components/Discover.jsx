import axios from 'axios'
import React, { useState, useEffect } from 'react'
import "../styles/Datas.css"
import Add from './Add'



const Discover = (props) => {
    let [datas, setDatas] = useState([])
    let [filter, setFilter] = useState('')
    
    const getDatas = () => {
        axios
        .get('https://bookcast-server.herokuapp.com/api/castings/')
        .then(
          (response) => setDatas(response.data),
          (err) => console.error(err)
        )
        .catch((error) => console.error(error))
     }


      const handleDelete = (event) => {
        axios
          .delete('https://bookcast-server.herokuapp.com/api/castings/' + event.target.value, 
          {
              headers: {
              "Content-Type": "application/json",
              Authorization: "Token " + props.tokenData.token,
            },
          }
          )
          .then((response) => {
            setDatas()
          })
      }

    
      useEffect(() => {

        getDatas()
       }, [])




    return (
        <>
        <h1>discover</h1>
        <div className = 'searchDiv'>

<input className = 'searchInput' type="text" placeholder="search..." value={filter} onChange={(e) => {e.preventDefault(); setFilter(e.target.value);
}}
></input>
</div>
        <div className="castings">

      {datas.filter((search) =>
        search.source_name.toLowerCase().includes(filter.toLowerCase())).map((data, index) => {
        return (
          <div className="casting" key={data.id + index}>
              <h4>Date: {data.created}</h4>
            <h4>{data.source_name}</h4>
            <img src = {data.source_image_url}></img>
            <h5>Description: {data.description}</h5>
            <button onClick={handleDelete} value={data.id}>X</button>
          </div>
        )
      })}
     </div>

        </>
    )
}

export default Discover;