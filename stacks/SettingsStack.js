import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';

const SettingsStack = props => {
  const SettingsStack = createStackNavigator();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Presets" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsStack;
