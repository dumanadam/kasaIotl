import React from 'react';

let Secrets = React.createContext();
export const testContext = React.createContext();

Secrets = {
  authObjKey: 'a4',
  userObjKey: 'u4',

  customUUID: '',
  customUserName: '',
  customUserPass: '',
  customToken: '',
  customDeviceList: {},

  demoUUID: '', // enter a UUID V4
  demoUserName: '', // enter a username for the demo account
  demoPassword: '', //enter a password for the demo account
  demoToken: '',
  demoDeviceList: {},

  authObj: {
    authName: '',
    authPass: '',
    authToken: '',
    authUUID: '',
    authDeviceList: {},
    isLoggedIn: false,
    keyError: false,
    isLoading: false,
    authStyle: 'demo',
    saveAuthObj: false,
  },
};

export default Secrets;
