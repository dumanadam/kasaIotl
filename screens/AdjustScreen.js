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
import AwesomeAlert from 'react-native-awesome-alerts';

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
  const [authObj, setAuthObj] = React.useState({
    authName: '',
    authPass: '',
    authToken: '',
    authUUID: '',
    isLoggedIn: false,
    keyError: false,
    isLoading: false,
    authStyle: 'demo',
    saveAuthObj: false,
    showAlert: true,
    kasaObj: {},
    deviceInfo: [],
    authDeviceList: [],
  });
  const [userObj, setuserObj] = React.useState({
    backgroundImage: '../assets/images/light.gif',
    showbg: true,
    saveUserObj: false,
    isToKasa: false,
    errorMessage: '',
    errorTitle: '',
    showAlert: false,
    slidBrightness: 0.5,
    slidSaturation: 0.5,
    slidSaturationT: 50,
    slidBrightnessT: 50,
    hueT: 90,
    hueText: 55,
    hsvtoHEX: '#ffffff',
    hueHex: '#ffffff',
    satHex: '#ffffff',
    briHex: '#ffffff',
    noDevicesKasa: true,
  });

  React.useEffect(() => {
    console.log('----------Colour ----------');
    let latestAuthObj = getAppAuthObj('request by Colour');

    console.log(
      'authObj lightstate >>>>',
      JSON.stringify(latestAuthObj.deviceInfo[0].light_state),
    );
    if (authObj.authDeviceList == null) {
      setAuthObj({...latestAuthObj, showAlert: true, noDevicesKasa: true});
    } else {
      setAuthObj({...latestAuthObj, showAlert: false, noDevicesKasa: false});

      convertHSL();
    }

    console.log('----------Colour Exit ----------');
  }, []);

  React.useEffect(() => {
    //  console.log('authObj devicelist', JSON.stringify(authObj));
  }, [authObj]);

  const convertHSL = () => {
    var justHsl = {h: kasaSettings.h, s: kasaSettings.s, v: kasaSettings.v};
    var hslConverted = colorsys.hsv2Hex(justHsl);

    setuserObj({...userObj, hsvtoHEX: hslConverted});
    console.log(hslConverted);
    console.log(userObj.hsvtoHEX);
  };
  const update = () => {
    setcount(count => count + 2);
    route.params = {...route.params, asd: count => setcount(count)};
  };

  const tplinkLogin = async colour => {
    const {login} = require('tplink-cloud-api');

    if (colour.h == undefined) console.log('undefined');
    if (colour.h == 0) console.log('000000');

    let tplinkToken = '';
    let tplinkDeviceList;

    // log in to cloud, return a connected tplink object
    const tplink = await new login(
      authObj.authName,
      authObj.authPass,
      authobj.authUUID,
    );
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
    let slidBC = Math.floor(value.v * 100);
    let slidSC = Math.floor(value.s * 100);
    let cPV = Math.floor(value.h);
    var hslConverted = colorsys.hsv2Hex({h: cPV, s: slidSC, v: slidBC});
    var hsl2RGB = colorsys.hsv2Rgb({h: cPV, s: slidSC, v: slidBC});

    setKasaSettings({...kasaSettings, h: cPV, s: slidSC, v: slidBC});
    setuserObj({
      ...userObj,
      slidSaturationT: slidSC,
      slidBrightnessT: slidBC,
      hueT: cPV,
      hsvtoHEX: hslConverted,
    });

    console.log('hslConverted', hslConverted);
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

  const showError = () => {
    setuserObj({...userObj, showAlert: !userObj.showAlert});
  };

  const headerSelect = selection => {
    if (selection == 'left') {
      return (
        <View style={{justifyContent: 'flex-start'}}>
          <Text
            style={
              authObj.noDevicesKasa
                ? styles.headerLeftCon
                : styles.headerLeftDis
            }>
            {authObj.noDevicesKasa
              ? IotlStrings.greenDevicesL
              : IotlStrings.noDevicesL}
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          {
            <Icon
              style={
                authObj.noDevicesKasa
                  ? styles.headerRightCon
                  : styles.headerRightDis
              }
              name={authObj.noDevicesKasa ? 'lan-connect' : 'lan-disconnect'}
              disabledStyle={styles.headerLeftDis}
              disabled={true}
              size={25}
              iconStyle={{
                color: Colours.myRedConf,
              }}
              /*      color={
                authObj.noDevicesKasa ? Colours.myGreenConf : Colours.myRedConf
              } */
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
            text: authObj.noDevicesKasa
              ? IotlStrings.greenDevices
              : IotlStrings.noDevices,
            style: authObj.noDevicesKasa
              ? styles.headerTextCon
              : styles.headerTextDis,
            icon: 'home',
          }}
          centerContainerStyle={{
            flex: 0,
            marginStart: 25,
          }}
          rightContainerStyle={{
            flex: 1,
          }}
          leftContainerStyle={{
            flex: 1,
          }}
          rightComponent={() => headerSelect('right')}
          leftComponent={() => headerSelect('left')}
        />

        <View style={styles.mainContainer}>
          <View style={styles.bottomHSBContainer}>
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

            <View style={styles.textRowtitles}>
              <Text style={styles.rgbTextH}>Hue</Text>
              <Text style={styles.rgbTextS}>Saturation</Text>
              <Text style={styles.rgbTextB}>Brightness</Text>
            </View>
            <View style={styles.hsvNumRowContainer}>
              <Text
                style={
                  authObj.noDevicesKasa
                    ? [styles.rgbNumH, {color: userObj.hsvtoHEX}]
                    : styles.rgbNumDis
                }>
                {JSON.stringify(userObj.hueT)}
              </Text>
              <Text
                style={
                  authObj.noDevicesKasa
                    ? [
                        styles.rgbNumS,
                        {
                          color: Colours.myYellow,
                          opacity: kasaSettings.s * 0.01,
                        },
                      ]
                    : styles.rgbNumDis
                }>
                {userObj.slidSaturationT}
              </Text>
              <Text
                style={
                  authObj.noDevicesKasa
                    ? [
                        styles.rgbNumS,
                        {
                          color: Colours.myWhite,
                          opacity: kasaSettings.s * 0.01,
                        },
                      ]
                    : styles.rgbNumDis
                }>
                {userObj.slidBrightnessT}
              </Text>
            </View>
          </View>
          <View style={styles.butContainer}>
            <Button
              icon={
                authObj.noDevicesKasa ? (
                  <Icon name="reload" style={styles.buttonIconCon} />
                ) : (
                  <Icon name="arrow-right" style={styles.buttonIconDis} />
                )
              }
              iconRight
              titleStyle={
                authObj.noDevicesKasa ? styles.butTextCon : styles.butTextDis
              }
              title={
                authObj.noDevicesKasa
                  ? IotlStrings.greenDevicesB
                  : IotlStrings.noDevicesB
              }
              type="outline"
              buttonStyle={
                authObj.noDevicesKasa ? styles.buttonCon : styles.buttonDis
              }
              loading={userObj.isloading}
            />
          </View>
          <View />
          <AwesomeAlert
            show={userObj.showAlert}
            title={userObj.errorTitle}
            message={userObj.errorMessage}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#F68F00"
            onConfirmPressed={() => {
              showError();
            }}
          />
          {/*         <Text
            style={authObj.noDevicesKasa ? styles.rgbNumB : styles.rgbNumB}>
            {kasaSettings.s}
          </Text> */}
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
    paddingBottom: 85,
  },
  alertCont: {
    zIndex: 100,
  },
  wheelContainer: {height: 150, width: 150},
  buttonCon: {
    borderColor: Colours.myWhite,
    width: 150,
  },
  buttonDis: {
    borderColor: Colours.myRedConf,
  },
  buttonIconDis: {
    fontSize: 17,
    color: Colours.myRedConf,
  },
  butTextCon: {
    fontSize: 17,
    color: Colours.myWhite,
  },
  butTextDis: {
    fontSize: 17,
    color: Colours.myRedConf,
  },
  buttonIconCon: {
    fontSize: 17,
    color: Colours.myWhite,
    marginLeft: 10,
  },
  butContainer: {
    alignSelf: 'center',
  },

  hsvNumRowContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',

    flexDirection: 'row',
    flex: 0,
  },
  textRowtitles: {
    alignContent: 'center',
    marginTop: 8,
    flexDirection: 'row',
    flex: 0,
  },
  rgbTextDis: {
    fontSize: 15,
    flex: 0,
    paddingLeft: 45,

    color: Colours.myWhite,
  },
  rgbTextH: {
    fontSize: 15,
    flex: 0,
    paddingLeft: 45,

    color: Colours.myWhite,
  },
  rgbTextS: {
    fontSize: 15,
    flex: 0,
    paddingLeft: 73,
    borderColor: 'white',

    color: Colours.myWhite,
  },
  rgbTextB: {
    fontSize: 15,
    flex: 0,
    paddingLeft: 48,

    color: Colours.myWhite,
  },
  rgbNumDis: {
    fontSize: 25,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    width: 100,
    textTransform: 'uppercase',
    textDecorationLine: 'line-through',
    color: Colours.myWhite,
  },
  rgbNumH: {
    color: Colours.myWhite,
    fontSize: 25,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    width: 100,
    textTransform: 'uppercase',
  },
  rgbNumS: {
    fontSize: 25,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    width: 100,
    textTransform: 'uppercase',
  },
  rgbNumB: {
    color: Colours.myYellow,
    fontSize: 25,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 10,
    width: 100,
    textTransform: 'uppercase',
  },
  bottomHSBContainer: {
    flex: 1,
    marginVertical: 20,
  },
  pickerContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTextCon: {
    color: Colours.myWhite,
    fontSize: 17,
    fontWeight: '400',
  },
  headerTextDis: {
    color: Colours.myRedConf,
    fontSize: 20,
    fontWeight: '700',
  },
  headerLeftCon: {
    marginLeft: 5,
    fontSize: 10,
    color: Colours.myGreenConf,
    flex: 0,
    width: 55,
    paddingTop: 5,
  },
  headerLeftDis: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    fontSize: 13,
    color: Colours.myRedConf,
  },
  headerRightCon: {
    color: Colours.myGreenConf,
    fontSize: 23,
    marginEnd: 8,
  },
  headerRightDis: {
    fontSize: 23,
    color: Colours.myRedConf,
  },
});
export default AdjustScreen;
