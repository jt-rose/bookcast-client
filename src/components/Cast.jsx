import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Cast = (props) => {
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        "https://bookcast-server.herokuapp.com/api/castings/" + params.castid
      )
      .then((response) => console.log(response));
  }, []);
  return <h1>Hi, this is cast id: {params.castid}</h1>;
};

export default Cast;
