import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";

import Index from "../pages/Index";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact></Route>
        <Route path="/" component={Index} exact></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
