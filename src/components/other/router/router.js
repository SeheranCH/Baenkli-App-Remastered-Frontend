import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../pages/homePage/HomePage";
import LoginPage from "../../pages/loginPage/LoginPage";
import CardPage from "../../pages/cardPage/CardPage";
import MapsPage from "../../pages/mapsPage/MapsPage";
import RegisterPage from "../../pages/registerPage/RegisterPage";
import NewBenchPage from "../../pages/newBenchPage/NewBenchPage";
import AccountPage from "../../pages/accountPage/AccountPage";
import FavoritePage from "../../pages/favoritePage/FavoritePage";
import SecureRoute from "../secureRouter/SecureRouter";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/bench/:id" component={CardPage} />
      <SecureRoute exact path="/maps" component={MapsPage} />
      <Route exact path="/signup" component={RegisterPage}/>
      <SecureRoute  exact path="/create" component={NewBenchPage}/>
      <SecureRoute exact path="/account" component={AccountPage} />
      <SecureRoute exact path="/favorites" component={FavoritePage} />
    </Switch>
  );
};
export default Router;