import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ViewMovie = () => {
  const getParams = useParams();
  const getID = getParams.id;
  return <>View Movie {getID}</>;
};

export default ViewMovie;
