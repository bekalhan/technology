import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header/header';
import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import ProductListPage from "./containers/ProductListPage";
import ProductDetailsPage from "./containers/ProductDetailsPage/index";
import { isUserLoggedIn, updateCart } from "./actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login  from "./containers/Login";
import SignUp from "./containers/SignUp";
import CartPage from './containers/CartPage/index';
import CheckoutPage from "./containers/CheckoutPage";




function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  },[auth.authenticate]);


  return (
    <Router>
      <Layout />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={CartPage}/>
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
        <Route exact path="/:slug" component={ProductListPage} />

      </Switch>
    </Router>
  );
}

export default App;
