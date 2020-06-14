import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {IotlStrings, IotlGlobals, AuthContext} from '../api/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Secrets} from '../api/Secrets';
import {useState} from 'react';

const PresetScreen = route => {
  console.log('presetscreen ', route);
  const [count, setcount] = useState(0);

  const update = () => {
    setcount(count => count + 2);
    route.params = {...route.params, asd: count => setcount(count)};
  };

  return (
    <View>
      <Text>Preset Screen</Text>
      <Text>{count}</Text>
      <Button title="asdd" onPress={update} />
    </View>
  );
};

export default PresetScreen;
