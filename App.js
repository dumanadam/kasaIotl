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
import {StoreAsyncData, GetAsyncData} from './api/KasaAuthContext';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Secrets} from './api/Secrets';

const App: () => React$Node = () => {
  const [userObj, setUserObj] = React.useState({
    saveUserObj: false,
    authObj: {
      isLoggedIn: false,
      showSplash: true,
    },
  });

  const TabStack = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  React.useEffect(() => {
    // StoreAsyncData('userObj', userObj);
    GetAsyncData('userObj').then(data => {
      console.log('DATA APP useffect ++++++', data);
      console.log('userObj APP useffect ++++++', userObj);
      data.isLoggedIn
        ? setTimeout(() => {
            console.log('APP useffect true', userObj);
            setUserObj({
              ...userObj,
              saveUserObj: true,
              authObj: {
                ...userObj.authObj,
                showSplash: false,
                isLoggedIn: true,
              },
            });
          }, 500)
        : setTimeout(() => {
            console.log('APP useffect false', userObj);
            setUserObj({
              ...userObj,
              saveUserObj: true,
              authObj: {
                ...userObj.authObj,
                showSplash: false,
                isLoggedIn: false,
              },
            });

            console.log('app.js----', userObj);
          }, 500);
    });
  }, []);

  React.useEffect(() => {
    if (userObj.saveUserObj) {
      StoreAsyncData('userObj', userObj.authObj);
      setUserObj({
        ...userObj,
        saveUserObj: !userObj.saveUserObj,
      });
      console.log('App useeffect authObj updated', userObj.authObj);
    }
  }, [userObj.authObj]);

  const updateAuthObj = sentAuthObj => {
    console.log('sentAuthObj updateAuthObjTruth ', sentAuthObj);
    setUserObj({
      ...userObj,
      saveUserObj: !userObj.saveUserObj,
      authObj: {...userObj.authObj, ...sentAuthObj},
    });
    console.log('out updateAuthObjTruth ', userObj);
  };
  const updateUserObjTruth = sentUserObject => {
    setUserObj({
      ...userObj,
      ...sentUserObject,
    });
    console.log('out updateUserObjTruth ', authObj);
  };

  const updatedAppUserObject = () => {
    console.log('APP UserObj ', userObj);
    return userObj;
  };
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        console.log('sign userob> ', userObj);
        setUserObj({
          ...userObj,
          authObj: {...userObj.authObj},
        });
      },
      signUp: () => {
        setUserObj({
          ...userObj,

          authObj: {...userObj.authObj, isLoggedIn: true},
        });
      },
      signOut: () => {
        console.log('sign userob> ', userObj);
        setUserObj({
          ...userObj,

          authObj: {...userObj.authObj, isLoggedIn: false},
        });
      },
      updateUserObj: sentAuthObj => {
        updateUserObjTruth(sentAuthObj);
      },
      updateAuthObjTruth: sentAuthObj => {
        updateAuthObj(sentAuthObj);
      },
      asyncAuthObj: sentAuthObj => {
        updasteAuthObj(sentAuthObj);
      },
      getAppUserObj: () => {
        return updatedAppUserObject();
      },
    };
  }, []);

  if (userObj.authObj.showSplash) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userObj.authObj.isLoggedIn == true ? (
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
