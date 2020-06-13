import React from 'react';

export let IotlGlobals = React.createContext();
export let IotlStrings = React.createContext();
export let Colours = React.createContext();
export let Errors = React.createContext();
export const AuthContext = React.createContext();

authObj = {
  authToken: false,
  authUserName: null,
  authPassword: null,
};

IotlStrings = {
  loginTextButton: 'Login',
  loginTitle: 'NEF3002',
  createAccountButton: 'Create account',
  lanControlButton: 'Lan control',
  resetPWButton: 'Forgot Password',
  loginOptionsTextButton: 'Options',
  defaultsButton: 'Reset to defauls',
  rememberText: 'Remember Me',
  defmoUserText: 'Use demo user',
  userNamePlaceholder: 'Username',
  userPassPlaceholder: 'Password',
  demoPasswordPlaceholder: 'Demo Password Set',
};

Colours = {
  myBlack: '#050F14',
  myWhite: '#DBE2E5',
  myYellow: '#F68F00',
  myDrkBlue: '#154159',
  myLgtBlue: '#1A516A',
  myGreenConf: '#16F049',
  myRedConf: '#FF221F',
};

Errors = {
  usernameDefaultError: 'Please enter a Username',
  userPassDefaultError: 'Please enter a Password',
};
