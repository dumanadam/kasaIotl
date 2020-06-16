import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Slider, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Secrets} from '../api/Secrets';
import {IotlGlobals} from '../api/context';
import {AuthContext} from '../api/context';

const TimerScreen = ({navigation}) => {
  const [userObj, setUserObj] = React.useState({
    timerScreen: {
      isEmailValid: true,
      isDemoUser: false,
      backgroundImage: '../assets/images/light.gif',

      isInputEditable: true,

      showbg: true,
      isOptions: false,
      isRemember: true,
      isDemoUserChecked: false,

      saveUserObj: false,
      optionsChevron: 'chevron-up',
      isloading: false,
      userNameError: '',
      userPassError: '',
    },

    authObj: {
      authName: '',
      authPass: '',
      authToken: '',
      authUUID: '',
      authDeviceList: {},
      isLoggedIn: false,
      showSplash: false,
    },
  });

  const {
    signIn,
    signUp,
    signOut,
    updateAuthObjTruth,
    getAppUserObj,
  } = React.useContext(AuthContext);
  const [value, setcount] = React.useState(0);
  const [authObj, setAuthObj] = React.useState(
    getAppUserObj('from timer start'),
  );

  const update = navigation => {
    navigation.setOptions({title: 'Updated!'});
  };

  const asd = React.useContext(IotlGlobals);

  React.useEffect(() => {
    var appUserObj = getAppUserObj('from timer usefeect');
    console.log('Timer screen authObj from App', authObj);
    console.log('Timer screen userobj from app', appUserObj);
    console.log('device lit', JSON.stringify(appUserObj.authDeviceList));
    setUserObj({
      ...userObj,

      authObj: {
        ...userObj.authObj,
        ...appUserObj.authObj,
        page: 'timerscreen',
      },
    });
  }, []);

  const setGlobeSettings = async () => {
    /*  let setGlobeSettingsResult = await tplink
      .getLB130('Kitchen LB130')
      .setState(1, 90, 150, 80); */

    console.log('the result ', authObj);
    console.log('the result ', userObj);
    updateAuthObjTruth({
      ...authObj,
      saveUserObj: true,
      authObj: {
        ...authObj.authObj,
        isLoggedIn: false,
        page: 'settings',
      },
    });
  };

  React.useEffect(() => {
    console.log('timer useeffe userobj ', userObj);
    console.log('timer useeffe userobj ', authObj);
  }, [userObj]);

  React.useEffect(() => {
    console.log('auth updated timer', Secrets.customUUID);
    console.log('auth updated timer asd ', asd);
  }, [asd]);

  const lightoff = async () => {
    /*  let setGlobeSettingsResult = await tplink
      .getLB130('Kitchen LB130')
      .setState(1, 90, 150, 80); */
    var success = await tplink.getHS100('My Smart Plug').toggle();
    console.log(`the result ${success}`);
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={
          userObj.isEmailValid
            ? require('../assets/images/light_lc.jpg')
            : require('../assets/images/light_dc.jpg')
        }
        style={styles.backgroundImage}>
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
        <View style={styles.mainContainer}>
          <Text>Timer Screen</Text>
          <Button title="asdd" onPress={update} />
          <TouchableOpacity
            onPress={() => {
              setGlobeSettings();
            }}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              backgroundColor: '#fff',
              borderRadius: 50,
            }}>
            <Icon name={'chevron-right'} size={30} color="#01a699" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              lightoff();
            }}
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              backgroundColor: '#fff',
              borderRadius: 50,
            }}>
            <Icon name={'lightbulb-on-outline'} size={30} color="red" />
          </TouchableOpacity>
          <View
            style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
            <Slider value={value} onValueChange={value => setcount(value)} />
            <Text>Value: {value}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginBottom: 20,
    backgroundColor: 'black',
  },
  backgroundContainer: {
    backgroundColor: 'black',
    flex: 1,
  },
  mainContainer: {justifyContent: 'center', alignContent: 'center', flex: 1},
});
export default TimerScreen;
