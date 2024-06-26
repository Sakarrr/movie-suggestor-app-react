import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",
        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setUserData(response.data.data);
    } catch (err) {
      if (err.response) alert(err.response.data.errors[0].message);
      else alert("Unknown error occured!");
    }
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("accessToken");
    history.replace("/");
  };
  return (
    <>
      <Link to="/">Home</Link>
      {userData.name}
      <br />
      {userData.email}
      <br />
      {userData.country}
      <br />
      <button onClick={onLogoutHandler}>Logout</button>
    </>
  );
};
export default Profile;
