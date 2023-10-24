import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import MainPage from './components/MainPage'
import LoginSignUp from './components/LogInSignUp'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GuidePage from "./components/GuidePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
          <Route path='/slider'>
            <LoginSignUp />
          </Route>
          <Route path='/guide/:id'>
            <GuidePage />
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
