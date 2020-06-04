import * as React from 'react';
import {Button, Text, View} from 'react-native';

const CreateAccountScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>CreateAccount screen</Text>
      <Button
        title="goto gogls"
        onPress={() => {
          navigation.push('SignIn');
        }}
      />
    </View>
  );
};

export default CreateAccountScreen;
