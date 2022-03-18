import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Character from "./Character";

const Cast = () => {
  const params = useParams();
  const [castDatas, setCastDatas] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => {
        console.log(response);
        setCastDatas(response.data);
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
        {castDatas.characters.map((char) => (
          <Character character={char} />
        ))}

        {/* <button onClick={handleDelete} value={castDatas.id}>X</button> */}
      </>
    );
  }
};

export default Cast;
