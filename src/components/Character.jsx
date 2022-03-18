import { useState } from "react";
import axios from "axios";

const Character = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.character.name);
  const [actor, setActor] = useState(props.character.actor);
  const [description, setDescription] = useState(props.character.description);
  const [photoUrl, setPhotoUrl] = useState(props.character.photo_url);

  const totalVotes = props.character.votes
    .map((vote) => (vote.like ? 1 : -1))
    .reduce((x, y) => x + y, 0);

  const handleUpdate = () => {
    axios
      .put(
        "https://bookcast-server.herokuapp.com/api/characters/" +
          props.character.id +
          "/",
        {
          casting: props.character.casting,
          name,
          actor,
          description,
          photo_url: photoUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => {
        props.getCasting();
      })
      .catch((err) => props.errorData.setError(err));
  };

  const handleDelete = () => {
    axios
      .delete(
        "https://bookcast-server.herokuapp.com/api/characters/" +
          props.character.id +
          "/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => {
        props.getCasting();
      })
      .catch((err) => props.errorData.setError(err));
  };

  return (
    <div>
      <h1>{props.character.name}</h1>
      <img
        src={props.character.photo_url}
        alt={props.character.actor + "-photo"}
      />
      <h3>Played by {props.character.actor}</h3>
      <h4>Description: {props.character.description}</h4>
      <h3>Votes: {totalVotes}</h3>
      <h3>Comments:</h3>
      {props.character.comments.map((comment) => (
        <div key={props.character.id + "-char-comment-" + comment.id}>
          {comment.user.username}: {comment.comment}
        </div>
      ))}
      <input placeholder="...share a comment"></input>
      <input type="checkbox" name="like" id="like" />
      <br />
      {props.isCreator && (
        <button onClick={() => setEdit(!edit)}>
          {!edit ? "Edit Character Info" : "Cancel"}
        </button>
      )}
      {edit && (
        <div>
          <label htmlFor={"edit-character-name-" + props.character.id}>
            Name
          </label>
          <input
            type="text"
            id={"edit-character-name-" + props.character.id}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor={"edit-character-actor-" + props.character.id}>
            Actor
          </label>
          <input
            type="text"
            id={"edit-character-actor-" + props.character.id}
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />

          <label htmlFor={"edit-character-description-" + props.character.id}>
            Description
          </label>
          <textarea
            id={"edit-character-description-" + props.character.id}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor={"edit-character-image-url-" + props.character.id}>
            Image URL
          </label>
          <input
            type="text"
            id={"edit-character-image-url-" + props.character.id}
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Character Info</button>
        </div>
      )}
      <br />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Character;
