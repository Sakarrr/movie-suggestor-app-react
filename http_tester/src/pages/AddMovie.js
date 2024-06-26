import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddMovie = () => {
  const history = useHistory();
  const movie_name_reference = useRef();
  const movie_rating_reference = useRef();
  const movie_description_reference = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_reference.current.value,
      rating: movie_rating_reference.current.value,
      description: movie_description_reference.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        { timeout: 10000 }
      );
      alert(response.data.message);
      history.replace("/");
    } catch (err) {
      if (err.response) alert(err.response.data.errors[0].message);
      else alert("Unknown error occured!");
    }
  };
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <br />
      <form onSubmit={addMovieHandler}>
        Movie name:
        <br />
        <input type="text" placeholder="Name" ref={movie_name_reference} />{" "}
        <br />
        <br />
        Rating:
        <br />
        <input
          type="text"
          placeholder="Rating"
          ref={movie_rating_reference}
        />{" "}
        <br />
        <br />
        Description:
        <br />
        <textarea placeholder="Description" ref={movie_description_reference} />
        <br />
        <br />
        <button type="submit">Add a Movie</button>
      </form>
    </>
  );
};

export default AddMovie;
