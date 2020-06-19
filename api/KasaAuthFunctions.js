import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';
import kasaKontrol from '../api/kasaKontrol';
import KasaControl from '../api/KasaControl';

const storeAsyncData = async (key, value) => {
  console.log(`store async key= ${key} value= ${JSON.stringify(value)}`);
  if (value == '') {
    console.log('Sent key emopty for store rejected');
    return;
  }
  try {
    const asuncConfirm = await AsyncStorage.setItem(key, JSON.stringify(value));
    if (asuncConfirm != null) console.log('asunconfirm', asuncConfirm);
  } catch (e) {
    // saving error
    console.log('async storage error', e);
  }
  return false;
};

const getAsyncData = async key => {
  console.log('lue???', key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(
        `getAsyncData key= ${key} value= ${JSON.stringify(JSON.parse(value))}`,
      );
      return JSON.parse(value);
    } else {
      console.log('getAsyncData  key failure >>', key);
      return {
        authName: '',
        authPass: '',
        authToken: '',
        authUUID: '',
        authDeviceList: {},
        isLoggedIn: false,
        showSplash: false,
        keyError: true,
      };
    }
  } catch (e) {
    console.log('key error ', e);
    return e;
  }
};

async function tplinkLogin(sentAuthObj) {
  const kasa = new KasaControl();
  try {
    const mylogin = await kasa.login('***REMOVED***', '***REMOVED***');
    console.log('mylogin'.JSON.stringify(mylogin));
  } catch (error) {
    console.log('error', JSON.stringify(error));
  }
  console.log('KASA+++++++++++++++++++++++++', kasa);
  myret = {kasa: kasa};

  console.log('sentAuthObj', sentAuthObj);
  /*  sentAuthObj = {
    ...sentAuthObj,
    authObj: {
      ...sentAuthObj.authObj,
      authDeviceList: null,
      isLoggedIn: false,
      keyError: false,
      isLoading: false,
      saveAuthObj: false,
      showAlert: true,
    },
  }; */
  return myret;
}

async function tplinkLoginold(sentAuthObj) {
  const {login} = require('tplink-cloud-api');
  console.log('sentAuthObj+++++++++++++++++++++++++', sentAuthObj);

  try {
    const tplink = await login(
      sentAuthObj.authName,
      sentAuthObj.authPass,
      sentAuthObj.authUUID,
    );
    //console.log('current auth token is', tplink.getToken());
    tplinkToken = tplink.getToken();
    //console.log('current auth token is', tplinkToken);

    // get a list of raw json objects (must be invoked before .get* works)
    tplinkDeviceList = await tplink.getDeviceList();
    //console.log('tplinkDeviceList', tplinkDeviceList);
    console.log('tplinkDeviceList[0].alias', tplinkDeviceList[0].alias);

    // find a device by alias:
    let myPlug = tplink.getLB130(tplinkDeviceList[0].alias);
    console.log('myPlug', myPlug);

    // let deviceState = await myPlug.getRelayState();
    //  console.log('deviceState', deviceState);
    // or find by deviceId:
    // let myPlug = tplink.getHS100("558185B7EC793602FB8802A0F002BA80CB96F401");
    //console.log('myPlug:', myPlug);

    // let response = await myPlug.powerOn();
    // console.log('kasauth myplugpower response =' + JSON.stringify(response)); */

    sentAuthObj = {
      ...sentAuthObj,

      authToken: tplinkToken,
      authDeviceList: tplinkDeviceList,
      authDeviceState: deviceState,
    };

    console.log(
      'sentAuthObj from  tplinkLogin custom function >>>>>>',
      sentAuthObj,
    );

    return sentAuthObj;
  } catch (error) {
    console.log(error);
    sentAuthObj = {
      ...sentAuthObj,
      authDeviceList: null,
      isLoggedIn: false,
      keyError: false,
      isLoading: false,
      saveAuthObj: false,
      showAlert: true,
    };
  }

  /* .catch(e => {
    console.log('error', e);
    sentAuthObj = {
      ...sentAuthObj,
      userNameError: 'User Credentials Error - TPLINK',
      userPassError: "'User Credentials Error - TPLINK'",
    };

    return sentAuthObj;
  }); */

  // find a device by alias:
  //let myPlug = tplink.getHS100('My Smart Plug');
  // or find by deviceId:
  // let myPlug = tplink.getHS100("558185B7EC793602FB8802A0F002BA80CB96F401");
  //console.log('myPlug:', myPlug);

  //let response = await myPlug.powerOn();
  //console.log("response=" + response );

  /*  let response = await myPlug.toggle();
    console.log('response=' + response);

    response = await myPlug.getSysInfo();
    console.log('relay_state=' + response.relay_state);

    console.log(await myPlug.getRelayState()); */
}

export {storeAsyncData, getAsyncData, tplinkLogin, tplinkLoginold};
