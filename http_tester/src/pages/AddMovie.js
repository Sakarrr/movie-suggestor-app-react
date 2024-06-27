import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavBar from "../components/MovieNavbar";
import { Button, Container, Form } from "react-bootstrap";

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
      <MovieNavBar />
      <Container className="mt-3">
        <h3>Add Movie</h3>
        <form onSubmit={addMovieHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Movie name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Movie Name"
              ref={movie_name_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> Rating:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Rating"
              ref={movie_rating_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              ref={movie_description_reference}
              autoComplete={false}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Movie
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddMovie;
