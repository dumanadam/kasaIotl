import * as React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Header, Slider, Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimerScreen = ({navigation}) => {
  const [userObj, setUserObj] = React.useState({
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
  const [value, setcount] = React.useState(0);
  const update = navigation => {
    navigation.setOptions({title: 'Updated!'});
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
