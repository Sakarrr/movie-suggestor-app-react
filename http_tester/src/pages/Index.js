import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  const [movies, setMovies] = useState([]);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
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
        "https://api.dynoacademy.com/test-api/v1/movies"
      );

      setMovies(response.data.moviesData);
      setIsError(false);
    } catch (err) {
      setIsError("Cannot fetch data!");
    }
  };

  return (
    <>
      Suggested Movies
      <br />
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
      <div style={{ background: "#e7e7e7", margin: "10px" }}>
        {/* eslint-disable-next-line */}
        {movies.map((el) => (
          <div key={el.id}>
            <Link to={`/view_movie/${el.id}`}>
              <span style={{ fontWeight: "bold" }}>{el.name}</span>
            </Link>
            <br />
            <img src={el.image} alt={el.name} style={{ height: "100px" }}></img>
            <br />
            {el.info}
            <br />
            Rating: {el.rating || "Not Rated"}
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
