import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdjustScreen from '../screens/AdjustScreen';

const AdjustStack = props => {
  const AdjustStack = createStackNavigator();
  // console.log('adjust stack', props);
  return (
    <AdjustStack.Navigator
      // screenOptions={{headerStyle: {backgroundColor: 'transparent'}}}>
      screenOptions={{
        headerShown: false,
      }}>
      <AdjustStack.Screen
        name={props.route.params.title}
        component={AdjustScreen}
        options={{name: 'Adjust'}}
        initialParams={{title: 'asddddasd', name: 'ERTGERG'}}
      />
    </AdjustStack.Navigator>
  );
};

export default AdjustStack;
