import React, {isValidElement} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  Vibration,
} from 'react-native';
import LoginForm from './LoginForm';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, CheckBox, Input} from 'react-native-elements';
import MyTextInput from '../components/MyTextInput';
import {
  IotlStrings,
  Colours,
  AuthContext,
  Errors,
  IotlGlobals,
} from '../api/context';
import {Secrets} from '../assets/Secrets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = ({navigation}) => {
  let userDetails = {
    isEmailValid: true,
    backgroundImage: '../assets/images/light.gif',
  };

  const {signIn} = React.useContext(AuthContext);
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
  });
  const [showbg, setshowbg] = React.useState(true);
  const [refreshScreen, setrefreshScreen] = React.useState(false);
  const [isOptions, setisOptions] = React.useState(false);

  const [isRemember, setIsRemember] = React.useState(true);
  const [isDemoUser, setIsDemoUser] = React.useState(false);
  const [isDemoUserChecked, setIsDemoUserChecked] = React.useState(false);
  const [isUserNameFocused, setIsUserNameFocused] = React.useState(false);
  const [optionsColour, setOptionsColour] = React.useState(Colours.myYellow);
  const [optionsChevron, setOptionsChevron] = React.useState('chevron-up');

  const [isloading, setIsloading] = React.useState(false);

  const [userNameError, setUserNameError] = React.useState('');
  const [userPassError, setUserPassError] = React.useState('');

  let loginButtonProps = {
    title: IotlStrings.loginTextButton,
    type: 'outline',
    buttonStyle: styles.button,
    onPress: () => checkAuth(),
    loading: isloading,
  };

  React.useEffect(() => {
    console.log('isdemo >  ', userObj.isDemoUser);
    setTimeout(() => {}, 500);
  }, [userObj.userName, userObj.isDemoUser]);

  const checkAuth = () => {
    Vibration.vibrate([50, 50, 50, 50, 50, 50]);
    getAllKeys();

    if (isDemoUser) {
      console.log(`user:>${userObj.userName}`);
      console.log(`pass:>${userObj.userPassword}`);
      getAllKeys();
      return;
    }

    if (
      userObj.userName == IotlStrings.userNamePlaceholder ||
      userObj.userPassword == IotlStrings.userPassPlaceholder
    ) {
      console.log(`placeholder`);
      console.log(`user:>${userObj.userName}`);
      console.log(`pass:>${userObj.userPassword}`);
      setUserNameError(Errors.usernameDefaultError);
      setUserPassError(Errors.userPassDefaultError);
      setTimeout(() => {
        setUserNameError('');
        setUserPassError('');
      }, 1500);
      return;
    }

    setIsloading(!isloading);
    console.log(`user:>${userObj.userName}`);
    console.log(`pass:>${userObj.userPassword}`);
    signIn();
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
    }

    console.log(`keys>>  ${keys}`);
  };

  const optionsClicked = () => {
    setisOptions(!isOptions);

    setUserObj({...userObj, isEmailValid: !userObj.isEmailValid});
    isOptions
      ? setOptionsChevron('chevron-up')
      : setOptionsChevron('chevron-down');
    isOptions
      ? setOptionsColour(Colours.myYellow)
      : setOptionsColour(Colours.myWhite);
  };

  const checkDemoUserClicked = () => {
    !userObj.isDemoUser
      ? setUserObj({
          ...userObj,
          userNamePlaceholder: Secrets.demoUserName,
          userPassPlaceholder: IotlStrings.demoPasswordPlaceholder,
          isDemoUser: !userObj.isDemoUser,
          isInputEditable: !userObj.isInputEditable,
          userName: Secrets.demoUserName,
          userPassword: Secrets.demoPassword,
          nameIconColour: Colours.myYellow,
        })
      : setUserObj({
          ...userObj,
          isDemoUser: !userObj.isDemoUser,
          userNamePlaceholder: IotlStrings.userNamePlaceholder,
          userPassPlaceholder: IotlStrings.userPassPlaceholder,
          nameIconColour: Colours.myWhite,
        });

    console.log(`isdemo ? >> ${userObj.isDemoUser}`);
    console.log(`place? >> ${userObj.userNamePlaceholder}`);
    console.log(`pass? >> ${userObj.userPassPlaceholder}`);
  };

  const rememberClicked = () => {
    setIsRemember(!isRemember);
    console.log(`demo ${userObj.isDemoUser} check${isDemoUserChecked}`);
  };

  const UserNameFocused = () => {
    setrefreshScreen(!refreshScreen);
    if (userObj.isDemoUser)
      setUserObj({...userObj, isDemoUser: !userObj.isDemoUser});
    if (errorMessage !== '') setUserNameError('null');
    setUserObj({
      ...userObj,
      userNamePlaceholder: IotlStrings.userNamePlaceholder,
    });
    console.log(`isdemofocused${userObj.isDemoUser}`);
    setshowbg(false);
  };

  const UserNameBlur = () => {
    if (userObj.isDemoUser) setIsDemoUser(!userObj.isDemoUser);
    setUserObj({
      ...userObj,
      userNamePlaceholder: IotlStrings.userNamePlaceholder,
    });
    console.log(`isdemofocused${userObj.isDemoUser}`);
    setshowbg(false);
  };

  const checkAsyncData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        console.log('kasaUserName ok >', value);
        setUserName(value);
      } else {
        setUserNameError('async error');
      }
    } catch (e) {
      console.log('kasaUserName error ', e);
      setUserName('error');
    }
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
        console.log('thevalue???', value);
        return value;
      }
    } catch (e) {
      console.log('key error ', e);
      return 'error';
    }
  };

  function validateEmail(email) {
    return regexp.test(email);
  }

  const setPUserName = name => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log('nam234', userObj.userName);
    console.log('isemailcvalid', regexp.test(name));

    regexp.test(name)
      ? setUserObj({
          ...userObj,
          nameIconColour: Colours.myGreenConf,
          userName: name,
        })
      : setUserObj({
          ...userObj,
          nameIconColour: Colours.myRedConf,
          userName: name,
        });
    if (name == '')
      setUserObj({
        ...userObj,
        nameIconColour: Colours.myWhite,
      });
    //setUserObj({...userObj, isEmailValid: validateEmail(name)});
  };

  const setPUserPass = pass => {
    var regexp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log('pass valid', regexp.test(pass));
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
                  userObj.isDemoUser ? Colours.myWhite : Colours.myDrkBlue
                }
                onChangeText={text => setPUserName(text)}
                inputStyle={
                  userObj.isDemoUser ? styles.inputDemo : styles.input
                }
                /*        onFocus={() => UserNameFocused()}
                onBlur={() => UserNameBlur()} */
                editable={userObj.isInputEditable}
                leftIcon={
                  <Icon
                    name="account-outline"
                    size={25}
                    color={userObj.nameIconColour}
                  />
                }
                errorStyle={{color: Colours.myYellow}}
                errorMessage={userNameError}
              />
              <Input
                secureTextEntry={true}
                editable={userObj.isInputEditable}
                placeholder={userObj.userPassPlaceholder}
                placeholderTextColor={
                  userObj.isDemoUser ? Colours.myWhite : Colours.myDrkBlue
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
                errorMessage={userPassError}
              />

              <Button {...loginButtonProps} />
            </View>
          </View>
        </View>

        <View style={styles.optionsButtonContainer}>
          <TouchableOpacity
            style={styles.optionsRowContainer}
            onPress={() => optionsClicked()}>
            <Icon name={optionsChevron} size={15} color={optionsColour} />
            <Text style={styles.optionsText}>
              {IotlStrings.loginOptionsTextButton}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          {isOptions ? (
            <View style={styles.optionsContainer}>
              <View style={styles.firstLineContainer}>
                <CheckBox
                  title={IotlStrings.rememberText}
                  checked={isRemember}
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
    width: 220,
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
