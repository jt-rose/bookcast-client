import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import axios from "axios";
import Add from "./Add";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/Datas.css";
import "../styles/jihee.css";

const Casting = (props) => {
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
        //getCastings()
        navigate("/cast/" + response.data.id);
      });
  };

  useEffect(() => {
    getCastings();
  }, []);

  return (
    <>
        <div className="page-title">
        <p>CASTING</p>
        </div>
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
      {props.userData.user && <Add handleCreate={handleCreate} />}

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
                <p className="date">{casting.created}</p>
                <h4>{casting.source_name}</h4>
                <img src={casting.source_image_url}></img>
                <p className="desc"> {casting.description}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Casting;
