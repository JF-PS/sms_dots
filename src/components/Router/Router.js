import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../Menu/Layout";
import EntityPage from "../../pages/EntityPage";
import EntitiesPage from "../../pages/EntitiesPage";
import FieldPage from "../../pages/FieldPage";
import EntityEditionPage from "../../pages/EntityEditionPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/entities" exact component={EntitiesPage} />
          <Route path="/entities/:id" exact component={EntityPage} />
          <Route path="/fields/:id" exact component={FieldPage} />
          <Route path="/edit/entity/:id" exact component={EntityEditionPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
