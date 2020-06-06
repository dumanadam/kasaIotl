import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

const PresetScreen = props => {
  console.log('route', props.route);

  return (
    <View>
      <Text>Preset Screen</Text>
    </View>
  );
};

const myButs = StyleSheet.create({
  button: {
    flex: 0,
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default PresetScreen;
