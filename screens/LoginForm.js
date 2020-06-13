import React from 'react';
import {View, StyleSheet, Switch, Text} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import {IotlStrings, Colours, AuthContext, IotlGlobals} from '../api/context';
import {Secrets} from '../api/Secrets';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, CheckBox} from 'react-native-elements';

const LoginForm = props => {
  const [userName, setUserName] = React.useState(Secrets.authUserName);
  const [userNameError, setUserNameError] = React.useState('');

  const [userPass, setUserPass] = React.useState(Secrets.authPassword);
  const [userPassError, setUserPassError] = React.useState('');
  const [isloading, setisloading] = React.useState(false);
  const [isRemember, setIsRemember] = React.useState(false);
  const [isReset, setisReset] = React.useState(false);
  const [isOptions, setisOptions] = React.useState(true);
  const [optionsColour, setOptionsColour] = React.useState(Colours.myYellow);
  const {signIn} = React.useContext(AuthContext);

  console.log('sdsds', props);

  var loginButtonProps = {
    title: IotlStrings.loginTextButton,
    type: 'outline',
    buttonStyle: styles.button,
    onPress: () => checkAuth(),
    loading: isloading,
  };

  var settingsProps = {
    title: IotlStrings.loginOptionsTextButton,
    type: 'clear',
    buttonStyle: styles.optionsbutton,
    onPress: () => checkAuth(),
    titleStyle: styles.optionsText,
    icon: <Icon name="chevron-down" size={15} color={optionsColour} />,
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log('async storage error', e);
    }
  };

  const checkToggle = value => {
    value == 'remember' ? setIsRemember(!isRemember) : setisReset(!isReset);
  };

  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('thekey???', value);
      }
    } catch (e) {
      console.log('key error ', e);
    }
  };

  const checkAuth = () => {
    /*  storeData(authUserName, Secrets.authUserName);
    getData(authUserName);
        
 */
    setisloading(true);
    setTimeout(() => {
      console.log(`username:: ${userName} pass:${userPass}`);
    }, 150);
  };

  const setPUserName = name => {
    Secrets.authUserName = name;

    console.log('nam234', Secrets.authUserName);
  };
  const setPUserPass = pass => {
    Secrets.authPassword = pass;

    console.log('rem pass', Secrets.authPassword);
  };

  return (
    <View style={{width: '100%'}}>
      <MyTextInput
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={userName ? userName : 'User Name'}
        onChangeText={text => setPUserName(text)}
        setUserName={setPUserName}
        leftIcon={<Icon name="account-outline" size={25} color="#DBE2E5" />}
        errorStyle={{color: 'red'}}
        errorMessage={userNameError}
        {...props}
      />

      <MyTextInput
        secureTextEntry={true}
        placeholder="Password"
        setUserPass={setPUserPass}
        onChangeText={text => setPUserPass(text)}
        leftIcon={<Icon name="lock-outline" size={25} color="#DBE2E5" />}
        errorStyle={{color: 'red'}}
        errorMessage={userPassError}
        {...props}
      />

      <Button {...loginButtonProps} />
      <Button {...settingsProps} />
      {isOptions ? (
        <View style={styles.optionsContainer}>
          <CheckBox
            title="Rememeber"
            checked={isRemember}
            iconType="material-community"
            checkedIcon="checkbox-marked-circle-outline"
            uncheckedIcon="checkbox-blank-circle-outline"
            size={15}
            checkedColor="red"
            onPress={() => checkToggle('remember')}
            containerStyle={styles.check}
            textStyle={styles.checkText}
          />
          <CheckBox
            title="Reset"
            checked={isReset}
            iconType="material-community"
            checkedIcon="checkbox-marked-circle-outline"
            uncheckedIcon="checkbox-blank-circle-outline"
            size={15}
            checkedColor="red"
            onPress={() => checkToggle('reset')}
            containerStyle={styles.check}
            textStyle={styles.checkText}
          />
        </View>
      ) : (
        <Text>false</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  check: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkText: {
    color: '#154159',
  },
  button: {
    borderWidth: 0.3,
    borderColor: '#DBE2E5',
    marginBottom: 30,
    marginTop: 15,
  },
  optionsButton: {
    borderWidth: 0.3,
    borderColor: '#DBE2E5',
    marginBottom: 30,
    marginTop: 15,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 30,
  },
  optionsText: {
    color: '#F68F00',
    fontSize: 10,
  },
});

export default LoginForm;
