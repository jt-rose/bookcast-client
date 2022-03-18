import { useState } from "react";
import axios from "axios";

const AddCharacter = (props) => {
  const [name, setName] = useState("");
  const [actor, setActor] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleCreate = () => {
    axios
      .post(
        "https://bookcast-server.herokuapp.com/api/characters/",
        {
          name,
          actor,
          description,
          photo_url: photoUrl,
          casting: props.castingId,
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

  return (
    <div>
      <div>
        <label htmlFor="new-character-name">Name</label>
        <input
          type="text"
          id="new-character-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="new-character-actor">Actor</label>
        <input
          type="text"
          id="new-character-actor"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
        />

        <label htmlFor="new-character-description">Description</label>
        <textarea
          id="new-character-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="new-character-image-url">Image URL</label>
        <input
          type="text"
          id="new-character-image-url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button onClick={handleCreate}>Create Character</button>
      </div>
    </div>
  );
};

export default AddCharacter;
