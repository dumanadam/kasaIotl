import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  IotlStrings,
  IotlGlobals,
  AuthContext,
  Colours,
  Errors,
} from '../api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';
import {useState} from 'react';
import KasaControl from '../api/kasaKontrol';
import {Header, Slider, Button, Text} from 'react-native-elements';
import {ColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorsys from 'colorsys';
import AwesomeAlert from 'react-native-awesome-alerts';
import {tplinkLogin} from '../api/KasaAuthFunctions';

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
    h: 50,
    s: 50,
    v: 50,
    color_temp: 0,
    oldHex: '',
    newHex: '',
  });
  //tranition 0 - 10000 muilliseconds temp 0 - 7000 h 0 - 360 v 0 - 100
  const [authObj, setAuthObj] = React.useState(
    getAppAuthObj('request by Colour usestate defgault setup'),
  );
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
    hueHex: '#ffffff',
    satHex: '#ffffff',
    briHex: '#ffffff',
  });

  React.useEffect(() => {
    console.log('----------Colour ----------');

    setupPage();
    console.log(
      'adjust lightstate >>>>',
      JSON.stringify(authObj.deviceInfo[0].light_state),
    );

    console.log('----------Colour Exit ----------');
  }, []);

  React.useEffect(() => {
    console.log('kasasettings UPDATED', JSON.stringify(kasaSettings));
  }, [kasaSettings]);

  const convertHSL = () => {
    var justHsl = {h: kasaSettings.h, s: kasaSettings.s, v: kasaSettings.v};

    console.log(hslConverted);
  };

  const setupPage = () => {
    console.log(
      'Page Setup -------------------------------------------',
      authObj.deviceInfo[0].light_state,
    );
    if (authObj.noDevicesKasa) {
      setuserObj({
        ...userObj,
        showAlert: true,
        errorTitle: Errors.noBulbKasaT,
        errorMessage: noBulbKasa,
      });
    } else {
      let slidBC = authObj.deviceInfo[0].light_state.brightness;
      let slidSC = authObj.deviceInfo[0].light_state.saturation;
      const cPV = authObj.deviceInfo[0].light_state.hue;
      var hslConverted = colorsys.hsv2Hex({h: cPV, s: slidSC, v: slidBC});
      console.log(
        'setuppage setting setting default and old to hslConverted -------------------------------------------',
        hslConverted,
      );
      setKasaSettings({
        ...kasaSettings,
        h: cPV,
        s: slidSC,
        v: slidBC,
        oldHex: hslConverted,
      });
      setuserObj({
        ...userObj,
        slidSaturationT: slidSC,
        slidBrightnessT: slidBC,
        hueT: cPV,
      });

      if (authObj.noDevicesKasa) {
        //setAuthObj({...latestAuthObj, });
        console.log('null');
      } else {
        //   setAuthObj({...latestAuthObj, showAlert: true});
        console.log('NOT null');
      }
    }

    /* const latestLightState = await authObj.kasaObj.kasa.info(
      authObj.deviceInfo[0].deviceId,
    ); */
  };

  const colourChanged = value => {
    let slidBC = Math.floor(value.v * 100);
    let slidSC = Math.floor(value.s * 100);
    let cPV = Math.floor(value.h);
    var hslConverted = colorsys.hsv2Hex({h: cPV, s: slidSC, v: slidBC});
    var hsl2RGB = colorsys.hsv2Rgb({h: cPV, s: slidSC, v: slidBC});
    console.log(
      'sending Colour Changed -------------------------------------------',
      {...kasaSettings, h: cPV, s: slidSC, v: slidBC},
    );
    setKasaSettings({...kasaSettings, h: cPV, s: slidSC, v: slidBC});
    setuserObj({
      ...userObj,
      slidSaturationT: slidSC,
      slidBrightnessT: slidBC,
      hueT: cPV,
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

  const updateKasa = async () => {
    let tokenExpired = false;
    console.log(
      'YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY',
      JSON.stringify(authObj.kasaObj),
    );

    try {
      let sentLightSettings = {
        mode: 'normal',
        hue: kasaSettings.h,
        saturation: kasaSettings.s,
        color_temp: 0,
        brightness: kasaSettings.v,
      };

      const power = await authObj.kasaObj.kasa.power(
        authObj.deviceInfo[0].deviceId,
        true,
        0,
        sentLightSettings,
      );
      console.log('return from light update', JSON.stringify(power));
      /*   setKasaSettings({
        ...kasaSettings,
        h: latestLightState.hue,
        s: latestLightState.saturation,
        v: latestLightState.brightness,
        color_temp: latestLightState.color_temp,
        rssi: authObj.deviceInfo[0].rssi,
      }); */
      var latestHex = colorsys.hsv2Hex({
        h: kasaSettings.h,
        s: kasaSettings.s,
        v: kasaSettings.v,
      });
      console.log(
        '+++++++++++++++++++++++++++++++++++++++++latestLightState++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
        latestHex,
      );
      setKasaSettings({
        ...kasaSettings,
        oldHex: latestHex,
      });
      console.log(
        '++++++++++++++++++++++++++++++++++++++++++++++++++hslConverted+++++++++++++++++++++++++++++++++++++++++++++++++++',
        latestHex,
      );
    } catch (error) {
      console.log('----------------', error);
      tokenExpired = true;
    }
    if (tokenExpired == true) {
      console.log(
        '-*----------------------------EXPIRED---------------------------------------------',
      );

      try {
        const latestLogin = await tplinkLogin(authObj);
        console.log('Loin page data', JSON.stringify(latestLogin));
        const devices = await latestLogin.kasa.getDevices();
        const latestLightState = await latestLogin.kasa.info(
          authObj.deviceInfo[0].deviceId,
        );
        console.log(devices);
        console.log(latestLightState);
        if (devices == []) {
          setAuthObj({
            ...authObj,
            isLoggedIn: true,
            authStyle: 'demo',
            saveAuthObj: true,
            kasaObj: latestLogin,
            deviceInfo: [latestLightState],
            authDeviceList: [],
            isLoading: false,
            saveAuthObj: true,
            noDevicesKasa: true,
          });
        } else {
          setAuthObj({
            ...authObj,
            isLoggedIn: true,
            authStyle: 'demo',
            saveAuthObj: true,
            kasaObj: latestLogin,
            deviceInfo: [latestLightState],
            authDeviceList: [devices[0]],
            isLoading: false,
            saveAuthObj: true,
            noDevicesKasa: false,
          });

          /*         console.log(
        'Set AUTH in login checkauth after login',
        JSON.stringify({
          ...authObj,
          isLoggedIn: true,
          authStyle: 'demo',
          saveAuthObj: true,
          kasaObj: data.kasa,
          deviceInfo: [info],
          authDeviceList: [devices[0]],
          isLoading: false,
          saveAuthObj: true,
          noDevicesKasa: false,
          
        }),
      ); */
        }
      } catch (error) {
        console.log(
          'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          error,
        );
      }
    }
  };

  const headerSelect = selection => {
    console.log('heasderselect ???>>>?????, ', authObj.noDevicesKasa);

    if (selection == 'left') {
      return (
        <View style={{justifyContent: 'flex-start'}}>
          <Text
            style={
              !authObj.noDevicesKasa
                ? styles.headerLeftCon
                : styles.headerLeftDis
            }>
            {!authObj.noDevicesKasa
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
                !authObj.noDevicesKasa
                  ? styles.headerRightCon
                  : styles.headerRightDis
              }
              name={!authObj.noDevicesKasa ? 'lan-connect' : 'lan-disconnect'}
              disabledStyle={styles.headerLeftDis}
              disabled={true}
              size={25}
              iconStyle={{
                color: Colours.myRedConf,
              }}
              /*      color={
                !authObj.noDevicesKasa ? Colours.myGreenConf : Colours.myRedConf
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
        source={
          authObj.deviceInfo[0].light_state.on_off
            ? require('../assets/images/light_lc.jpg')
            : require('../assets/images/light_dc.jpg')
        }
        style={styles.backgroundImage}>
        <Header
          statusBarProps={{barStyle: 'default'}}
          containerStyle={styles.header}
          centerComponent={{
            text: !authObj.noDevicesKasa
              ? IotlStrings.greenDevices
              : IotlStrings.noDevices,
            style: !authObj.noDevicesKasa
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
                //  onColorSelected={color => alert(`Color selected: ${color}`)}
                oldColor={kasaSettings.oldHex}
                defaultColor={kasaSettings.oldHex}
                SliderProps={{value: 0.3}}
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
                  !authObj.noDevicesKasa
                    ? [styles.rgbNumH, {color: kasaSettings.oldHex}]
                    : styles.rgbNumDis
                }>
                {JSON.stringify(kasaSettings.h)}
              </Text>
              <Text
                style={
                  !authObj.noDevicesKasa
                    ? [
                        styles.rgbNumS,
                        {
                          color: Colours.myYellow,
                          opacity: kasaSettings.s * 0.01,
                        },
                      ]
                    : styles.rgbNumDis
                }>
                {kasaSettings.s}
              </Text>
              <Text
                style={
                  !authObj.noDevicesKasa
                    ? [
                        styles.rgbNumS,
                        {
                          color: Colours.myWhite,
                          opacity: kasaSettings.s * 0.01,
                        },
                      ]
                    : styles.rgbNumDis
                }>
                {kasaSettings.s}
              </Text>
            </View>
          </View>
          <View style={styles.butContainer}>
            <Button
              icon={
                !authObj.noDevicesKasa ? (
                  <Icon name="reload" style={styles.buttonIconCon} />
                ) : (
                  <Icon name="arrow-right" style={styles.buttonIconDis} />
                )
              }
              iconRight
              titleStyle={
                !authObj.noDevicesKasa ? styles.butTextCon : styles.butTextDis
              }
              title={
                !authObj.noDevicesKasa
                  ? IotlStrings.greenDevicesB
                  : IotlStrings.noDevicesB
              }
              type="outline"
              buttonStyle={
                !authObj.noDevicesKasa ? styles.buttonCon : styles.buttonDis
              }
              loading={userObj.isloading}
              onPress={() => updateKasa()}
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
            style={!authObj.noDevicesKasa ? styles.rgbNumB : styles.rgbNumB}>
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
