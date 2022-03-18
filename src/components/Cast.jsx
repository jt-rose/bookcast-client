import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Character from "./Character";
import "../styles/cast.css";
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

  useEffect(() => {
    getCasting();
  }, []);

  if (!castDatas) {
    return <p>...loading</p>;
  } else {
    return (
      <>
        <h1>Hi, this is cast id: {params.castid}</h1>
        <div className="mediadiv">
          <div className="castinfo">
            <h2 className="title">{castDatas.source_name}</h2>
            <img src={castDatas.source_image_url}></img>
            <h5>Description: {castDatas.description}</h5>
            <br />
            {isCreator && (
              <button onClick={() => setEdit(!edit)}>
                {!edit ? "Edit Casting Info" : "Cancel"}
              </button>
            )}
            {edit && (
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="name">Description</label>
                <textarea
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
                <button onClick={handleUpdate}>Update Casting Info</button>
              </div>
            )}
            <img src={castDatas.source_image_url}></img>
            <br />
            <FaHeart /> <FaHeartBroken />
            <h5>
              <span>Description:</span> {castDatas.description}
            </h5>
          </div>
          <br />
          <input placeholder="...share a comment"></input>
          <input type="checkbox" name="like" id="like" />
          <h5>Casting Vote: {castingVotes}</h5>
          <h5>Casting Comments:</h5>
          {castDatas &&
            castDatas.comments.map((comment) => (
              <p key={"comment-" + comment.id}>
                {comment.user.username}: {comment.comment}
              </p>
            ))}
        </div>
        <div className="characterdiv">
          {castDatas &&
            castDatas.characters.map((char) => (
              <Character
                key={"char" + char.id}
                character={char}
                tokenData={props.tokenData}
                getCasting={getCasting}
                errorData={props.errorData}
                isCreator={isCreator}
              />
            ))}
          {isCreator && (
            <AddCharacter
              tokenData={props.tokenData}
              errorData={props.errorData}
              getCasting={getCasting}
              castingId={castDatas.id}
            />
          )}
        </div>

        {!willDelete && (
          <button onClick={() => setWillDelete(true)}>Delete Casting</button>
        )}
        {willDelete && (
          <>
            <p>
              Are you sure you want to delete this casting? It will be gone for
              good!
            </p>
            <button onClick={handleDelete}>Yes, delete</button>
            <button onClick={() => setWillDelete(false)}>no thanks</button>
          </>
        )}
      </>
    );
  }
};
export default Cast;
