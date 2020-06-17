import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {IotlStrings, IotlGlobals, AuthContext} from '../api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';
import {useState} from 'react';
import KasaControl from '../api/kasaKontrol';
import {Header, Slider, Button, Text} from 'react-native-elements';
import {ColorWheel} from '../api/ColorWheel';
//import {ColorWheel} from 'react-native-color-wheel';

const AdjustScreen = props => {
  const {
    signIn,
    signUp,
    signOut,
    updateAuthObjTruth,
    updateUserObjTruth,
    getAppUserObj,
    getAppAuthObj,
  } = React.useContext(AuthContext);
  const [count, setcount] = useState(0);
  const [show, setshow] = useState(0);
  const [userObj, setuserObj] = React.useState(getAppAuthObj('preset screen'));

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authobj ', JSON.stringify(userObj));
    setuserObj({...userObj, isEmailValid: true});
    console.log('----------Settings Exit ----------');
  }, []);

  const update = () => {
    setcount(count => count + 2);
    route.params = {...route.params, asd: count => setcount(count)};
  };

  const tplinkLogin = async (sentLoginUserType, userObj) => {
    const {login} = require('tplink-cloud-api');

    let tplinkUser = '';
    let tplinkPass = '';
    let tplinkUUID = '';
    let tplinkToken = '';
    let tplinkDeviceList;

    // log in to cloud, return a connected tplink object

    tplinkUser = Secrets.demoUserName;
    tplinkPass = Secrets.demoPassword;
    tplinkUUID = Secrets.demoUUID;

    /* const dogetToken = () => {
      let _tplinkToken = tplink.getToken();
      console.log('current auth token is', _tplinkToken);
    }; */

    const tplink = await login(tplinkUser, tplinkPass, tplinkUUID);
    setshow(true);
    // const colour = await tplink.getLB130('kasademots').setState(1, 90, 150, 80);

    /* .catch(e => {
      console.log('error', e);
      sentAuthObj = {
        ...sentAuthObj,
        userNameError: 'User Credentials Error - TPLINK',
        userPassError: "'User Credentials Error - TPLINK'",
      };
  
      return sentAuthObj;
    }); */
    //console.log('current auth token is', tplink.getToken());
    tplinkToken = tplink.getToken();
    console.log('current auth token is', tplinkToken);

    // get a list of raw json objects (must be invoked before .get* works)
    tplinkDeviceList = await tplink.getDeviceList();
    //console.log('tplinkDeviceList', tplinkDeviceList);

    // find a device by alias:
    let myPlug = tplink.getLB130(tplink.deviceList[0].alias);
    console.log('alias is ', tplink.deviceList[0].alias);
    await myPlug.setState(1, 50, 85, 85);

    // or find by deviceId:
    // let myPlug = tplink.getHS100("558185B7EC793602FB8802A0F002BA80CB96F401");
    // console.log('myPlug:', myPlug);

    // let response = await myPlug.powerOn();
    // console.log('kasauth myplugpower response =' + JSON.stringify(response)); */

    console.log('tplink return from  kasa imported library >>>>>>', tplink);
    setuserObj({
      tplink: tplink,
      dl: tplinkDeviceList,
      token: tplinkToken,
      //MYPLUG: myPlug,
    });
    return tplink;

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
  };

  return (
    <ImageBackground
      source={require('../assets/images/light_dc.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Header
          statusBarProps={{barStyle: 'default'}}
          containerStyle={{
            backgroundColor: 'transparent',

            height: 40,
            padding: 0,
            margin: 0,

            borderBottomWidth: 0,
          }}
          leftComponent={{icon: 'menu', color: '#F68F00'}}
          centerComponent={{text: 'MY TITLE', style: {color: '#F68F00'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={{flex: 1}}>
          {/*           <ColorWheel
            initialColor="#ee0000"
            onColorChange={color => console.log({color})}
            onColorChangeComplete={color => onChange(color)}
            style={{width: Dimensions.get('window').width}}
            thumbStyle={{height: 30, width: 30, borderRadius: 30}}
          /> */}
          {/*   <ColorWheel
            initialColor="#00ee00"
            style={{marginLeft: 20, padding: 40, height: 200, width: 200}}
          /> */}
        </View>
      </View>
      <View style={{flex: 1}}>
        <ColorWheel
          initialColor="#ee0000"
          onColorChange={color => console.log({color})}
          style={{width: Dimensions.get('window').width}}
          thumbStyle={{height: 150, width: 150, borderRadius: 60}}
        />
        <ColorWheel
          initialColor="#000000"
          style={{marginLeft: 20, padding: 40, height: 200, width: 200}}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    marginTop: 150,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginBottom: 20,
    backgroundColor: 'black',
  },
});
export default AdjustScreen;
