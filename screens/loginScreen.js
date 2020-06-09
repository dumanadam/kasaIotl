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

const LoginScreen = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [showbg, setshowbg] = React.useState(true);
  const [refreshScreen, setrefreshScreen] = React.useState(false);
  const [isOptions, setisOptions] = React.useState(false);
  const [isInputEditable, setIsInputEditable] = React.useState(true);
  const [isRemember, setIsRemember] = React.useState(true);
  const [isDemoUser, setIsDemoUser] = React.useState(false);
  const [isDemoUserChecked, setIsDemoUserChecked] = React.useState(false);
  const [isUserNameFocused, setIsUserNameFocused] = React.useState(false);
  const [optionsColour, setOptionsColour] = React.useState(Colours.myYellow);
  const [optionsChevron, setOptionsChevron] = React.useState('chevron-up');
  const [userName, setUserName] = React.useState(Secrets.defaultUsername);
  const [userNamePlaceholder, setUserNamePlaceholder] = React.useState(
    IotlStrings.userNamePlaceholder,
  );

  const [isloading, setIsloading] = React.useState(false);
  const [userPassword, setUserPass] = React.useState(
    IotlStrings.userPassPlaceholder,
  );
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
    setTimeout(() => {}, 500);
  }, [refreshScreen]);

  const checkAuth = () => {
    Vibration.vibrate([50, 50, 50, 50, 50, 50]);
    if (
      userName == IotlStrings.userNamePlaceholder ||
      userPassword == IotlStrings.userPassPlaceholder
    ) {
      setUserNameError(Errors.usernameDefaultError);
      setUserPassError(Errors.userPassDefaultError);
      setTimeout(() => {
        setUserNameError('');
        setUserPassError('');
      }, 1500);
      return;
    }
    setIsloading(!isloading);
    console.log(`user:>${userName}`);
    console.log(`pass:>${userPassword}`);
    signIn();
  };

  const optionsClicked = () => {
    setisOptions(!isOptions);
    isOptions
      ? setOptionsChevron('chevron-up')
      : setOptionsChevron('chevron-down');
    isOptions
      ? setOptionsColour(Colours.myYellow)
      : setOptionsColour(Colours.myWhite);
  };

  const checkDemoUserClicked = () => {
    isDemoUser
      ? setUserNamePlaceholder(IotlStrings.userNamePlaceholder)
      : setUserNamePlaceholder(Secrets.demoUserName);
    setIsDemoUser(!isDemoUser);
    setIsInputEditable(!isInputEditable);
  };

  const rememberClicked = () => {
    setIsRemember(!isRemember);
    console.log(`demo ${isDemoUser} check${isDemoUserChecked}`);
  };

  const UserNameFocused = () => {
    setrefreshScreen(!refreshScreen);
    if (isDemoUser) setIsDemoUser(!isDemoUser);
    if (errorMessage !== '') setUserNameError('null');
    setUserNamePlaceholder(IotlStrings.userNamePlaceholder);
    console.log(`isdemofocused${isDemoUser}`);
    setshowbg(false);
  };

  const UserNameBlur = () => {
    if (isDemoUser) setIsDemoUser(!isDemoUser);
    setUserNamePlaceholder(IotlStrings.userNamePlaceholder);
    console.log(`isdemofocused${isDemoUser}`);
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

  const setPUserName = name => {
    Secrets.kasaUserName = name;
    setUserName(name);

    console.log('nam234', userName);
  };
  const setPUserPass = pass => {
    Secrets.authPassword = pass;

    console.log('rem pass', Secrets.authPassword);
  };

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
            <View style={{width: '100%'}}>
              <Input
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder={userNamePlaceholder}
                placeholderTextColor={
                  isDemoUser ? Colours.myWhite : Colours.myDrkBlue
                }
                onChangeText={text => setPUserName(text)}
                inputStyle={isDemoUser ? styles.inputDemo : styles.input}
                onFocus={() => UserNameFocused()}
                onFocus={() => UserNameBlur()}
                editable={isInputEditable}
                leftIcon={
                  <Icon
                    name="account-outline"
                    size={25}
                    color={Colours.myWhite}
                  />
                }
                errorStyle={{color: Colours.myYellow}}
                errorMessage={userNameError}
              />
              <Input
                secureTextEntry={true}
                editable={isInputEditable}
                placeholder={
                  isDemoUser
                    ? IotlStrings.demoPasswordPlaceholder
                    : userPassword
                }
                placeholderTextColor={
                  isDemoUser ? Colours.myWhite : Colours.myDrkBlue
                }
                inputStyle={isDemoUser ? styles.inputDemo : styles.input}
                onChangeText={text => setPUserPass(text)}
                leftIcon={
                  <Icon name="lock-outline" size={25} color={Colours.myWhite} />
                }
                errorStyle={{color: Colours.myYellow}}
                errorMessage={userPassError}
              />

              <Button {...loginButtonProps} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <KeyboardAvoidingView behavior={'padding'}>
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
                  checked={isDemoUser}
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
      </KeyboardAvoidingView>
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
    width: 260,
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
