import axios from "axios";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    // Fetch resource

    console.log("Calling API");
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
        "https://api.dynoacademy.com/test-api/v2/movies"
      );

      console.log(response);
      setMovies(response.data.moviesData);
    } catch (err) {
      alert("Cannot fetch data!");
    }
    console.log(movies);

    console.log("Finish");
  };

  return (
    <>
      <button onClick={fetchMovies}>Get all movies</button>
      <br />

      <div style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}>
        {/* eslint-disable-next-line */}
        {movies.map((el) => (
          <div key={el.id}>{el.name}</div>
        ))}
      </div>
    </>
  );
}

export default App;
