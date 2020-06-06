import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdjustScreen from '../screens/AdjustScreen';

const AdjustStack = props => {
  const AdjustStack = createStackNavigator();
  return (
    <AdjustStack.Navigator>
      <AdjustStack.Screen name="Presets" component={AdjustScreen} />
    </AdjustStack.Navigator>
  );
};

export default AdjustStack;
