// import "../styles/character.css";
import "../styles/jihee.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { GrEdit } from "react-icons/gr";
import { BiEraser, BiCommentDetail } from "react-icons/bi";

const Character = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.character.name);
  const [actor, setActor] = useState(props.character.actor);
  const [description, setDescription] = useState(props.character.description);
  const [photoUrl, setPhotoUrl] = useState(props.character.photo_url);
  const [newComment, setNewComment] = useState("");
  const [openComments, setOpenComments] = useState(false);

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

  // confirm length of comment is under 60
  const handleNewCommentUpdate = (event) => {
    if (event.target.value.length <= 60) {
      setNewComment(event.target.value);
    }
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
      .then(() => {
        props.getCasting();
        setOpenComments(true);
        setNewComment("");
      })
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
            style={{ color: pastVoteLike ? "red" : "gray" }}
            onClick={
              pastVoteId
                ? () => handleVoteUpdate(true)
                : () => handleNewVote(true)
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
            <button className="subbtn" onClick={() => setEdit(!edit)}>
              {!edit ? "Edit Character Info" : "Cancel"}
            </button>
          )}
          {props.isCreator && edit && (
            <div className="charactercard-edit-form">
              <label
                htmlFor={"edit-character-name-" + props.character.id}
              ></label>
              <input
                placeholder="Name"
                type="text"
                id={"edit-character-name-" + props.character.id}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label
                htmlFor={"edit-character-actor-" + props.character.id}
              ></label>
              <input
                placeholder="Actor"
                type="text"
                id={"edit-character-actor-" + props.character.id}
                value={actor}
                onChange={(e) => setActor(e.target.value)}
              />

              <label
                htmlFor={"edit-character-description-" + props.character.id}
              ></label>
              <textarea
                rows="4"
                cols="32"
                placeholder="Description"
                id={"edit-character-description-" + props.character.id}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label
                htmlFor={"edit-character-image-url-" + props.character.id}
              ></label>
              <input
                placeholder="Image_url"
                type="text"
                id={"edit-character-image-url-" + props.character.id}
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <button className="subbtn" onClick={handleUpdate}>
                Update Character Info
              </button>
            </div>
          )}

          {props.isCreator && (
            <button className="subbtn" onClick={handleDelete}>
              Delete
            </button>
          )}

          <div className="comments">
            <label
              htmlFor={"add-new-character-comment" + props.character.id}
            ></label>
            <input
              id={"add-new-character-comment" + props.character.id}
              value={newComment}
              onChange={handleNewCommentUpdate}
              placeholder="...share a comment"
            />
            <button className="subbtn" onClick={handleCreateNewComment}>
              Add
            </button>
          </div>
          <div className="overflow">
            <details open={openComments}>
              <summary onClick={() => setOpenComments(!openComments)}>
                Comments {`(${props.character.comments.length})`}
              </summary>
              {props.character.comments.map((comment) => (
                <div
                  className="character-comment"
                  key={props.character.id + "-comment-" + comment.id}
                >
                  <div
                    key={props.character.id + "-char-comment-" + comment.id}
                    className="comment"
                  >
                    <strong>{comment.user.username}:</strong> {comment.comment}
                  </div>
                  {props.userData.user &&
                    comment.user.id === props.userData.user.id && (
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        X
                      </button>
                    )}
                </div>
              ))}
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
