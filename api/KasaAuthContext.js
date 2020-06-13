import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';

const StoreAsyncData = async (key, value) => {
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

const GetAsyncData = async key => {
  console.log('lue???', key);
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`getAsyncData key= ${key} value= ${value}`);
      return JSON.parse(value);
    } else {
      console.log('getAsyncData  key failure');
      return false;
    }
  } catch (e) {
    console.log('key error ', e);
    return 'error';
  }
};

async function tplinkLogin(sentUserObj) {
  let tplinkUser = '';
  let tplinkPass = '';
  let tplinkUUID = '';
  let tplinkToken = '';
  let tplinkDeviceList;

  // log in to cloud, return a connected tplink object
  if (userObj.authObj.authStyle == 'demo') {
    tplinkUser = Secrets.demoUserName;
    tplinkPass = Secrets.demoPassword;
    tplinkUUID = Secrets.demoUUID;
  }
  const tplink = await login(tplinkUser, tplinkPass, tplinkUUID).catch(e => {
    console.log('error', e);
    setUserObj({
      ...userObj,
      userNameError: 'User Credentials Error - TPLINK',
      userPassError: "'User Credentials Error - TPLINK'",
    });

    return;
  });
  //console.log('current auth token is', tplink.getToken());
  tplinkToken = tplink.getToken();
  console.log('current auth token is', tplinkToken);

  // get a list of raw json objects (must be invoked before .get* works)
  tplinkDeviceList = await tplink.getDeviceList();
  console.log('tplinkDeviceList', tplinkDeviceList);
  setUserObj({
    ...userObj,
    authObj: {
      ...userObj.authObj,
      authName: tplinkUser,
      authPass: tplinkPass,
      authToken: tplinkToken,
      authUUID: tplinkUUID,
      authDeviceList: tplinkDeviceList,
      isLoggedIn: true,
    },
  });

  storeAsyncData('userObj', userObj);

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

export {StoreAsyncData, GetAsyncData, tplinkLogin};