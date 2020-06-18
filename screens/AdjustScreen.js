import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {IotlStrings, IotlGlobals, AuthContext, Colours} from '../api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';
import {useState} from 'react';
import KasaControl from '../api/kasaKontrol';
import {Header, Slider, Button, Text} from 'react-native-elements';
import {ColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorsys from 'colorsys';

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
  const [kasaSettings, setKasaSettings] = useState({
    h: 180,
    s: 50,
    v: 50,
    color_temp: 0,
  });
  //tranition 0 - 10000 muilliseconds temp 0 - 7000 h 0 - 360 v 0 - 100
  const [authObj, setAuthObj] = React.useState(getAppAuthObj('from settings'));
  const [userObj, setuserObj] = React.useState({
    backgroundImage: '../assets/images/light.gif',
    showbg: true,
    saveUserObj: false,

    isToKasa: false,

    slidBrightness: 0.5,
    slidSaturation: 0.5,
    slidSaturationT: 50,
    slidBrightnessT: 50,
    hueT: 90,
    hueText: 55,
    hsltoRGB: '',
  });

  React.useEffect(() => {
    console.log('----------Colour ----------');
    console.log('Settings userObj', JSON.stringify(authObj));
    convertHSL();

    console.log('----------Colour Exit ----------');
  }, []);

  const convertHSL = () => {
    var justHsl = {h: kasaSettings.h, s: kasaSettings.s, v: kasaSettings.v};
    var hslConverted = colorsys.hsl2Hex(justHsl);
    setuserObj({...userObj, hsltoRGB: hslConverted});
    console.log(hslConverted);
    console.log(userObj.hsltoRGB);
  };
  const update = () => {
    setcount(count => count + 2);
    route.params = {...route.params, asd: count => setcount(count)};
  };

  const tplinkLogin = async colour => {
    const {login} = require('tplink-cloud-api');

    if (colour.h == undefined) console.log('undefined');
    if (colour.h == 0) console.log('000000');

    let tplinkUser = '';
    let tplinkPass = '';
    let tplinkUUID = '';
    let tplinkToken = '';
    let tplinkDeviceList;

    tplinkUser = Secrets.demoUserName;
    tplinkPass = Secrets.demoPassword;
    tplinkUUID = Secrets.demoUUID;

    // log in to cloud, return a connected tplink object
    const tplink = await new login(tplinkUser, tplinkPass, tplinkUUID);
    tplinkDeviceList = await tplink.getDeviceList();
    console.log('tplinkDeviceList', tplinkDeviceList);
    tplinkToken = tplink.getToken();
    console.log('current auth token is', tplinkToken);
    colour.h = Math.ceil(colour.h);
    colour.s = Math.ceil(colour.s);
    colour.v = Math.ceil(colour.v);

    console.log(JSON.stringify(kasaSettings));

    // if (tplink == null) return console.log('no login');

    let myPlug = tplink.getLB130(tplink.deviceList[0].alias);
    console.log('alias is ', tplink.deviceList[0].alias);
    try {
      let stateresult = await myPlug.setState(
        1,
        kasaSettings.v,
        kasaSettings.h,
        kasaSettings.s,
      );

      console.log('state result', stateresult);
    } catch (error) {
      alert(` Error: Code : ${error.errorCode} \n ${error.response.data.msg} `);
      console.log(error);
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
    //console.log('current auth token is', tplink.getToken());
    if (false) {
    }
    // get a list of raw json objects (must be invoked before .get* works)
    if (false) {
      tplinkDeviceList = await tplink.getDeviceList();
      console.log('tplinkDeviceList', tplinkDeviceList);
    }

    // find a device by alias:

    // or find by deviceId:
    // let myPlug = tplink.getHS100("558185B7EC793602FB8802A0F002BA80CB96F401");
    // console.log('myPlug:', myPlug);

    // let response = await myPlug.powerOn();
    // console.log('kasauth myplugpower response =' + JSON.stringify(response)); */

    // console.log('tplink return from  kasa imported library >>>>>>', tplink);
    /*  setuserObj({
      tplink: tplink,
      dl: tplinkDeviceList,
      token: tplinkToken,
      //MYPLUG: myPlug,
    });
    return tplink; */

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
  const colourChanged = value => {
    console.log(value);
    let slidBC = Math.floor(value.v * 100);
    let slidSC = Math.floor(value.s * 100);
    let cPV = Math.floor(value.h);
    setKasaSettings({...kasaSettings, h: cPV, s: slidSC, v: slidBC});
    setuserObj({
      ...userObj,
      slidSaturationT: slidSC,
      slidBrightnessT: slidBC,
      hueT: cPV,
    });
    console.log(kasaSettings);
  };

  const sliderValueChanged = (slider, value) => {
    if (slider == 'b') {
      let slidBC = Math.floor(value * 100);
      setuserObj({...userObj, slidBrightness: value, slidBrightnessT: slidBC});
    }
    if (slider == 's') {
      let slidSC = Math.floor(value * 100);
      setuserObj({...userObj, slidSaturation: value, slidSaturationT: slidSC});
    }
  };

  const mySlider = () => {
    myslider = <Slider />;
    return myslider;
  };

  const headerSelect = selection => {
    if (selection == 'left') {
      return (
        <View style={{justifyContent: 'flex-start'}}>
          <Text
            style={{
              justifyContent: 'flex-start',
              alignContent: 'flex-start',

              color: authObj.authDeviceList
                ? Colours.myGreenConf
                : Colours.myRedConf,
            }}>
            connected
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'flex-start'}}>
          {
            <Icon
              name={authObj.authDeviceList ? 'lan-connect' : 'lan-disconnect'}
              size={25}
              color={
                authObj.authDeviceList ? Colours.myGreenConf : Colours.myRedConf
              }
            />
          }
        </View>
      );
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={require('../assets/images/light_dc.jpg')}
        style={styles.backgroundImage}>
        <Header
          statusBarProps={{barStyle: 'default'}}
          containerStyle={styles.header}
          centerComponent={{
            text: 'Colour Adjustment',
            style: {color: '#F68F00'},
            icon: 'home',
          }}
          centerContainerStyle={{
            flex: 0,
            marginEnd: 0,
          }}
          rightContainerStyle={{
            flex: 1,
          }}
          rightComponent={() => headerSelect('right')}
          leftComponent={() => headerSelect('left')}
        />
        <View style={styles.mainContainer}>
          <View style={styles.pickerContainer}>
            <ColorPicker
              onColorSelected={color => alert(`Color selected: ${color}`)}
              oldColor="white"
              defaultColor="#c99c9c"
              style={{flex: 1}}
              onColorChange={value => colourChanged(value)}
              sliderComponent={Slider}
            />
          </View>

          <View style={styles.textRowTitles}>
            <Text style={styles.rgbText}>Hue</Text>
            <Text style={styles.rgbText}>Saturation</Text>
            <Text style={styles.rgbText}>Brightness</Text>
          </View>
          <View style={styles.hsvNumRowContainer}>
            <Text style={styles.rgbText}>{JSON.stringify(userObj.hueT)}</Text>
            <Text style={styles.rgbText}>{userObj.slidSaturationT}</Text>
            <Text style={styles.rgbText}>{userObj.slidBrightnessT}</Text>
          </View>
          <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            iconRight
            title="Update"
            buttonStyle={styles.button}
          />
          <View />
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flex: 0,
    height: 40,
    padding: 0,
    margin: 0,

    borderBottomWidth: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginBottom: 0,
    backgroundColor: 'black',
  },
  overlay: {
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  mainContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    paddingBottom: 40,
  },
  wheelContainer: {height: 150, width: 150},
  button: {
    backgroundColor: 'transparent',
    marginBottom: 50,
  },
  hsvNumRowContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',

    flexDirection: 'row',
    flex: 0,
  },
  textRowtitles: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    backgroundColor: 'red',
    flexDirection: 'row',
    flex: 0,
  },
  rgbText: {
    justifyContent: 'center',
    alignContent: 'center',
    color: Colours.myYellow,
    fontSize: 50,
    flex: 1,

    textAlign: 'center',
    textAlignVertical: 'center',

    width: 100,
    textTransform: 'uppercase',
  },
  rgbNum: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    fontSize: 11,
    flex: 0,
    borderWidth: 3,
    borderColor: 'white',
    textAlign: 'center',
    textAlignVertical: 'top',
    paddingTop: 3,
    color: Colours.myWhite,
    width: 100,
  },
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
export default AdjustScreen;
