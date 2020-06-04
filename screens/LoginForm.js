import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import LoginButton from '../components/LoginButton';

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <MyTextInput
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="User Name"
          returnKeyType={'next'}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <MyTextInput
          secureTextEntry={true}
          placeholder="Password"
          inputRef={input => (this.passwordInput = input)}
          returnKeyType={'go'}
        />
        <LoginButton
          color={'#F68F00'}
          backgroundColor={'#DBE2E5'}
          text={'Login'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginFormTitle: {
    marginBottom: 20,
  },
});
