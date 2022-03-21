// import "../styles/character.css";
import "../styles/jihee.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const Character = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.character.name);
  const [actor, setActor] = useState(props.character.actor);
  const [description, setDescription] = useState(props.character.description);
  const [photoUrl, setPhotoUrl] = useState(props.character.photo_url);
  const [newComment, setNewComment] = useState("");

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

  const handleCreateNewComment = () => {
    axios
      .post(
        "https://bookcast-server.herokuapp.com/api/charactercomments/",
        {
          comment: newComment,
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

  const handleDeleteComment = (commentId) => {
    axios
      .delete(
        "https://bookcast-server.herokuapp.com/api/charactercomments/" +
          commentId +
          "/",
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
    <div className="characters">
    <div className="charactercard">
      <img
        src={props.character.photo_url}
        alt={props.character.actor + "-photo"}
      />
  
      <h2>{props.character.name}</h2>
      <h3>
        Played by <span>{props.character.actor}</span>
      </h3>
      <p>
        <span>Description: </span>
        {props.character.description}
      </p>
      <div className="like">
      <FaHeart
        style={{ color: pastVoteLike ? "red" : "gray"}}
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
      
    </div>
    <h5>Votes: {totalVotes}</h5>
    <div className="charactercard-edit">
      {props.isCreator && (
        <button className = "subbtn" onClick={() => setEdit(!edit)}>
          {!edit ? "Edit Character Info" : "Cancel"}
        </button>
      )}
      {edit && (
        <div className="charactercard-edit-form">
          <label htmlFor={"edit-character-name-" + props.character.id}>
          </label>
          <input
            placeholder="Name"
            type="text"
            id={"edit-character-name-" + props.character.id}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor={"edit-character-actor-" + props.character.id}>
          </label>
          <input
            placeholder="Actor"
            type="text"
            id={"edit-character-actor-" + props.character.id}
            value={actor}
            onChange={(e) => setActor(e.target.value)}
          />

          <label htmlFor={"edit-character-description-" + props.character.id}>
          </label>
          <textarea
            rows="4" cols="32"
            placeholder="Description"
            id={"edit-character-description-" + props.character.id}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor={"edit-character-image-url-" + props.character.id}>
          </label>
          <input
            placeholder="Image_url"
            type="text"
            id={"edit-character-image-url-" + props.character.id}
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button className = "subbtn" onClick={handleUpdate}>Update Character Info</button>
          
        </div>
      )}
      <button className = "subbtn" onClick={handleDelete}>Delete</button>

      <div className="comments">
        <label htmlFor={"add-new-character-comment" + props.character.id}>
        </label>
        <input
          id={"add-new-character-comment" + props.character.id}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="...share a comment"
        />
        <button className = "subbtn" onClick={handleCreateNewComment}>Add</button>


      </div>
      <div className="overflow">

      <details>
            <summary>Comments</summary>
        {props.character.comments.map((comment) => (
          <div className="character-comment">
            <div
              key={props.character.id + "-char-comment-" + comment.id}
              className="comment"
            >
              <span>{comment.user.username}:</span> {comment.comment}
            </div>
            {props.userData.user &&
              comment.user.id === props.userData.user.id && (
                <button className = "delete-btn" onClick={() => handleDeleteComment(comment.id)}>
                  X
                </button>
              )}
          </div>
        ))}
          </details>
          </div>

    </div>

      </div>
      {/* <h3>Played by {props.character.actor}</h3>
      <h4>Description: {props.character.description}</h4> */}

    </div>
  );
};

export default Character;