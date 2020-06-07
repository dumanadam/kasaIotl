import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import {IotlStrings, IotlGlobals, AuthContext} from '../api/context';
import {Secrets} from '../assets/Secrets';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginForm = props => {
  const [IsWarningShown, setIsWarningShown] = React.useState(false);
  const [userName, setLUserName] = React.useState(Secrets.authUserName);
  const [userPass, setLUserPass] = React.useState(Secrets.authPassword);
  const [isSpinner, setisSpinner] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);

  console.log('sdsds', props);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log('async storage error', e);
    }
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
    console.log(`username:: ${userName} pass:${userPass}`);
    signIn();
  };

  const setUserName = name => {
    Secrets.authUserName = name;

    console.log('nam234', Secrets.authUserName);
  };
  const setUserPass = pass => {
    Secrets.authPassword = pass;

    console.log('rem pass', Secrets.authPassword);
  };

  return (
    <View style={{width: '100%'}}>
      <MyTextInput
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={userName ? userName : 'Usesdsdr Name'}
        onChangeText={text => setUserName(text)}
        setUserName={setUserName}
        leftIcon={<Icon name="account-outline" size={25} color="#DBE2E5" />}
        {...props}
      />
      <MyTextInput
        secureTextEntry={true}
        placeholder="Password"
        setUserPass={setUserPass}
        onChangeText={text => setUserPass(text)}
        leftIcon={<Icon name="lock-outline" size={25} color="#DBE2E5" />}
        {...props}
      />

      <TouchableOpacity style={styles.button} onPress={() => checkAuth()}>
        <Text style={styles.buttonText}>{IotlStrings.loginTextButton}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: '#DBE2E5',
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginForm;
