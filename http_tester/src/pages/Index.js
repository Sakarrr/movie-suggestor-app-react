import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Index = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovieText, setSearchMovieText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstRun, setFirstRun] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMovies();
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
      }, 2000);

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
      <div>
        <input
          type="text"
          value={searchMovieText}
          placeholder="Type movie title"
          onChange={(e) => {
            e.preventDefault();
            setSearchMovieText(e.target.value);
          }}
        />
        <span>{searchErrorText}</span>
      </div>
      Suggested Movies
      <br />
      <div>
        <Link to="/add">Add Movie</Link> |{" "}
        {localStorage.getItem("accessToken") ? (
          <>
            <Link to="/profile">Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
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
        {loading && <>Loading</>}
        {/* eslint-disable-next-line */}
        {!loading && movies < 1 ? (
          <>No movies found</>
        ) : (
          <>
            {" "}
            {movies.map((el) => (
              <div key={el.id}>
                <Link to={`/view_movie/${el.id}`}>
                  <span style={{ fontWeight: "bold" }}>{el.name}</span>
                </Link>
                <br />
                <img
                  src={el.image}
                  alt={el.name}
                  style={{ height: "100px" }}
                ></img>
                <br />
                {el.info}
                <br />
                Rating: {el.rating || "Not Rated"}
                <br />
                <br />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Index;
