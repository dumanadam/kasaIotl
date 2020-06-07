import * as React from 'react';
import {Button, Text, View} from 'react-native';

const ResetPaswordScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Reset Password screen</Text>
      <Button
        title="goto gogls"
        onPress={() => {
          navigation.push('LoginScreen');
        }}
      />
    </View>
  );
};

export default ResetPaswordScreen;
