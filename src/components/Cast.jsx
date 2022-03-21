import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Character from "./Character";
// import "../styles/cast.css";
import "../styles/jihee.css";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import AddCharacter from "./AddCharacter";

const Cast = (props) => {
  const params = useParams();
  const [castDatas, setCastDatas] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [image_url, setImage_url] = useState("");
  const [description, setDescription] = useState("");
  const [willDelete, setWillDelete] = useState(false);
  const [newComment, setNewComment] = useState("");

  let navigate = useNavigate();

  let castingVotes = 0;
  if (castDatas && castDatas.votes) {
    castingVotes = castDatas.votes
      .map((vote) => (vote.like ? 1 : -1))
      .reduce((x, y) => x + y, 0);
  }

  let isCreator = false;
  if (props.userData.user && castDatas) {
    isCreator = props.userData.user.id === castDatas.creator.id;
  }

  let pastVoteId = null;
  let pastVoteLike = null;
  if (castDatas && props.userData.user) {
    const priorVote = castDatas.votes.find(
      (vote) => vote.user.id === props.userData.user.id
    );
    if (priorVote) {
      pastVoteId = priorVote.id;
      pastVoteLike = priorVote.like;
    }
  }

  const getCasting = () => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => {
        console.log(response);
        setCastDatas(response.data);
        setName(response.data.source_name);
        setImage_url(response.data.source_image_url);
        setDescription(response.data.description);
      });
  };

  const handleNewVote = (like) => {
    axios
      .post(
        "https://bookcast-server.herokuapp.com/api/castingvotes/",
        {
          like,
          casting: castDatas.id,
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
      .then(() => getCasting())
      .catch((err) => props.errorData.setError(err));
  };
  const handleVoteUpdate = (like) => {
    axios
      .put(
        "https://bookcast-server.herokuapp.com/api/castingvotes/" +
          pastVoteId +
          "/",
        {
          like,
          casting: castDatas.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => getCasting())
      .catch((err) => props.errorData.setError(err));
  };

  const handleCreateNewComment = () => {
    axios
      .post(
        "https://bookcast-server.herokuapp.com/api/castingcomments/",
        {
          comment: newComment,
          casting: castDatas.id,
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
      .then(() => getCasting())
      .catch((err) => props.errorData.setError(err));
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(
        "https://bookcast-server.herokuapp.com/api/castingcomments/" +
          commentId +
          "/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => getCasting())
      .catch((err) => props.errorData.setError(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        "https://bookcast-server.herokuapp.com/api/castings/" +
          params.castid +
          "/",
        {
          source_name: name,
          source_image_url: image_url,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then((response) => {
        setCastDatas(response.data);
        setEdit(false);
      })
      .catch((err) => props.errorData.setError(err));
  };

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(
        "https://bookcast-server.herokuapp.com/api/castings/" +
          castDatas.id +
          "/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + props.tokenData.token,
          },
        }
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => props.errorData.setError(err));
  };

  useEffect(() => {
    getCasting();
  }, []);

  if (!castDatas) {
    return <p>...loading</p>;
  } else {
    return (
      <>
        {/* <h1>Hi, this is cast id: {params.castid}</h1> */}
        <div className="mediadiv">
          <div className="castinfo">
            
            <h2 className="title">{castDatas.source_name}</h2>
     
            <img src={castDatas.source_image_url}></img>
            <div className="delete-cast">
      
        
      {isCreator && (
        <button className = "subbtn" onClick={() => setEdit(!edit)}>
          {!edit ? "Edit Casting Info" : "Cancel"}
        </button>
      )}
      {edit && (
        <div className="edit-casting">
          <label htmlFor="name"></label>
          <input
            placeholder="Name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name"></label>
          <textarea
            placeholder="Description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="image-url">Image URL</label>
          <input
            type="text"
            id="image-url"
            value={image_url}
            onChange={(e) => setImage_url(e.target.value)}
          />
          <button className = "subbtn" onClick={handleUpdate}>Update Casting Info</button>
          
        </div>
      )}

{!willDelete && (
    <button className = "subbtn" onClick={() => setWillDelete(true)}>Delete Casting</button>
  )}
  {willDelete && (
    <>
      <p>
        Are you sure you want to delete this casting? It will be gone for
        good!
      </p>
      <button className = "subbtn" onClick={handleDelete}>Yes, delete</button>
      <button className = "subbtn" onClick={() => setWillDelete(false)}>no thanks</button>
    </>
  )}
 </div>

            <p>
            {castDatas.description}
            </p>
          </div>
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
          <h5 className="vote-count">Casting Vote: {castingVotes}</h5>
       
          <div className="casting-comment">
          <label htmlFor="add-new-casting-comment"></label>
          <input
            id="add-new-casting-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="...share a comment"
          />
          <button className = "subbtn" onClick={handleCreateNewComment}>Add</button>
          </div>
          <div className="commented">
          <details>
            <summary>Casting Comments</summary>
          {castDatas &&
            castDatas.comments.map((comment) => (
              <div className="commented">
                <p key={"comment-" + comment.id}>
                  {comment.user.username}: {comment.comment}
                </p>
                {props.userData.user &&
                  comment.user.id === props.userData.user.id && (
                    <button className = "subbtn" onClick={() => handleDeleteComment(comment.id)}>
                      X
                    </button>
                  )}
              </div>
            ))}
              </details>

        </div>
        </div>
        <div className="add-character">
          {isCreator && (
            <AddCharacter
              tokenData={props.tokenData}
              errorData={props.errorData}
              getCasting={getCasting}
              castingId={castDatas.id}
            />
          )}
          </div>
        <div className="characterdiv">
          {castDatas &&
            castDatas.characters.map((char) => (
              <Character
                key={"char" + char.id}
                character={char}
                userData={props.userData}
                tokenData={props.tokenData}
                getCasting={getCasting}
                errorData={props.errorData}
                isCreator={isCreator}
              />
            ))}
            </div>
     
        
      </>
    );
  }
};
export default Cast;
