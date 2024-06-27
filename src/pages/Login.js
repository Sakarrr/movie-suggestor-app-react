import axios from "axios";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MovieNavBar from "../components/MovieNavbar";
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const [modalState, setModalState] = useState(false);

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
      if (response.data.status === "success") {
        setModalState(`Logged In Successfully. Redirecting....`);
        const getAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", getAccessToken);
        setTimeout(() => {
          history.replace("/");
        }, 2000);
      }
    } catch (err) {
      if (err.response) setModalState(err.response.data.errors[0].message);
      else setModalState(true);
    }
  };
  return (
    <>
      <MovieNavBar />
      <Container className="mt-3">
        <h2 className="mb-3">Login Screen</h2>
        <form onSubmit={onLoginHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={email}
              autoComplete={false}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              ref={password}
              autoComplete={false}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>

      <Modal
        show={modalState}
        onHide={() => {
          setModalState(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">{modalState}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setModalState(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
