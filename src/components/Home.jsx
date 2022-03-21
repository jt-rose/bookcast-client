import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import axios from "axios";
import Add from "./Add";
// import "../styles/Datas.css";
import "../styles/jihee.css";

// Home and Castings are currently the same - update later

const Home = (props) => {
  let [castings, setCastings] = useState([]);



  const getCastings = () => {
    axios
      .get("https://bookcast-server.herokuapp.com/api/castings/")
      .then(
        (response) => setCastings(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };

  const handleCreate = (addCasting) => {
    axios
      .post("https://bookcast-server.herokuapp.com/api/castings/", addCasting, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + props.tokenData.token,
        },
      })
      .then((response) => {
        console.log(response);
        getCastings();
      });
  };
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
       <div className="home-title">
        <h1>Book Cast</h1>
        <p>Cast your favorite stories</p>
        </div>
        <div>
          
        </div>
      <div className="border">
      <div className="home-imgs">

        {castings.map((casting, index) => {
          return ( 
            <img src={casting.source_image_url}></img>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Home;
