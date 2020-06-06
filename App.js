import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import {AuthContext, IotlGlobals} from './api/context';
import CreateAccountScreen from './screens/CreateAccountScreen';
import PresetStack from './stacks/PresetStack';
import AdjustStack from './stacks/AdjustStack';
import TimerStack from './stacks/TimerStack';
import SettingsStack from './stacks/SettingsStack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const [userToken, setUserToken] = React.useState(false);

  const TabStack = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      console.log('app.js----');
    }, 500);
  }, []);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('nusdsdll');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('nusdsdll');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  if (auth) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text>asd</Text>
        </View>
      </>
    );
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {userToken ? (
            <TabStack.Navigator>
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
              {
                <AuthStack.Screen
                  name="CreateAccountScreen"
                  component={CreateAccountScreen}
                  options={{title: 'Create Account'}}
                />
              }
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

export default App;
