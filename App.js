import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/loginScreen';
import {AuthContext, MyTPContext, IotlStrings} from './api/context';
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
  const [userObj, setUserObj] = React.useState(Secrets.authObj);

  const [authObj, setAuthObj] = React.useState({
    authName: '',
    authPass: '',
    authToken: '',
    authUUID: '',
    authDeviceList: {},
    isLoggedIn: false,
    keyError: false,
    isLoading: false,
    authStyle: 'demo',
    saveAuthObj: false,
    showAlert: false,
    kasaObj: {},
    deviceInfo: [],
    authDeviceList: [],
    noDevicesKasa: true,
    tokenExpired: true,
    isPolling: false,
    pollTime: 10000,
    showSplash: true,
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
    getAsyncDatad();
  }, []);

  const getAsyncDatad = async () => {
    console.log('entered');
    const returnedAsyncUserData = await getAsyncData(Secrets.userObjKey);
    const returnedAsyncAuthData = await getAsyncData(Secrets.authObjKey);

    returnedAsyncAuthData.isLoggedIn
      ? setTimeout(() => {
          console.log('APP KEYCHECK TRUE');

          setUserObj({
            ...returnedAsyncUserData,
          });
          setAuthObj({
            ...returnedAsyncAuthData,
            showSplash: false,
            isLoggedIn: true,
          });
        }, 500)
      : setTimeout(() => {
          console.log('APP KEYCHECK FALSE ');

          setAuthObj({
            ...authObj,
            showSplash: false,
            isLoggedIn: false,
          });
        }, 100);
  };

  React.useEffect(() => {
    if (authObj.saveAuthObj) {
      setAuthObj({
        ...authObj,
        saveAuthObj: false,
      });
      storeAsyncData(Secrets.authObjKey, authObj);
    }
  }, [authObj.saveAuthObj]);

  React.useEffect(() => {
    if (userObj.saveUserObj) {
      storeAsyncData(Secrets.userObjKey, userObj);
    }
  }, [userObj]);

  const updateAuthObj = sentAuthObj => {
    setAuthObj({
      ...sentAuthObj,
      saveAuthObj: !authObj.saveAuthObj,
    });
    //    console.log('updating APP AUTH obj ');
  };
  const updateUserObj = sentUserObject => {
    console.log('sentuserobj USER TRUTH');
    setUserObj({
      ...sentUserObject,
      saveUserObj: !userObj.saveUserObj,
    });
    console.log(
      'updating APP USER obj ',
      JSON.stringify({
        ...sentUserObject,
        saveUserObj: !sentUserObj.saveUserObj,
      }),
    );
  };

  const updatedAppUserObject = from => {
    return userObj;
  };

  const updatedAppAuthObject = from => {
    //console.log(`Sending AUTHOBJ from APP>>>>>  from ${from} }`);
    return authObj;
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
      updateUserObjTruth: sentAuthObj => {
        updateUserObj(sentAuthObj);
      },
      updateAuthObjTruth: sentAuthObj => {
        updateAuthObj(sentAuthObj);
      },
      getAppUserObj: from => {
        return updatedAppUserObject(from);
      },
      getAppAuthObj: from => {
        return updatedAppAuthObject(from);
      },
    };
  }, [authObj]);

  const contextStrings = React.useContext(IotlStrings);

  if (authObj.showSplash) {
    return <SplashScreen />;
  }

  const testLog = () => {
    console.log('APP Context console log');
  };

  const testLogin = async () => {
    console.log('test async login');
    return 'success';
  };

  const tedstnoasync = () => {
    console.log('test noasync login');
    let asd = 'test noasync';
    return asd;
  };

  const testObject = {
    testlog: () => {
      testLog();
    },
    testValue: 'app value ',
    testLogin: () => {
      testLogin;
    },
    testnoasync: () => {
      tedstnoasync;
    },
  };

  return (
    <MyTPContext.Provider value={contextStrings}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {authObj.isLoggedIn == true ? (
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
                  borderColor: 'transparent',
                  position: 'absolute',
                  height: 37,
                },
                labelStyle: {
                  fontWeight: '700',
                  marginBottom: 3,
                  marginTop: 7,
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
                initialParams={{title: 'Adjust your Light'}}
                options={{title: 'Adjust', headerTitleAlign: 'center'}}
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
    </MyTPContext.Provider>
  );
};

export default App;
