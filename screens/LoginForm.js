import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Input from '../components/Input';
import LoginButton from '../components/LoginButton';

export default class LoginForm extends Component {
  render() {
    return (
      <View>
        <Input
          autoCapitalize="none"
          placeholder="User Name"
          returnKeyType={'next'}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <Input
          secureTextEntry={true}
          placeholder="Password"
          inputRef={input => (this.passwordInput = input)}
          returnKeyType={'go'}
        />
        <LoginButton
          color={'#F68F00'}
          backgroundColor={'#1A516A'}
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
