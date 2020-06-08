import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LoginForm from './LoginForm';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, CheckBox} from 'react-native-elements';
import {IotlStrings, Colours, AuthContext, IotlGlobals} from '../api/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}) => {
  const [isOptions, setisOptions] = React.useState(false);
  const [isRemember, setIsRemember] = React.useState(true);
  const [isReset, setisReset] = React.useState(false);
  const [optionsColour, setOptionsColour] = React.useState(Colours.myYellow);
  const [optionsChevron, setOptionsChevron] = React.useState('chevron-up');

  const optionsClicked = () => {
    setisOptions(!isOptions);
    isOptions
      ? setOptionsChevron('chevron-up')
      : setOptionsChevron('chevron-down');
  };

  React.useEffect(() => {
    setTimeout(() => {}, 500);
  }, []);

  var optionsProps = {
    title: IotlStrings.loginOptionsTextButton,
    type: 'clear',
    buttonStyle: styles.optionsbutton,
    onPress: () => optionsClicked(),
    titleStyle: styles.optionsText,
    icon: <Icon name={optionsChevron} size={15} color={optionsColour} />,
  };

  const storeAsyncData = async (key, value) => {
    try {
      console.log(`entering ${key} and ${key}`);
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log('async storage error', e);
    }
  };

  const getAsyncData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('thekey???', value);
      }
    } catch (e) {
      console.log('key error ', e);
    }
  };

  storeAsyncData('testkey', 'testdata');
  var aaa = getAsyncData('testkey');

  console.log(`reterevied ${JSON.stringify(aaa)}`);

  return (
    <ImageBackground
      source={require('../assets/images/bg.gif')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/bulb.gif')}
              style={styles.imgLogo}
            />
            <Text style={styles.loginAreaTitle}>{IotlStrings.loginTitle}</Text>
            <LoginForm />
          </View>
        </KeyboardAvoidingView>
      </View>
      <Button {...optionsProps} />
      <View style={styles.bottomContainer}>
        {isOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.firstLineContainer}>
              <CheckBox
                title="Rememeber"
                checked={isRemember}
                iconType="material-community"
                checkedIcon="checkbox-marked-circle-outline"
                uncheckedIcon="checkbox-blank-circle-outline"
                size={15}
                checkedColor="red"
                onPress={() => rememberPushed}
                containerStyle={styles.check}
                textStyle={styles.checkText}
              />
            </View>
            <View style={styles.secondLineContainer}>
              <View style={styles.textButtonContainer}>
                <Icon
                  name="account-plus"
                  color="white"
                  style={styles.buttonIcon}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateAccountScreen')}>
                  <Text style={styles.createAccountText}>
                    {IotlStrings.createAccountButton}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.textButtonContainer}>
                <Icon
                  name="lock-reset"
                  color="white"
                  style={styles.buttonIcon}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ResetPasswordScreen')}>
                  <Text style={styles.resetPWButtonText}>
                    {IotlStrings.resetPWButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.thirdLineContainer}>
              <View style={styles.textButtonContainer}>
                <Icon
                  name="account-plus"
                  color="white"
                  style={styles.buttonIcon}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateAccountScreen')}>
                  <Text style={styles.defaultsText}>
                    {IotlStrings.defaultsButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <React.Fragment />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    color: '#F68F00',
    fontSize: 10,
  },
  botButton: {
    backgroundColor: 'transparent',
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
  logoDesc: {
    textAlign: 'center',
    color: '#f2f2f2',
  },
  topContainer: {
    paddingHorizontal: 10,

    borderRadius: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
  },
  firstLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondLineContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  thirdLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  createAccountText: {
    color: '#DBE2E5',
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 20,
  },
  buttonIcon: {
    color: '#DBE2E5',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 5,
  },
  seperatorIcon: {
    color: '#DBE2E5',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 8,
  },

  bottomContainerV: {
    flex: 1,
    flexDirection: 'column',

    padding: 10,
  },

  LanContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  lanControlButton: {
    padding: 10,
    backgroundColor: 'transparent',

    margin: 10,
    width: 5,
    flex: 1,
  },
  resetPWButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultsText: {
    color: Colours.myWhite,
  },

  loginAreaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    width: 260,
    color: '#DBE2E5',
  },
  signUpArea: {
    alignItems: 'center',
    margin: 15,

    padding: 20,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lanControlButton: {
    color: '#DBE2E5',

    margin: 3,
  },
  resetPWButtonText: {
    color: '#DBE2E5',
    borderWidth: 0,
    margin: 3,
  },
});

export default LoginScreen;
