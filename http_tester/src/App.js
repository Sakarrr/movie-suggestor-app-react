import axios from "axios";

function App() {
  const fetchMovies = () => {
    // Fetch resource

    console.log("Calling API");
    const response = axios.get(
      "https://api.dynoacademy.com/test-api/v1/movies"
    );

    console.log(response);
  };

  return (
    <>
      <button onClick={fetchMovies}>Get all movies</button>
      <br />

      <div
        style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
      ></div>
    </>
  );
}

export default App;
