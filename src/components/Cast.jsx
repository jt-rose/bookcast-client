import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Character from "./Character";

const Cast = () => {
  const params = useParams();
  const [castDatas, setCastDatas] = useState(null);
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");

  let castingVotes = 0;
  if (castDatas && castDatas.votes) {
    castingVotes = castDatas.votes
      .map((vote) => (vote.like ? 1 : -1))
      .reduce((x, y) => x + y, 0);
  }

  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => {
        console.log(response);
        setCastDatas(response.data);
        setName(response.data.source_name);
      });
  }, []);

  if (!castDatas) {
    return <p>...loading</p>;
  } else {
    return (
      <>
        <h1>Hi, this is cast id: {params.castid}</h1>
        {!editName && <h2>{castDatas.source_name}</h2>}
        {editName && (
          <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => {}}>Update</button>
          </div>
        )}
        <button onClick={() => setEditName(!editName)}>
          {!editName ? "Edit" : "Cancel"}
        </button>
        <img src={castDatas.source_image_url}></img>
        <h5>Description: {castDatas.description}</h5>
        <input placeholder="...share a comment"></input>
        <input type="checkbox" name="like" id="like" />
        <h5>Casting Vote: {castingVotes}</h5>
        <h5>Casting Comments:</h5>
        {castDatas &&
          castDatas.comments.map((comment) => (
            <p>
              {comment.user.username}: {comment.comment}
            </p>
          ))}
        {castDatas &&
          castDatas.characters.map((char) => <Character character={char} />)}

        {/* <button onClick={handleDelete} value={castDatas.id}>X</button> */}
      </>
    );
  }
};

export default Cast;
