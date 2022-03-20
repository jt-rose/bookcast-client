import React, { useState, useEffect } from "react";
import Edit from "./Edit";
import axios from "axios";
import Add from "./Add";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Datas.css";

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
  <div className="addForm">
      {props.userData.user && <Add handleCreate={handleCreate} />}
      </div>
    </>
  );
};

export default Casting;
