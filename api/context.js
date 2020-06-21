import React from 'react';

export const AuthContext = React.createContext();
export const AlertMessage = React.createContext({
  title: 'None',
  mesage: 'None',
  showAlert: true,
});

export const iotlContext = React.createContext();

export const IotlGlobals = React.createContext({
  in1IotlGlobals: false,
  in2IotlGlobals: null,
  in3IotlGlobals: null,
  testFunc: value => !value,
});
export let IotlStrings = React.createContext({
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
  noDevices: 'Bulb powered?',
  greenDevices: 'Colour Adjustment',
  noDevicesL: 'No Bulb',
  greenDevicesL: 'Connected',
  noDevicesB: 'Check For Bulb  ',
  greenDevicesB: 'Update',
  plug_Offline: 'Plug_Offline',
  plug_OfflineM: 'Offline - Turn light switch on ',
  plug_OfflineT: 'No Bulb Found',
  plug_Online: 'Plug_Online',
  plug_OnlineT: 'Bulb Found!',
  plug_OnlineM: 'Online! - Settings updated ',
  is_loading: 'Kasa_loading',
  is_loadingT: 'Connecting to Kasa',
  is_loadingM: 'Hamster Wheel Running',
  is_LoggedIn: 'Kasa_LoggedIn',
  is_LoggedInT: 'Connected to Kasa',
  is_LoggedInM: 'Checking status',
  is_updating: 'is_updating',
  is_updatingT: 'Connecting to Kasa',
  is_updatingM: 'Getting latest bulb settings',
  is_sendingM: 'Getting latest bulb settings',
});
export let Colours = React.createContext({
  myBlack: '#050F14',
  myWhite: '#DBE2E5',
  myYellow: '#F68F00',
  myDrkBlue: '#154159',
  myLgtBlue: '#1A516A',
  myGreenConf: '#16F049',
  myRedConf: '#FF221F',
});
export let MyErrors = React.createContext({
  usernameDefaultError: 'Please enter a Username',
  userPassDefaultError: 'Please enter a Password',
  tpLinkUserError: 'Please check your Tp-Link Login details ',
  noBulbKasaT: 'No Bulb Found',
  noBulbKasa: 'Please add a bulb to your Kasa Account ',
  alertUpdatingM: 'Getting latest Settings',
  alertUpdatingT: 'Updating',
  alertDeviceOffline: 'Device is Offline',
  alertDeviceOfflineT: 'Device Error',
});

myErrors = {
  usernameDefaultError: 'Please enter a Username',
  userPassDefaultError: 'Please enter a Password',
  tpLinkUserError: 'Please check your Tp-Link Login details ',
  noBulbKasaT: 'No Bulb Found',
  noBulbKasa: 'Please add a bulb to your Kasa Account ',
  alertUpdatingM: 'Getting latest Settings',
  alertUpdatingT: 'Updating',
  alertDeviceOffline: 'Device is Offline',
  alertDeviceOfflineT: 'Device Error',
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
  noDevices: 'Bulb powered?',
  greenDevices: 'Colour Adjustment',
  noDevicesL: 'No Bulb',
  greenDevicesL: 'Connected',
  noDevicesB: 'Check For Bulb  ',
  greenDevicesB: 'Update',
  plug_Offline: 'Plug_Offline',
  plug_OfflineM: 'Offline - Turn light switch on ',
  plug_OfflineT: 'No Bulb Found',
  plug_Online: 'Plug_Online',
  plug_OnlineT: 'Bulb Found!',
  plug_OnlineM: 'Online! - Settings updated ',
  is_loading: 'Kasa_loading',
  is_loadingT: 'Connecting to Kasa',
  is_loadingM: 'Hamster Wheel Running',
  is_LoggedIn: 'Kasa_LoggedIn',
  is_LoggedInT: 'Connected to Kasa',
  is_LoggedInM: 'Checking status',
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
