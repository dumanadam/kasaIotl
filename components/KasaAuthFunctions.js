import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, CheckBox, Input} from 'react-native-elements';
import {Secrrets} from '../api/Secrets';
import {IotlStrings, Colours, AuthContext, Errors} from '../api/context';

async function tplinkLoginFunc(userType, userObj) {
  const {signIn, updateAuthObj, asyncAuthObj} = React.useContext(AuthContext);

  let tplinkUser = '';
  let tplinkPass = '';
  let tplinkUUID = '';
  let tplinkToken = '';
  let tplinkDeviceList;

  // log in to cloud, return a connected tplink object
  if (userType == 'demoUser') {
    tplinkUser = Secrets.demoUserName;
    tplinkPass = Secrets.demoPassword;
    tplinkUUID = Secrets.demoUUID;
  }
  const tplink = await login(tplinkUser, tplinkPass, tplinkUUID).catch(e => {
    console.log('error', e);
    userObj = {...userObj, errorMessage: 'User Credentials Error - TPLINK'};
    return;
  });
  //console.log('current auth token is', tplink.getToken());
  tplinkToken = tplink.getToken();
  console.log('current auth token is', tplinkToken);

  // get a list of raw json objects (must be invoked before .get* works)
  tplinkDeviceList = await tplink.getDeviceList();
  console.log('tplinkDeviceList', tplinkDeviceList);
  console.log('success');
  userObj = {
    ...userObj,
    userAuth: {
      ...userObj.userAuth,
      authName: tplinkUser,
      authPass: tplinkPass,
      authToken: tplinkToken,
      authUUID: tplinkUUID,
      authDeviceList: tplinkDeviceList,
      isLoggedIn: true,

      authStyle: 'demo',
      showSplash: false,
    },
  };
  asyncAuthObj();

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
export default tplinkLoginFunc;
