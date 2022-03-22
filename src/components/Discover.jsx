import axios from "axios";
import React, { useState, useEffect } from "react";
import "../styles/jihee.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

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

const Discover = () => {
  let [discovers, setDiscovers] = useState([]);
  let [filter, setFilter] = useState("");
  let [sortByMostVotes, setSortByMostVotes] = useState(false);

  let navigate = useNavigate();

  let castings = discovers;
  if (sortByMostVotes) {
    castings.sort(
      (a, b) =>
        b.votes.reduce((a, b) => a + convertLikeToInt(b), 0) -
        a.votes.reduce((a, b) => a + convertLikeToInt(b), 0)
    );
  } else {
    castings.sort((a, b) => new Date(b.created) - new Date(a.created));
  }

  const getDiscovers = () => {
    axios
      .get("https://bookcast-server.herokuapp.com/api/castings/")
      .then(
        (response) => setDiscovers(response.data),
        (err) => console.error(err)
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getDiscovers();
  }, []);

  return (
    <>
      <div className="page-title">
        <p>DISCOVER</p>
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
      <div className="sortbtn">
        <button onClick={() => setSortByMostVotes(!sortByMostVotes)}>
          {!sortByMostVotes ? "Sort By Most Votes" : "Sort by Recent"}
        </button>
      </div>

      <div className="discovers">
        {castings
          .filter((search) =>
            search.source_name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((discover, index) => {
            return (
              <div
                className="discover"
                key={`${discover.created}-${index}`}
                onClick={() => navigate("/cast/" + discover.id)}
              >
                <li className="dis-date">
                  {new Date(discover.created).toLocaleDateString()}
                </li>
                <h4>{discover.source_name}</h4>
                <img src={discover.source_image_url}></img>

                <li className="dis-desc">{discover.description}</li>
              </div>
            );
          })}
      </div>
      <Footer />
    </>
  );
};

export default Discover;
