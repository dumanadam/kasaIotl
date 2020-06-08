import React from 'react';

export let IotlGlobals = React.createContext();
export let IotlStrings = React.createContext();
export let Colours = React.createContext();
export const AuthContext = React.createContext();

IotlGlobals = {
  authToken: false,
  authUserName: null,
  authPassword: null,
};

IotlStrings = {
  loginTextButton: 'Login',
  loginTitle: 'NIT3002',
  createAccountButton: 'Create account',
  lanControlButton: 'Lan control',
  resetPWButton: 'Forgot Password',
  loginOptionsTextButton: 'Options',
  defaultsButton: 'Reset to defauls',
};

Colours = {
  myBlack: '#050F14',
  myWhite: '#DBE2E5',
  myYellow: '#F68F00',
  myDrkBlue: '#154159',
  myLgtBlue: '#1A516A',
};
