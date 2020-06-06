import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import {IotlStrings, IotlGlobals, AuthContext} from '../api/context';

const LoginForm = () => {
  const passwordInput = useRef(null);
  const {signIn} = React.useContext(AuthContext);

  const checkAuth = () => {
    IotlGlobals.authToken = 'asd';
  };

  return (
    <View>
      <MyTextInput
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="User Name"
      />
      <MyTextInput secureTextEntry={true} placeholder="Password" />

      <TouchableOpacity style={styles.button} onPress={() => signIn()}>
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
    backgroundColor: '#DBE2E5',
  },
  buttonText: {
    color: '#F68F00',
  },
});

export default LoginForm;
