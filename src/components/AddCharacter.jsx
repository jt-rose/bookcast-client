import { useState } from "react";
import axios from "axios";

const AddCharacter = (props) => {
  const [name, setName] = useState("");
  const [actor, setActor] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [add, SetAdd] = useState('');


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
    <div className="add-character">
      <div> 
      <button className = "btn" onClick={() => SetAdd(!add)}>
        {!add ? "Add person for the role" : "Cancel"}
      </button>
      {add && (
        <div>
        <label htmlFor="new-character-name"></label>
        <input
          placeholder="Name"
          type="text"
          id="new-character-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="new-character-actor"></label>
        <input
          placeholder="Actor"
          type="text"
          id="new-character-actor"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
        />

        <label htmlFor="new-character-description"></label>
        <textarea
          rows="4" cols="32"
          placeholder="Description"
          id="new-character-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="new-character-image-url"></label>
        <input
          placeholder="Image_url"
          type="text"
          id="new-character-image-url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <button className = "subbtn" onClick={handleCreate}>Create Character</button>
      </div>
       
    )}
     </div>
     </div>
  );
};

export default AddCharacter;
