import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavBar from "../components/MovieNavbar";
import { Button, Container, Modal } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [modalState, setModalState] = useState(false);

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
      <MovieNavBar />
      <Container className="mt-4">
        {userData.name}
        <br />
        {userData.email}
        <br />
        {userData.country}
        <br />
        <br />
        <Button
          onClick={() => {
            setModalState(true);
          }}
          variant="danger"
          type="button"
        >
          Logout
        </Button>
      </Container>

      <Modal
        show={modalState}
        onHide={() => {
          setModalState(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to LogOut?</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="text-center">
          <Button variant="danger" onClick={onLogoutHandler}>
            Yes
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setModalState(false);
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Profile;
