import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FacebookProvider, LoginButton } from "react-facebook";

export default function FacebookLogin(onLogin) {

  function handleResponse = (data) => {
    console.log(data);
  };

  function handleError = (error) => {
      onError(error);
  };


    return (
      <FacebookProvider appId="890744491404581">
        <LoginButton
          scope="email"
          onCompleted={handleResponse}
          onError={handleError}
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </FacebookProvider>
    );

}
