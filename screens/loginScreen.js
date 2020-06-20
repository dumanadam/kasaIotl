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
import {cos, Value} from 'react-native-reanimated';
import {
  storeAsyncData,
  getAsyncData,
  tplinkLogin,
} from '../api/KasaAuthFunctions';
import AwesomeAlert from 'react-native-awesome-alerts';
import getLatestLightState from '../api/getLatestLightState';
import getDeviceList from '../api/getDeviceList';

const LoginScreen = ({navigation}) => {
  const {login} = require('tplink-cloud-api');
  let returnObj;
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
    userNameError: '',
    userPassError: '',
    showAlert: true,
    errorTitle: ' Default',
    errorMessage: 'Default',
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
    saveUserObj: false,
    optionsChevron: 'chevron-up',
    isloading: false,
    errorMessage: 'Getting settings',
    errorTitle: 'Logging In',
    showProgress: true,
    showConfirm: false,
    showAlert: false,
    closeOut: false,
    closeBack: false,
    showCancel: false,
    confText: 'OK',
    confirmButtonColor: Colours.myYellow,
  });

  const [authObj, setAuthObj] = React.useState(
    getAppAuthObj(' Set Auth for login screen'),
  );

  React.useEffect(() => {
    console.log('authObj', authObj);

    console.log('-------enter LOGIN--------');
    if (authObj.saveAuthObj) {
      updateAuthObjTruth(authObj);
    }
    console.log('-------exit LOGIN--------');
  }, [authObj]);

  React.useEffect(() => {
    if (userObj.saveAuthObj) {
      updateUserObjTruth(userObj);

      console.log(
        'Login USER  updated - sent to app screen',
        JSON.stringify({...userObj}),
      );
    }
  }, [userObj]);

  /*   React.useEffect(() => {
    console.log(
      'usernameerror updated>>>>',
      JSON.stringify(userObj.userNameError),
    );
    setTimeout(() => {
      setUserObj({
        ...userObj,

        userNameError: '',
        userPassError: '',
      });
      return true;
    }, 50);
  }, [userObj.userNameError]); */

  const resolveLoginError = (devices, data, logCheck) => {
    if (logCheck == 'timeout') {
      setUserObj({
        ...userObj,
        isloading: false,
        showAlert: false,
      });
      setAuthObj({
        ...authObj,

        authStyle: 'demo',
        saveAuthObj: true,
        kasaObj: data.kasaObj,
        deviceInfo: {},
        authDeviceList: [],
        isLoading: false,

        noDevicesKasa: true,
        isLoggedIn: false,
      });
    }
  };

  const checkAuth = async () => {
    setUserObj({
      ...userObj,
      isloading: true,
      showAlert: true,
    });

    Vibration.vibrate([50, 50, 50, 50, 50, 50]);

    if (checkPlaceholder()) {
      return;
    }

    if (userObj.isDemoUser) {
      const latestLogin = await tplinkLogin(authObj);
      const devices = await getDeviceList(latestLogin.kasaObj);

      const latestLightState = await getLatestLightState(
        latestLogin.kasaObj,
        devices[0].deviceId,
      );
      if (latestLightState.errorMessage == 'Timeout') {
        console.log(
          '--------------------------------------Login Timeout error',
        );
        setUserObj({
          ...userObj,
          isloading: false,
          showAlert: true,
          errorMessage: 'Connection timed out, please try again',
          errorTitle: 'Network Error',
          showProgress: false,
          showConfirm: true,

          closeOut: true,
          closeBack: true,
          showCancel: false,
          confText: 'OK',
        });
      }
      if (latestLightState.errorMessage == IotlStrings.plug_Offline) {
        console.log('--------------------------------------Plug Offline error');
        setUserObj({
          ...userObj,
          isloading: false,
          showAlert: false,
        });
        setAuthObj({
          ...authObj,
          isLoggedIn: true,
          authStyle: 'demo',

          kasaObj: latestLogin.kasaObj,
          deviceInfo: latestLightState,
          authDeviceList: [devices[0]],
          isLoading: false,
          saveAuthObj: true,
          noDevicesKasa: true,
          appErrorCode: IotlStrings.plug_Offline,
        });
      }
      console.log('--------------------------------------Normal Login');

      setUserObj({
        ...userObj,
        showAlert: true,
        showbg: require('../assets/images/light_lc.jpg'),
        showProgress: false,
        showConfirm: false,
        closeOut: false,
        closeBack: false,
        showCancel: false,
        errorTitle: IotlStrings.is_LoggedInT,
        errorMessage: IotlStrings.is_LoggedInM,
      });

      setAuthObj({
        ...authObj,
        isLoggedIn: true,
        authStyle: 'demo',

        kasaObj: latestLogin.kasaObj,
        deviceInfo: latestLightState,
        authDeviceList: [devices[0]],
        isLoading: false,
        saveAuthObj: true,
        noDevicesKasa: false,
      });
    }
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
      setAuthObj({
        ...authObj,
        authName: Secrets.demoUserName,
        authPass: Secrets.demoPassword,
        authUUID: Secrets.demoUUID,
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
      setAuthObj({
        ...authObj,
        authName: authObj.authName,
        authPass: authObj.authPass,
        authUUID: Secrets.demoUUID,
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

  const setPUserName = name => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log('nam234', userObj.userName);

    if (regexp.test(name)) {
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myGreenConf,
        userName: name,
      });
      setAuthObj({
        ...authObj,
        authName: name,
      });
    } else {
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myRedConf,
        userName: name,
      });
      setAuthObj({
        ...authObj,
        authName: name,
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

  const showError = () => {
    setAuthObj({...authObj, showAlert: !authObj.showAlert});
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
