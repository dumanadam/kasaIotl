import React from 'react';
import {TouchableHighlightBase} from 'react-native';

export let Secrets = React.createContext();

/* Secrets = {
  authUUID: 'e1776657-d638-4211-9dc9-471820b7c6fb',
  authToken: null,
  authUserName: 'talha.sezgin@live.vu.edu.au',
  authPassword: 'donlar11',
  userDeviceList: null,
}; */

Secrets = {
  defaultUsername: 'Username',

  kasaUUID: '561e606e-a6e6-4402-a5f7-2d3e8e7e5e6f',
  kasaUserName: '',
  kasaUserPass: '',
  kasaToken: '',
  kasaDeviceList: {},

  customUserName: null,
  customPassword: null,

  demoUUID: 'e1776657-d638-4211-9dc9-471820b7c6fb',
  demoUserName: 'kasademo@talha.me',
  demoPassword: 'nit3002ts',
  demoToken: null,
  demoDeviceList: null,

  authDetails: {
    userName: '',
    userPass: '',
    userToken: '',
    userUUID: '',
    userDeviceList: '',
    isLoggedIn: false,
    keyError: false,
    isLoading: true,
    authStyle: 'custom',
    showSplash: true,
  },
};
