import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavBar from "../components/MovieNavbar";
import { Card, Container } from "react-bootstrap";

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
      <MovieNavBar />
      <Container>
        <br />
        <div>
          <h1> {movie.name}</h1>
          <Card>
            <Card.Img
              variant="top"
              src={movie.image}
              className="img-thumbnail rounded mx-auto d-block"
              style={{ maxWidth: "300px" }}
            />
            <Card.Body>
              <Card.Text>{movie.desc}</Card.Text>
              <Card.Text>Rating: {movie.rating}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ViewMovie;
