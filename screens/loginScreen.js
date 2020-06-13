import React from 'react';
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

import AsyncStorage from '@react-native-community/async-storage';
import {Button, CheckBox, Input} from 'react-native-elements';

import {IotlStrings, Colours, AuthContext, Errors} from '../api/context';
import {Secrets} from '../api/Secrets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {
  const {login} = require('tplink-cloud-api');
  const {signIn, updateAuthObj, asyncAuthObj} = React.useContext(AuthContext);
  const [userObj, setUserObj] = React.useState({
    isEmailValid: true,
    isDemoUser: false,
    backgroundImage: '../assets/images/light.gif',
    userName: Secrets.defaultUsername,
    userPassword: IotlStrings.userPassPlaceholder,
    userNamePlaceholder: IotlStrings.userNamePlaceholder,
    userPassPlaceholder: IotlStrings.userPassPlaceholder,
    isInputEditable: true,
    nameIconColour: Colours.myWhite,
    passIconColour: Colours.myWhite,
    showbg: true,
    isOptions: false,
    isRemember: true,
    isDemoUserChecked: false,
    optionsColour: Colours.myYellow,
    optionsChevron: 'chevron-up',
    isloading: false,
    userNameError: '',
    userPassError: '',
    authObj: {},
  });

  React.useEffect(() => {
    userObj.authObj.isLoggedIn
      ? console.log('login authObj useffec    >  ', userObj.authObj)
      : false;
    userObj.authObj.isLoggedIn
      ? console.log('authObj updated and sent >  ', userObj)
      : false;
    userObj.authObj.isLoggedIn ? updateAuthObj(userObj) : false;
  }, [userObj.authObj]);

  async function tplinkLogin(sentUserObj) {
    let tplinkUser = '';
    let tplinkPass = '';
    let tplinkUUID = '';
    let tplinkToken = '';
    let tplinkDeviceList;

    // log in to cloud, return a connected tplink object
    if (userObj.authObj.authStyle == 'demo') {
      tplinkUser = Secrets.demoUserName;
      tplinkPass = Secrets.demoPassword;
      tplinkUUID = Secrets.demoUUID;
    }
    const tplink = await login(tplinkUser, tplinkPass, tplinkUUID).catch(e => {
      console.log('error', e);
      setUserObj({
        ...userObj,
        userNameError: 'User Credentials Error - TPLINK',
        userPassError: "'User Credentials Error - TPLINK'",
      });

      return;
    });
    //console.log('current auth token is', tplink.getToken());
    tplinkToken = tplink.getToken();
    console.log('current auth token is', tplinkToken);

    // get a list of raw json objects (must be invoked before .get* works)
    tplinkDeviceList = await tplink.getDeviceList();
    console.log('tplinkDeviceList', tplinkDeviceList);
    setUserObj({
      ...userObj,
      authObj: {
        ...userObj.userAuth,
        authName: tplinkUser,
        authPass: tplinkPass,
        authToken: tplinkToken,
        authUUID: tplinkUUID,
        authDeviceList: tplinkDeviceList,
        isLoggedIn: true,
      },
    });

    storeAsyncData('userObj', userObj);

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

  const checkAuth = () => {
    Vibration.vibrate([50, 50, 50, 50, 50, 50]);

    if (checkPlaceholder()) {
      return;
    }

    if (userObj.isDemoUser) {
      console.log(`user:>${userObj.userName}`);
      console.log(`pass:>${userObj.userPassword}`);
      //tplinkLogin('demoUser');

      return;
    }

    if (
      userObj.userName == IotlStrings.userNamePlaceholder ||
      userObj.userPassword == IotlStrings.userPassPlaceholder
    ) {
      console.log(`placeholder`);
      console.log(`user:>${userObj.userName}`);
      console.log(`pass:>${userObj.userPassword}`);
      setUserObj({
        ...userObj,
        userNameError: Errors.usernameDefaultError,
        userPassError: Errors.userPassDefaultError,
      });

      setTimeout(() => {
        setUserObj({...userObj, userNameError: '', userPassError: ''});
      }, 1500);
      return;
    }

    console.log(`user:>${userObj.userName}`);
    console.log(`pass:>${userObj.userPassword}`);
    signIn();
  };

  const checkPlaceholder = () => {
    if (
      userObj.userName == IotlStrings.userNamePlaceholder ||
      userObj.userPassword == IotlStrings.userPassPlaceholder
    ) {
      console.log(`placeholder`);
      console.log(`user:>${userObj.userName}`);
      console.log(`pass:>${userObj.userPassword}`);
      setUserObj({
        ...userObj,
        userNameError: Errors.usernameDefaultError,
        userPassError: Errors.userPassDefaultError,
      });
      setTimeout(() => {
        setUserObj({...userObj, userNameError: '', userPassError: ''});
        return true;
      }, 1500);
    }
    return false;
  };

  const optionsClicked = () => {
    userObj.isOptions
      ? setUserObj({
          ...userObj,
          isEmailValid: !userObj.isEmailValid,
          isOptions: !userObj.isOptions,
          optionsChevron: 'chevron-up',
          optionsColour: Colours.myYellow,
        })
      : setUserObj({
          ...userObj,
          isEmailValid: !userObj.isEmailValid,
          isOptions: !userObj.isOptions,
          optionsChevron: 'chevron-down',
          optionsColour: Colours.myWhite,
        });
  };

  const checkDemoUserClicked = () => {
    let demoUserReturnColor;
    demoUserReturnColor =
      !userObj.isDemoUser == '' ? Colours.myWhite : Colours.myRedConf;
    if (!userObj.isDemoUser) {
      setUserObj({
        ...userObj,
        userNamePlaceholder: Secrets.demoUserName,
        userPassPlaceholder: IotlStrings.demoPasswordPlaceholder,
        isDemoUser: !userObj.isDemoUser,
        isInputEditable: !userObj.isInputEditable,
        userName: Secrets.demoUserName,
        userPassword: Secrets.demoPassword,
        nameIconColour: Colours.myYellow,
        passIconColour: Colours.myYellow,
      });
    } else {
      setUserObj({
        ...userObj,
        isDemoUser: !userObj.isDemoUser,
        userNamePlaceholder: IotlStrings.userNamePlaceholder,
        userPassPlaceholder: IotlStrings.userPassPlaceholder,
        nameIconColour: demoUserReturnColor,
        passIconColour: Colours.myWhite,
        isInputEditable: !userObj.isInputEditable,
      });

      console.log(`isdemo ? >> ${userObj.isDemoUser}`);
      console.log(`place? >> ${userObj.userNamePlaceholder}`);
      console.log(`pass? >> ${userObj.userPassPlaceholder}`);
    }
  };

  const rememberClicked = () => {
    setUserObj({
      ...userObj,
      isRemember: !userObj.isRemember,
    });
    console.log(`demo ${userObj.isDemoUser} check${userObj.isDemoUserChecked}`);
  };

  const checkAsyncData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        console.log(`Async Key check >> ${value}`);
      } else {
        setUserObj({...userObj, userNameError: 'asdync key empty'});

        return false;
      }
    } catch (e) {
      console.log('Async error logged', e);
      setUserObj({...userObj, userNameError: 'async error error'});
    }
  };

  const storeAsyncData = async (key, value) => {
    try {
      console.log(`entering ${key} and ${JSON.stringify(value)}`);
      const asuncConfirm = await AsyncStorage.setItem(
        key,
        JSON.stringify(value),
      );
      if (asuncConfirm != null) console.log('asunconfirm', asuncConfirm);
    } catch (e) {
      // saving error
      console.log('async storage error', e);
    }
  };

  const getAsyncData = async key => {
    console.log('lue???', key);
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('thevalue???', value);
      } else {
        console.log('key failure');
        return false;
      }
    } catch (e) {
      console.log('key error ', e);
      return 'error';
    }
  };

  const setPUserName = name => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log('nam234', userObj.userName);

    if (regexp.test(name)) {
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myGreenConf,
        userName: name,
      });
    } else {
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myRedConf,
        userName: name,
      });
    }
    if (name == '')
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myWhite,
      });
  };

  const setPUserPass = pass => {
    var regexp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (pass.length >= 6 && regexp.test(pass)) {
      setUserObj({
        ...userObj,
        passIconColour: Colours.myGreenConf,
        userPassword: pass,
      });
    } else {
      setUserObj({
        ...userObj,
        passIconColour: Colours.myRedConf,
        userPassword: pass,
      });
    }
  };
  React.useEffect(() => {
    console.log('login authObj useffec    >  ', userObj.authObj);
  }, [userObj.authObj.authStyle]);

  const test = () => {
    setUserObj({
      ...userObj,
      authObj: {
        ...userObj.authObj,
        authStyle: 'demo',

        demoUserName: 'kasademo@talha.me',
        demoPassword: 'nit3002ts',
        demoToken: '',
        demoDeviceList: {},
      },
    });
  };
  return (
    <ImageBackground
      source={
        userObj.isEmailValid
          ? require('../assets/images/light_lc.jpg')
          : require('../assets/images/light_dc.jpg')
      }
      /*       source={() =>
        userObj.isEmailValid
          ? require('../assets/images/light.gif')
          : require('../assets/images/iotl.gif')
      } */
      style={styles.backgroundImage}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={'transparent'}
            translucent={true}
          />

          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/bulb.gif')}
              style={styles.imgLogo}
            />
            <Text style={styles.loginAreaTitle}>{IotlStrings.loginTitle}</Text>
            <View style={{width: '100%'}}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={userObj.userNamePlaceholder}
                placeholderTextColor={
                  userObj.isDemoUser ? Colours.myYellow : Colours.myDrkBlue
                }
                disabledInputStyle={styles.disabledInput}
                onChangeText={text => setPUserName(text)}
                disabled={!userObj.isInputEditable}
                inputStyle={
                  userObj.isDemoUser ? styles.inputDemo : styles.input
                }
                /*        onFocus={() => UserNameFocused()}
                onBlur={() => UserNameBlur()} */

                leftIcon={
                  <Icon
                    name="account-outline"
                    size={25}
                    color={userObj.nameIconColour}
                  />
                }
                errorStyle={{color: Colours.myYellow}}
                errorMessage={userObj.userNameError}
              />
              <Input
                secureTextEntry={true}
                disabledInputStyle={styles.disabledInput}
                disabled={!userObj.isInputEditable}
                placeholder={userObj.userPassPlaceholder}
                placeholderTextColor={
                  userObj.isDemoUser ? Colours.myYellow : Colours.myDrkBlue
                }
                inputStyle={
                  userObj.isDemoUser ? styles.inputDemo : styles.input
                }
                onChangeText={text => setPUserPass(text)}
                leftIcon={
                  <Icon
                    name="lock-outline"
                    size={25}
                    color={userObj.passIconColour}
                  />
                }
                errorStyle={{color: Colours.myYellow}}
                errorMessage={userObj.userPassError}
              />

              <Button
                title={IotlStrings.loginTextButton}
                type="outline"
                buttonStyle={styles.button}
                onPress={() => checkAuth()}
                loading={userObj.isloading}
              />
              <Button
                title="test"
                type="outline"
                buttonStyle={styles.button}
                onPress={() => test()}
                loading={userObj.isloading}
              />
            </View>
          </View>
        </View>

        <View style={styles.optionsButtonContainer}>
          <TouchableOpacity
            style={styles.optionsRowContainer}
            onPress={() => optionsClicked()}>
            <Icon
              name={userObj.optionsChevron}
              size={15}
              color={userObj.optionsColour}
            />
            <Text style={styles.optionsText}>
              {IotlStrings.loginOptionsTextButton}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          {userObj.isOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.firstLineContainer}>
                <CheckBox
                  title={IotlStrings.rememberText}
                  checked={userObj.isRemember}
                  iconType="material-community"
                  checkedIcon="checkbox-marked-circle-outline"
                  uncheckedIcon="checkbox-blank-circle-outline"
                  size={15}
                  checkedColor={Colours.myYellow}
                  onPress={() => rememberClicked()}
                  containerStyle={styles.check}
                  textStyle={styles.checkText}
                />
                <CheckBox
                  title={IotlStrings.defmoUserText}
                  checked={userObj.isDemoUser}
                  iconType="material-community"
                  checkedIcon="checkbox-marked-circle-outline"
                  uncheckedIcon="checkbox-blank-circle-outline"
                  size={15}
                  checkedColor={Colours.myYellow}
                  onPress={() => checkDemoUserClicked()}
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
      </KeyboardAwareScrollView>
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
  secondLineContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  thirdLineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  optionsButtonContainer: {
    marginTop: 25,
    marginBottom: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  optionsRowContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  textButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  createAccountText: {
    color: Colours.myWhite,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 20,
  },
  buttonIcon: {
    color: Colours.myWhite,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 5,
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

    color: Colours.myWhite,
  },

  lanControlButton: {
    color: Colours.myWhite,

    margin: 3,
  },
  resetPWButtonText: {
    color: Colours.myWhite,
    borderWidth: 0,
    margin: 3,
  },
});

export default LoginScreen;
