import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {IotlStrings, IotlGlobals, AuthContext} from '../api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';

const {login} = require('tplink-cloud-api');
const TPLINK_USER = Secrets.authUserName;
const TPLINK_PASS = Secrets.authPassword;
const TPLINK_TERM = Secrets.authUUID;

const PresetScreen = props => {
  console.log('route', props.route);
  console.log('secret', JSON.stringify(Secrets));

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      // saving error
      console.log('async storgae error', e);
    }
  };

  async function main() {
    // log in to cloud, return a connected tplink object
    const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM).catch(
      e => {
        console.log('error', e);
      },
    );
    //console.log('current auth token is', tplink.getToken());
    console.log('current auth token is', tplink.getToken());
    Secrets.authToken = tplink.getToken();

    // get a list of raw json objects (must be invoked before .get* works)
    const dl = await tplink.getDeviceList();
    console.log(dl);
    Secrets.userDeviceList = dl;

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
  //main();
  return (
    <View>
      <Text>Preset Screen</Text>
    </View>
  );
};

export default PresetScreen;
