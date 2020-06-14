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
import {storeAsyncData, getAsyncData} from './api/KasaAuthFunctions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

  const TabContainerStack = createStackNavigator();
  const TabStack = createBottomTabNavigator();
  const AuthStack = createStackNavigator();

  const headerStyle = {
    headerStyle: {
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#455221',
      headerTransparent: true,
    },
  };

  React.useEffect(() => {
    // storeAsyncData('userObj', userObj);
    getAsyncData('userObj').then(data => {
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
      storeAsyncData('userObj', userObj.authObj);
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
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'AdjustStack') {
                  iconName = focused
                    ? 'arrow-down-bold-circle-outline'
                    : 'arrow-right-bold-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'information' : 'information-variant';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            initialParams={{title: 'assssdasd'}}
            initialRouteName="AdjustStack"
            tabBarOptions={{
              activeTintColor: 'white',
              inactiveTintColor: '#154159',
              activeBackgroundColor: 'transparent',
              headerTintColor: 'red',
              inactiveBackgroundColor: 'transparent',
              style: {
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                position: 'absolute',
              },
              labelStyle: {
                fontWeight: '700',
              },
            }}>
            <TabStack.Screen
              name="PresetStack"
              component={PresetStack}
              initialParams={{...headerStyle}}
            />
            <TabStack.Screen
              name="AdjustStack"
              component={AdjustStack}
              initialParams={{title: 'asdasd'}}
              options={{title: 'Preaaasets', headerTitleAlign: 'center'}}
            />
            <TabStack.Screen
              name="TimerStack"
              component={TimerStack}
              options={{title: 'Timer'}}
            />
            <TabStack.Screen
              name="SettingsStack"
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
