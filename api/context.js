import React from 'react';

export let IotlGlobals = React.createContext();
export let IotlStrings = React.createContext();
export const AuthContext = React.createContext();

IotlGlobals = {
  authToken: false,
  authUserName: null,
  authPassword: null,
};

IotlStrings = {
  loginTextButton: 'Login',
  loginTitle: 'NIT3002',
  createAccountButton: 'Create    account',
  lanControlButton: 'Lan control',
  resetPWButton: 'Reset Password',
};
