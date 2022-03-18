import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Casting from "./Casting";

const Cast = (props) => {
  const params = useParams();
  const [castDatas, setCastDatas] = useState([])
  const [characters, setCharacters] = useState([])
  const [users, setUsers] = useState([])
  const [votes, setVotes] = useState([])


  
  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => 
      setCastDatas(response.data));
  }, []);
  
  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => 
      setCharacters(response.data.characters[0]));
  }, []);
  
  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => 
      setUsers(response.data.creator));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => 
      setVotes(response.data.characters[0].votes_and_comments[0]));
  }, []);
  

  return (
    <>
    
  <h1>Hi, this is cast id: {params.castid}</h1>
  <h2>{castDatas.source_name}</h2>
  <img src = {castDatas.source_image_url}></img>
  <h5>Description: {castDatas.description}</h5>
  <h5>Actor: {characters.actor}</h5>
  <h5>Role Name: {characters.name}</h5>
  <h5>ID: {users.username}</h5>
  <h5>Comments: {votes.comment}</h5>
  {/* <button onClick={handleDelete} value={castDatas.id}>X</button> */}
    </>
  )
};

export default Cast;
