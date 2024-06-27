import axios from "axios";
import { useEffect, useState } from "react";
import MovieNavBar from "../components/MovieNavbar";
import SingleMovie from "../components/SingleMovie";
import { Container, Form, Row, Spinner } from "react-bootstrap";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstRun) {
      // Searching code
      const fetchTimer = setTimeout(() => {
        if (searchMovieText && searchMovieText.length > 2) {
          fetchMovies();
        } else if (searchMovieText < 1) {
          fetchMovies();
        } else {
          setSearchErrorText(
            "Please error atleast 3 characters for search to run"
          );
        }
      }, 1000);

      // Clean up function
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchMovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    setSearchErrorText("");
    // Fetch resource
    setIsError(false);
    // const response = axios.get(
    //   "https://api.dynoacademy.com/test-api/v1/movies"
    // );

    // console.log(response);

    //   const promise = new Promise((resolve, reject) => {
    //     const response = axios.get(
    //       "https://api.dynoacademy.com/test-api/v1/movies"
    //     );

    //     resolve(response);
    //   });

    //   promise
    //     .then((result) => {
    //       console.log(result);
    //     })
    //     .catch((error) => {});

    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchMovieText}`
      );

      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (errors) {
      console.log(errors);
      setIsError("Error");
      setLoading(false);
      setFirstRun(false);
    }
  };

  return (
    <>
      <MovieNavBar />
      <Container className="my-4">
        <div>
          <Form.Group className="my-3">
            <Form.Control
              type="text"
              value={searchMovieText}
              placeholder="Type movie title"
              onChange={(e) => {
                e.preventDefault();
                setSearchMovieText(e.target.value);
              }}
              autoComplete={false}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <span>{searchErrorText}</span>
        </div>
        <div></div>
        {isError && (
          <>
            <div
              style={{
                background: "red",
                color: "#fff",
                padding: "10px",
                margin: "5px",
              }}
            >
              {isError}
            </div>
          </>
        )}
        <div>
          {loading && (
            <div className="text-center mt-10">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {/* eslint-disable-next-line */}
          {!loading && movies < 1 ? (
            <>No movies found</>
          ) : (
            <>
              <Row>
                {movies.map((el) => (
                  <SingleMovie data={el} />
                ))}
              </Row>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default Index;
