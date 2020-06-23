import * as React from 'react';
import {Button, Text, View, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <Image
        source={require('../assets/images/iotl.gif')}
        style={{flex: 1, width: 250, height: 250, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default SplashScreen;
