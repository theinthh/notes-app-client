import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import "./App.css";
import config from "./config";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLibs";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { onError } from "./libs/errorLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();
  //The function will be called every time
  // the component is rendered
  useEffect(() => {
    //only re-run our function (edit)
    //if the passed in array of variables have changed
    function loadFacebookSDK() {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: config.social.FB,
          cookie: true,
          xfbml: true,
          version: "v7.0",
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    }
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      } catch (e) {
        if (e !== "No current user") {
          onError(e);
        }
      }
    }
    loadFacebookSDK();
    onLoad();

    setIsAuthenticating(false);
  }, [isAuthenticated]);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }
  return (
    !isAuthenticating && (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
