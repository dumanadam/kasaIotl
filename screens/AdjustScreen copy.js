import * as React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {
  IotlStrings,
  IotlGlobals,
  AuthContext,
  Colours,
  myErrors,
} from '../api/context';
import {useState} from 'react';
import {Header, Slider, Button, Text} from 'react-native-elements';
import {ColorPicker} from 'react-native-color-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colorsys from 'colorsys';
import AwesomeAlert from 'react-native-awesome-alerts';
import {tplinkLogin} from '../api/KasaAuthFunctions';
import useInterval from '../api/useInterval';
import HeaderLeft from '../components/HeaderLeft';
import KasaControl from '../api/KasaControl';

//import {ColorWheel} from 'react-native-color-wheel';

const AdjustScreen = props => {
  const {
    updateAuthObjTruth,
    updateUserObjTruth,
    getAppUserObj,
    getAppAuthObj,
  } = React.useContext(AuthContext);

  const [kasaSettings, setKasaSettings] = useState({
    h: 50,
    s: 50,
    v: 50,
    color_temp: 0,
    oldHex: '#364D1F',
    newHex: '#364D1F',
    power: false,
    transitionTime: 0,
  });

  //tranition 0 - 10000 muilliseconds temp 0 - 7000 h 0 - 360 v 0 - 100

  const [authObj, setAuthObj] = React.useState(
    getAppAuthObj('request by Colour usestate defgault setup'),
  );

  const [userObj, setuserObj] = React.useState({
    backgroundImage: '../assets/images/light.gif',
    showbg: require('../assets/images/light_lc.jpg'),

    saveUserObj: false,
    isToKasa: false,
    errorMessage: 'Getting latest Settings',
    errorTitle: 'Updating',
    showProgress: true,
    showConfirm: false,
    showAlert: false,
    closeOut: false,
    closeBack: false,
    showCancel: false,
    confText: 'OK',
    confirmButtonColor: Colours.myYellow,
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
    console.log(myErrors);

    setupPage();

    console.log('----------Colour Exit ----------');
  }, []);

  React.useEffect(() => {
    if (authObj.saveAuthObj) {
      updateAuthObjTruth(authObj);
    }
  }, [authObj]);

  React.useEffect(() => {
    console.log('authObj.kasaObj.kasa updated', authObj.kasaObj.kasa);

    //  console.log('kasasettings UPDATED', JSON.stringify(kasaSettings));
  }, [authObj.kasaObj.kasa]);

  /* if(authObj.isPolling) {
  console.log("polling", authObj.kasaObj.kasa)
  useInterval(async () => {
    
    try {const latestLightState = await authObj.kasaObj.kasa.info(
      authObj.deviceInfo[0].deviceId,
    );
    console.log(latestLightState);
      
    } catch (error) {
      
    }
    
  }, authObj.pollTime); } */

  const setupPage = async () => {
    console.log(
      'Page Setup -------------------------------------------',
      authObj.kasaObj.kasa,
    );

    if (authObj.noDevicesKasa) {
      setuserObj({
        ...userObj,
        showAlert: true,
        showbg: require('../assets/images/light_dc.jpg'),
        showProgress: false,
        showConfirm: true,
        showAlert: true,
        closeOut: true,
        closeBack: true,
        showCancel: false,
        confText: 'OK',
        confirmButtonColor: Colours.myYellow,
        errorTitle: 'No Bulb Found',
        errorMessage: 'Please add a bulb to your Kasa Account ',
      });
    } else {
      try {
        const latestLightState = await authObj.kasaObj.kasa.info(
          authObj.deviceInfo[0].deviceId,
        );
        console.log(
          '+++++++++++++++++ page RELOAD UPDATE FROM KASA FOR LATEST',
          latestLightState,
        );
      } catch (error) {
        console.log(
          '+++++++++++++++++ page RELOAD UPDATE FROM KASA FAILED TRYING LOGIN ',
          error,
        );

        try {
          localKasaLogin();
        } catch (error) {}
      }

      /* let slidBC = authObj.deviceInfo[0].light_state.brightness;
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
        newHex: 'black',
      });
      setuserObj({
        ...userObj,
        slidSaturationT: slidSC,
        slidBrightnessT: slidBC,
        hueT: cPV,
      }); */

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

    console.log(
      'sending Colour Changed -------------------------------------------',
      {...kasaSettings, h: cPV, s: slidSC, v: slidBC},
    );
    setKasaSettings({
      ...kasaSettings,
      h: cPV,
      s: slidSC,
      v: slidBC,
      newHex: hslConverted,
    });
    setuserObj({
      ...userObj,
      slidSaturationT: slidSC,
      slidBrightnessT: slidBC,
      hueT: cPV,
    });

    console.log('hslConverted', hslConverted);
  };

  const showError = () => {
    setuserObj({...userObj, showAlert: !userObj.showAlert});
  };

  const localKasaLogin = async () => {
    let returnKasaLogin = {};
    const kasa = new KasaControl();

    try {
      const latestLogin = await kasa.login(
        '***REMOVED***',
        '***REMOVED***',
      );
      console.log('mylogin', JSON.stringify(latestLogin));
      returnKasaLogin = {
        kasaObj: kasa,
        errorMessage: '',
        errorTitle: '',
      };
    } catch (error) {
      console.log('error+++++', error);
      returnKasaLogin.errorMessage = JSON.stringify(error);
    }

    try {
      const latestLogin = await tplinkLogin(authObj);
      console.log(
        '+++++++++++++++++++++++++   Creating a New LOGIN +++++++++++++++ ',
      );
      //const latestLightState = await latestLogin.info(devices[0].deviceId);
      const devices = await latestLogin.getDevices();
      console.log('DEvices >> ', devices);
      console.log('DEvices >> ', latestLogin);
 */
    /* console.log('Latest .info return >>>> ', latestLightState);
      console.log('Latest .info return >>>> ', latestLightState.rssi);
      // Try again after expired token - reuse this code
      const latestHSV = {
        h: latestLightState.light_state.hue,
        s: latestLightState.light_state.saturation,
        v: latestLightState.light_state.brightness,
      };
      var hslConverted = colorsys.hsv2Hex(latestHSV);
      console.log('hslconverted >>>> ', hslConverted);
      if (devices == []) {
        setAuthObj({
          ...authObj,

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

          kasaObj: latestLogin,
          deviceInfo: [latestLightState],
          authDeviceList: [devices[0]],
          isLoading: false,
          saveAuthObj: true,
          noDevicesKasa: false,
        });

        setKasaSettings({
          h: latestHSV.h,
          s: latestHSV.s,
          v: latestHSV.v,
          color_temp: latestLightState.light_state.color_temp,
          rssi: latestLightState.rssi,
          oldHex: hslConverted,
          newHex: hslConverted,
          power: latestLightState.light_state.on_off,
        });
        setuserObj({
          ...userObj,
          slidSaturationT: latestHSV.s,
          slidBrightnessT: latestHSV.v,
          hueT: latestHSV,
          showAlert: false,
        });
        console.log(
          '+++++++++++++++++++++++++   LOCAL LOGIN SUCCESS !!!!!!!!!!!!!!!!!!!!!!! +++++++++++++++ ',
          authObj.authDeviceList,
        );
        return latestLogin; 
      }*/
    /*     } catch (e) {
      console.log(
        'Local Login FAILED ---------------------------------------',
        e,
      );
    } */
  };

  const wheelPressed = async () => {
    let tokenExpired = false;
    console.log('Turning off');

    try {
      let sentLightSettings = {};

      const power = await authObj.kasaObj.kasa.power(
        authObj.deviceInfo[0].deviceId,
        true,
        10000,
        sentLightSettings,
      );
      console.log('return from light update', JSON.stringify(power));
    } catch (e) {
      console.log(
        ' +++++++++++++++++++++++++++++++++++++++             POWEEERRRRR ERROR',
        JSON.stringify(power),
      );
    }
  };

  const updateKasa = async () => {
    let tokenExpired = false;
    console.log(
      '+++++++++update button  kasaobj >>',
      JSON.stringify(authObj.kasaObj),
    );
    if (authObj.noDevicesKasa) {
      try {
        const latestLightState = await authObj.kasaObj.kasa.info(
          authObj.deviceInfo[0].deviceId,
        );
        console.log(
          '+++++++++++++++++ page RELOAD UPDATE FROM KASA FOR LATEST',
          latestLightState,
        );
      } catch (error) {
        console.log(
          '+++++++++++++++++ page RELOAD UPDATE FROM KASA FAILED TRYING LOGIN ',
          error,
        );

        try {
          localKasaLogin();
        } catch (error) {}
      }
    } else {
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
      } catch (error) {
        console.log('----------------', error);
        tokenExpired = true;
      }
    }

    if (tokenExpired == true) {
      console.log(
        '-*----------------------------EXPIRED---------------------------------------------',
      );

      try {
        localKasaLogin();
      } catch (error) {
        console.log(
          'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX   CANT LOGIN   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          error,
        );
      }
    }
  };

  const headerSelect = selection => {
    if (selection == 'left') {
      return (
        <View>
          <HeaderLeft kasaSettings={(kasaSettings, authObj)} />
        </View>
      );
    } else {
      return (
        <View style={{justifyContent: 'flex-start'}}>
          <Icon
            style={styles.settingsIcon}
            name={'settings'}
            size={25}
            iconStyle={{
              color: Colours.myRedConf,
            }}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={
          //authObj.deviceInfo[0].light_state.on_off
          userObj.showbg
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
                defaultColor={kasaSettings.newHex}
                SliderProps={{value: 0.3}}
                style={{flex: 1}}
                onColorChange={value => colourChanged(value)}
                sliderComponent={Slider}
                onColorSelected={() => wheelPressed()}
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
                    ? [styles.rgbNumH, {color: kasaSettings.newHex}]
                    : styles.rgbNumDis
                }>
                {kasaSettings.h}
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
                        styles.rgbNumB,
                        {
                          color: Colours.myWhite,
                          opacity: kasaSettings.v * 0.01,
                        },
                      ]
                    : styles.rgbNumDis
                }>
                {kasaSettings.v}
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
            showProgress={userObj.showProgress}
            closeOnTouchOutside={userObj.closeOut}
            closeOnHardwareBackPress={userObj.closeBack}
            showCancelButton={userObj.showCancel}
            showConfirmButton={userObj.showConfirm}
            confirmText={userObj.confText}
            confirmButtonColor={userObj.confirmButtonColor}
            progressSize={30}
            contentContainerStyle={styles.alertMCont}
            titleStyle={styles.alertTitle}
            messageStyle={styles.alertMessage}
            progressColor={Colours.myLgtBlue}
            onConfirmPressed={() => {
              showError();
            }}
          />
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
    height: 38,
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
  alertMCont: {
    backgroundColor: Colours.myWhite,
    borderColor: Colours.myYellow,
    borderWidth: 2,
    color: 'red',
  },
  alertTitle: {
    color: Colours.myDrkBlue,
  },
  alertMessage: {
    textAlign: 'center',

    color: Colours.myLgtBlue,
  },
  wheelContainer: {height: 150, width: 150},
  buttonCon: {
    borderColor: Colours.myWhite,
    width: 150,
  },
  settingsIcon: {
    fontSize: 25,
    color: Colours.myWhite,
    marginBottom: 35,
    marginLeft: 15,
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
    marginBottom: 20,
    fontWeight: '700',
  },
  headerTextDis: {
    color: Colours.myRedConf,
    marginBottom: 20,
    fontWeight: '700',
  },
  headerLeftCon: {
    marginBottom: 30,

    fontSize: 12,
    color: Colours.myGreenConf,
    flex: 0,
    width: 55,
  },
  headerLeftDis: {
    fontSize: 12,
    color: Colours.myRedConf,
    marginBottom: 40,
  },
  headerRightCon: {
    color: Colours.myGreenConf,
    fontSize: 12,
    marginEnd: 8,
  },
  headerRightDis: {
    fontSize: 12,
    color: Colours.myRedConf,
  },
});
export default AdjustScreen;
