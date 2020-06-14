import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const AdjustScreen = props => {
  console.log('adjust screen', props);
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Text style={{color: 'white', flex: 1}}>Adjust Screen</Text>
    </View>
  );
};

export default AdjustScreen;
