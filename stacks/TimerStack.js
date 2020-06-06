import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TimerScreen from '../screens/TimerScreen';

const TimerStack = props => {
  const TimerStack = createStackNavigator();
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen name="Timer" component={TimerScreen} />
    </TimerStack.Navigator>
  );
};

export default TimerStack;
