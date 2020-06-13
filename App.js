import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import {AuthContext, IotlGlobals, IotlStrings} from './api/context';
import CreateAccountScreen from './screens/CreateAccountScreen';
import PresetStack from './stacks/PresetStack';
import AdjustStack from './stacks/AdjustStack';
import TimerStack from './stacks/TimerStack';
import SettingsStack from './stacks/SettingsStack';
import LanControlScreen from './screens/LanControlScreen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  const [userObj, setUserObj] = React.useState({
    userToken: IotlGlobals.authToken,
    isloading: true,
    showSplash: true,
    authObj: {
      isLoggedin: false,
    },
  });

  const TabStack = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  React.useEffect(() => {
    setTimeout(() => {
      setUserObj({...userObj, showSplash: false});
      console.log('app.js----');
    }, 500);
  }, []);

  React.useEffect(() => {
    console.log('App useeffect authObj updated', userObj.authObj);
  }, [userObj.authObj]);

  const updasteAuthObj = sentAuthObj => {
    setUserObj({
      ...userObj,
      authObj: sentAuthObj,
    });
    console.log('out memo ', authObj);
  };

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserObj({
          ...userObj,

          authObj: {...userObj.authObj, userToken: 'asdas'},
        });
      },
      signUp: () => {
        setUserObj({
          ...userObj,

          authObj: {...userObj.authObj, userToken: 'asdas'},
        });
      },
      signOut: () => {
        setUserObj({
          ...userObj,

          authObj: {...userObj.authObj, userToken: ''},
        });
      },
      updateAuthObj: sentAuthObj => {
        updasteAuthObj(sentAuthObj);
      },
      asyncAuthObj: sentAuthObj => {
        updasteAuthObj(sentAuthObj);
      },
    };
  }, []);

  if (userObj.showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userObj.authObj.isLoggedIn != null ? (
          <TabStack.Navigator
            initialRouteName="Adjust"
            tabBarOptions={{
              activeTintColor: '#e91e63',
            }}>
            <TabStack.Screen
              name="Preset"
              component={PresetStack}
              options={{title: 'Presets', headerTitleAlign: 'center'}}
            />
            <TabStack.Screen
              name="Adjust"
              component={AdjustStack}
              options={{title: 'Adjust'}}
            />
            <TabStack.Screen
              name="Timer"
              component={TimerStack}
              options={{title: 'Timer'}}
            />
            <TabStack.Screen
              name="Settings"
              component={SettingsStack}
              options={{title: 'Settings'}}
            />
          </TabStack.Navigator>
        ) : (
          <AuthStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <AuthStack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                title: 'Sign In',
                animationEnabled: false,
              }}
              initialParams={{asd: 'qwewqe'}}
            />

            <AuthStack.Screen
              name="CreateAccountScreen"
              component={CreateAccountScreen}
              options={{title: 'Create Account'}}
            />
            <AuthStack.Screen
              name="LanControlScreen"
              component={LanControlScreen}
              options={{
                title: 'Lan Control',
                animationEnabled: true,
              }}
              initialParams={{asd: 'qwewqe'}}
            />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
