import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";
import axios from "axios";
import Add from "./Add";
import "../styles/Datas.css";
import "../styles/home.css";

// Home and Castings are currently the same - update later

const Home = (props) => {
  let [castings, setCastings] = useState([]);
  let [filter, setFilter] = useState("");
  let navigate = useNavigate();

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
      <div className="castings">
        {castings
          .filter((search) =>
            search.source_name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((casting, index) => {
            return (
              <div
                className="casting"
                key={casting.id + index}
                onClick={() => {
                  navigate("/cast/" + casting.id);
                }}
              >
                <h4><span>Date:</span> {casting.created}</h4>
                <h1>{casting.source_name}</h1>
                <img src={casting.source_image_url}></img>
                <h5><span>Description:</span> {casting.description}</h5>
              </div>
            )
          })
        } 
      </div>
     </>
  )
}

export default Home;
