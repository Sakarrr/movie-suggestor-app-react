import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SingleMovie = (props) => {
  return (
    <>
      <Col>
        <Card
          style={{ width: "19rem", minHeight: "780px" }}
          key={props.data.id}
        >
          <Card.Img variant="top" src={props.data.image} />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text style={{ minHeight: "200px" }}>
              {props.data.info}
            </Card.Text>
            <Card.Text>Rating: {props.data.rating || "Not Rated"}</Card.Text>
            <Link to={`/view_movie/${props.data.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleMovie;
