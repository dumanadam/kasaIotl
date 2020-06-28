import * as React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Vibration,
} from 'react-native';
import {Button, CheckBox, Input} from 'react-native-elements';
import KasaControl from '../api/KasaControl';
import {Secrets} from '../api/Secrets';
import {IotlStrings, Colours, AuthContext, Errors} from '../api/context';

const SettingsScreen = ({navigation}) => {
  const {
    signIn,
    signUp,
    signOut,
    updateAuthObjTruth,
    updateUserObjTruth,
    getAppUserObj,
    getAppAuthObj,
  } = React.useContext(AuthContext);

  const [userObj, setUserObj] = React.useState({
    settingsScreen: {},
    ...getAppUserObj('from settings start'),
  });

  const [kasaresult, setkasaresult] = React.useState('defaul');

  const [kasadevices, setkasadevices] = React.useState(null);
  const [kasax, setx] = React.useState(null);
  const [kasapower, setkasapower] = React.useState(null);

  const [authObj, setAuthObj] = React.useState(getAppAuthObj('from settings'));

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authobj ', JSON.stringify(authObj));

    console.log('----------Settings Exit ----------');
  }, [authObj]);

  const updatepage = async () => {
    const kasa = new KasaControl();
    let kasaSettings = {
      mode: 'normal',
      hue: 150,
      saturation: 80,
      color_temp: 2750,
      brightness: 80,
    };

    await kasa.login('kasademo@talha.me', 'appliedproject2');
    setkasaresult(kasa);
    devices = await kasa.getDevices();
    setkasadevices(devices);
    // turn off first device
    //tranition 0 - 10000 muilliseconds temp 0 - 7000 hue 0 - 360 brightness 0 - 100
    const power = await kasa.power(devices[0].deviceId, true, 0, kasaSettings);
    console.log('return USER in login from tplink', JSON.stringify(power));
    setkasapower(power);
    //mode, hue, saturation, color_temp, brightness

    const info = await kasa.info('8012146C6839D9D29F024151439E90AE1C724BBA');
    setkasaresult(info);
    console.log('return USER in login from tplink', JSON.stringify(info));

    //    console.log(power);

    //send(authObj.auth);
    //  const st = await allinone.hello();
    //console.log(JSON.stringify(authObj));
    //    const asd = new Chandu();

    /*  const asd = new Chandu();
    await asd.login('kasademo@talha.me', 'appliedproject2');
    console.log(JSON.stringify(asd));
    const ww = await asd
      .send(JSON.stringify(authObj.kasaObj), {
        'smartlife.iot.smartbulb.lightingservice': {
          transition_light_state: {
            on_off: 0,
            transition_period: 0,
          },
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.error(e)); */
  };

  const sethue = async theobject => {
    const kasa = new KasaControl();
    let kasaSettings = {
      hue: 110,
      saturation: 100,
      brightness: 25,
      color_temp: 0,
    };

    await kasa.login('kasademo@talha.me', 'appliedproject2');
    setkasaresult(kasa);
    // devices = await kasa.getDevices();

    // turn off first device
    //tranition 0 - 10000 muilliseconds temp 0 - 7000 hue 0 - 360 brightness 0 - 100
    const power = await kasa.power(devices[0].deviceId, true, 0, kasaSettings);
    console.log('return USER in login from tplink', JSON.stringify(power));
    setkasapower(power);

    //mode, hue, saturation, color_temp, brightness

    const info = await kasa.info('8012146C6839D9D29F024151439E90AE1C724BBA');
    setkasaresult(info);
    //console.log('return USER in login from tplink', JSON.stringify(info));

    //    console.log(power);

    //send(authObj.auth);
    //  const st = await allinone.hello();
    //console.log(JSON.stringify(authObj));
    //    const asd = new Chandu();

    /*  const asd = new Chandu();
    await asd.login('kasademo@talha.me', 'appliedproject2');
    console.log(JSON.stringify(asd));
    const ww = await asd
      .send(JSON.stringify(authObj.kasaObj), {
        'smartlife.iot.smartbulb.lightingservice': {
          transition_light_state: {
            on_off: 0,
            transition_period: 0,
          },
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.error(e)); */
  };

  const logOutSequence = () => {
    if (authObj == undefined) {
      console.log('authObj underfined');
    } else {
      updateAuthObjTruth({saveAuthObj: true});
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/lightBG3.jpg')}
      /*       source={() =>
      userObj.isEmailValid
        ? require('../assets/images/light.gif')
        : require('../assets/images/iotl.gif')
    } */
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />

        <View style={styles.topContainer} />
        <Button
          title="Logout"
          onPress={() => {
            logOutSequence();
          }}
        />
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  disabledInput: {
    padding: 10,
    color: Colours.myYellow,
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    padding: 10,

    color: Colours.myYellow,

    fontSize: 15,
    fontWeight: '600',
    width: '100%',
  },
  inputDemo: {
    padding: 10,

    color: Colours.myWhite,

    fontSize: 15,
    fontWeight: '600',
    width: '100%',
  },
  check: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkText: {
    color: Colours.myWhite,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 20,
    fontSize: 12,
    fontWeight: 'normal',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionsText: {
    color: Colours.myYellow,
    fontSize: 10,
  },
  myAlert: {
    zIndex: 10,
  },

  container: {
    flex: 0,
    alignItems: 'center',
    marginTop: 150,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imgLogo: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  logo: {alignItems: 'center', justifyContent: 'center'},
  optionsButton: {
    backgroundColor: 'transparent',

    marginBottom: 30,
    marginTop: 15,
  },
  topContainer: {
    paddingHorizontal: 10,

    borderRadius: 5,

    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
  },
  bottomContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
  },
  firstLineContainer: {
    flexDirection: 'row',
  },
});
export default SettingsScreen;
