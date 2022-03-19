import "../styles/character.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
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

  let pastVoteId = null;
  let pastVoteLike = null;
  if (props.userData && props.userData.user) {
    const priorVote = props.character.votes.find(
      (vote) => vote.user.id === props.userData.user.id
    );
    if (priorVote) {
      pastVoteId = priorVote.id;
      pastVoteLike = priorVote.like;
    }
  }

  const handleNewVote = (like) => {
    axios
      .post(
        "https://bookcast-server.herokuapp.com/api/charactervotes/",
        {
          like,
          character: props.character.id,
          user: props.userData.user,
          user_id: props.userData.user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => props.getCasting())
      .catch((err) => props.errorData.setError(err));
  };
  const handleVoteUpdate = (like) => {
    axios
      .put(
        "https://bookcast-server.herokuapp.com/api/charactervotes/" +
          pastVoteId +
          "/",
        {
          like,
          character: props.character.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => props.getCasting())
      .catch((err) => props.errorData.setError(err));
  };

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
    <div className="charactercard">
      <img
        src={props.character.photo_url}
        alt={props.character.actor + "-photo"}
      />
      <h1>{props.character.name}</h1>
      <h3>
        Played by <span>{props.character.actor}</span>
      </h3>
      <br />
      <h4>
        <span>Description: </span>
        {props.character.description}
      </h4>
      <FaHeart
        style={{ color: pastVoteLike ? "red" : "gray" }}
        onClick={
          pastVoteId ? () => handleVoteUpdate(true) : () => handleNewVote(true)
        }
      />{" "}
      <FaHeartBroken
        style={{ color: pastVoteLike === false ? "blue" : "gray" }}
        onClick={
          pastVoteId
            ? () => handleVoteUpdate(false)
            : () => handleNewVote(false)
        }
      />
      <h3>Votes: {totalVotes}</h3>
      <div className="comments">
        <h3>Comments:</h3>

        {props.character.comments.map((comment) => (
          <div
            key={props.character.id + "-char-comment-" + comment.id}
            className="comment"
          >
            <span>{comment.user.username}:</span> {comment.comment}
          </div>
        ))}
        <input className="forms" placeholder="...share a comment"></input>
      </div>
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
