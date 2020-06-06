import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PresetScreen from '../screens/PresetScreen';

const PresetStack = props => {
  const PresetStack = createStackNavigator();

  return (
    <PresetStack.Navigator>
      <PresetStack.Screen name="Presets" component={PresetScreen} />
    </PresetStack.Navigator>
  );
};

export default PresetStack;
