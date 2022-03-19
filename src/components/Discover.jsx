import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/Datas.css";
import Add from "./Add";

const convertLikeToInt = (likeObject) => {
  switch (likeObject.like) {
    case true:
      return 1;
    case null:
      return 0;
    case false:
      return -1;
    default:
      return 0;
  }
};

const Discover = (props) => {
  let [discovers, setDiscovers] = useState([]);
  let [filter, setFilter] = useState("");

  let sortedCastings = discovers;
  sortedCastings
    .sort(
      (a, b) =>
        a.votes.reduce((a, b) => a + convertLikeToInt(b), 0) -
        b.votes.reduce((a, b) => a + convertLikeToInt(b), 0)
    )
    .reverse();
  console.log(sortedCastings);

  const getDiscovers = () => {
    axios
      .get("https://bookcast-server.herokuapp.com/api/castings/")
      .then(
        (response) => setDiscovers(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
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
        getDiscovers();
      });
  };

  useEffect(() => {
    getDiscovers();
  }, []);

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
      <div className="searchDiv">
        <input
          className="searchInput"
          type="text"
          placeholder="search..."
          value={filter}
          onChange={(e) => {
            e.preventDefault();
            setFilter(e.target.value);
          }}
        ></input>
      </div>
      <div className="castings">
        {discovers
          .filter((search) =>
            search.source_name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((discover, index) => {
            return (
              <div className="casting" key={`${discover.created}-${index}`}>
                <h4>Date: {discover.created}</h4>
                <h4>{discover.source_name}</h4>
                <img src={discover.source_image_url}></img>
                <h5>Description: {discover.description}</h5>
                <button onClick={handleDelete} value={discover.id}>
                  X
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};


export default Discover;


