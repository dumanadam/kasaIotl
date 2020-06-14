import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PresetScreen from '../screens/PresetScreen';
import {useState} from 'react';

const PresetStack = props => {
  const PresetStack = createStackNavigator();
  const [acount, setacount] = useState(0);

  return (
    <PresetStack.Navigator
      screenOptions={{...props.route.params.headerStyle}}
      screenProps={{asdasd: 'asdasdasdasdad', asdasd: 3424324}}
      params={{asdasd: 'asdasdasdasdad', asdasd: 3424324}}>
      <PresetStack.Screen
        name="Presets"
        component={PresetScreen}
        params={{asdasd: 'asdasdasdasdad', asdasd: 3424324}}
        options={{title: 'Presets', headerTitleAlign: 'center'}}
        initialParams={{
          title: 'hgfhfh',
          name: 'asdd',
          asd: setacount,
          qqqqqqqqq: 'qqqqqqqqqqqqqqqq',
        }}
      />
    </PresetStack.Navigator>
  );
};

export default PresetStack;
