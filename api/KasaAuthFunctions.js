import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import KasaControl from '../api/KasaControl';

const storeAsyncData = async (key, value) => {
  console.log(`store async key= ${key} `);
  if (value == '') {
    console.log('Sent key emopty for store rejected');
    return;
  }
  try {
    const asuncConfirm = await AsyncStorage.setItem(key, JSON.stringify(value));
    if (asuncConfirm != null) console.log('asunconfirm', asuncConfirm);
    console.log('Async Storage Value >>>', value);
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
        authDeviceList: [],
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
  let returnKasaLogin = {};
  console.log('LOGGING IN VIA KASAAUTHFUNCTION', sentAuthObj);
  const kasa = new KasaControl();
  try {
    const mylogin = await kasa.login(
      sentAuthObj.authName,
      sentAuthObj.authPass,
    );
    console.log('latest kasa from KASAAUTHFUNCTION', JSON.stringify(kasa));

    returnKasaLogin = {
      kasaObj: kasa,
      errorMessage: '',
      errorTitle: '',
    };
    return returnKasaLogin;
  } catch (error) {
    console.log('error+++++', error);
    returnKasaLogin.errorMessage = JSON.stringify(error);
    return returnKasaLogin;
  }
}

export {storeAsyncData, getAsyncData, tplinkLogin};
