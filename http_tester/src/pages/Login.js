import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        { timeout: 10000 }
      );
      if (response.data.status === "success") alert("Logged In Successfully");
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", getAccessToken);
      history.replace("/");
    } catch (err) {
      if (err.response) alert(err.response.data.errors[0].message);
      else alert("Unknown error occured!");
    }
  };
  return (
    <>
      <Link to="/">Home</Link>
      <form onSubmit={onLoginHandler}>
        Email:
        <input type="text" ref={email} /> <br />
        Password:
        <input type="password" ref={password} /> <br />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
