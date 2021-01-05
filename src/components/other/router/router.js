import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/homePage/HomePage";
import LoginPage from "../../pages/loginPage/LoginPage";
import CardPage from "../../pages/cardPage/CardPage";
import MapsPage from "../../pages/mapsPage/MapsPage";
import RegisterPage from "../../pages/registerPage/RegisterPage";
import NewBenchPage from "../../pages/newBenchPage/NewBenchPage";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/bench/:id" component={CardPage} />
      <Route exact path="/maps" component={MapsPage} />
      <Route exact path="/signup" component={RegisterPage}/>
      <Route exact path="/create" component={NewBenchPage} />
    </Switch>
  );
};
export default Router;