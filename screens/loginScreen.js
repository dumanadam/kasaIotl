import * as React from 'react';
import {Button, Text, View, Image} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.formContainerStyle}>
      <TextInput
        label={'Email'}
        autoCapitalize={false}
        keyboardType="email-address"
        style={styles.textInputStyle}
        placeholder="Mail address"
        onChangeText={text => {
          setError;
          setEmail(text);
        }}
        error={isValid}
      />

      <TextInput
        label={'Password'}
        secureTextEntry
        autoCapitalize={false}
        style={styles.textInputStyle}
        selectionColor={blue}
        placeholder="Password"
        error={isValid}
        onChangeText={text => setPassword(text)}
      />
    </View>
  );
};

export default LoginScreen;
