import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;

  const [movie, setMovie] = useState({});

  // First time component render
  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  // Everytime each component is updated
  // useEffect(()=>{})

  // Each time dependencies are updated / changed
  // useEffect(() => {
  //   console.log("First time run");
  // }, [movie]);

  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovie(response.data.singleMovieData);
    } catch (err) {
      console.log("Error Occured");
    }
  };

  return (
    <>
      View Movie {getID}
      <button onClick={getSingleMovieInfo}>View this movie details</button>
      <br />
      <br />
      <div>
        <img
          src={movie.image}
          alt={movie.name}
          style={{ height: "100px" }}
        ></img>{" "}
        <br />
        {movie.name}
        <br />
        {movie.desc}
        <br />
        Rating: {movie.rating}
        <br />
      </div>
    </>
  );
};

export default ViewMovie;
