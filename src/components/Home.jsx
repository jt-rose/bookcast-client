import React, { useState, useEffect } from "react";

import axios from "axios";
import Footer from '../components/Footer'
import { useNavigate } from "react-router";
// import "../styles/Datas.css";
import "../styles/jihee.css";

const Home = (props) => {
  let [castings, setCastings] = useState([]);

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

  useEffect(() => {
    getCastings();
  }, []);

  return (
    <>
      <div className="home-title">
        <h1>Book Cast</h1>
        <p>Cast your favorite stories</p>
      </div>
      <div></div>
      <div className="border">
        <div className="home-imgs">
          {castings.map((casting, index) => {
            return (
              <img
                src={casting.source_image_url}
                onClick={() => navigate("/cast/" + casting.id)}
              ></img>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;