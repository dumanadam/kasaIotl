import React from 'react';
import {View, StyleSheet, Switch, Text} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import {IotlStrings, Colours, AuthContext, IotlGlobals} from '../api/context';
import {Secrets} from '../assets/Secrets';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, CheckBox} from 'react-native-elements';

const LoginForm = props => {
  const [userName, setUserName] = React.useState(Secrets.authUserName);
  const [userNameError, setUserNameError] = React.useState('');

  const [userPass, setUserPass] = React.useState(Secrets.authPassword);
  const [userPassError, setUserPassError] = React.useState('');
  const [isloading, setisloading] = React.useState(false);

  const {signIn} = React.useContext(AuthContext);

  console.log('sdsds', props);

  var loginButtonProps = {
    title: IotlStrings.loginTextButton,
    type: 'outline',
    buttonStyle: styles.button,
    onPress: () => checkAuth(),
    loading: isloading,
  };

  const checkAuth = () => {
    /*  storeData(authUserName, Secrets.authUserName);
    getData(authUserName);
        
 */
    setisloading(true);
    setTimeout(() => {
      console.log(`username:: ${userName} pass:${userPass}`);
      signIn();
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginForm;
