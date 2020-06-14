import React from 'react';

export let Secrets = React.createContext();
export const testContext = React.createContext();
/* Secrets = {
  authUUID: 'e1776657-d638-4211-9dc9-471820b7c6fb',
  authToken: null,
  authUserName: 'talha.sezgin@live.vu.edu.au',
  authPassword: 'donlar11',
  userDeviceList: null,
}; */

Secrets = {
  customUUID: '561e606e-a6e6-4402-a5f7-2d3e8e7e5e6f',
  customUserName: '',
  customUserPass: '',
  customToken: '',
  customDeviceList: {},

  demoUUID: 'e1776657-d638-4211-9dc9-471820b7c6fb',
  demoUserName: 'kasademo@talha.me',
  demoPassword: 'nit3002ts',
  demoToken: '',
  demoDeviceList: {},

  authDetails: {
    authName: '',
    authPass: '',
    authToken: '',
    authUUID: '',
    authDeviceList: {},
    isLoggedIn: false,
    keyError: false,
    isLoading: false,
    authStyle: 'demo',
  },
};
