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
  const history = useHistory();
  const [isauthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  
  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      }
      catch(e) {
        if (e !== 'No current user') {
          onError(e);
        }
      }
  
      setIsAuthenticating(false);
    }
    
    function loadFacebookSDK() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId            : config.social.FB,
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v3.1'
        });
      };
    
      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    }  
    loadFacebookSDK();
    onLoad();
  }, []);


  async function handleLogout(){
    await Auth.signOut();
    
    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    !isauthenticating &&
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
  );
}


export default App;