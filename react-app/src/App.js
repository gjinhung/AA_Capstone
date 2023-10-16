import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MainPage from './components/MainPage'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { useNav } from './context/NavigationBar'

function App() {
  const dispatch = useDispatch();
  const { isLoaded, toggleNav } = useNav()
  useEffect(() => {
    dispatch(authenticate()).then(() => toggleNav(true));
  }, [dispatch, toggleNav]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path=''>
            <MainPage />
          </Route>
        </Switch>
      )}
    </>

  );
}

export default App;
