import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Character from "./Character";

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

  useEffect(() => {
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
  }, []);

  if (!castDatas) {
    return <p>...loading</p>;
  } else {
    return (
      <>
        <h1>Hi, this is cast id: {params.castid}</h1>
        <h2>{castDatas.source_name}</h2>

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
        <br />
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
