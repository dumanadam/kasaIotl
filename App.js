import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/loginScreen';
import {AuthContext, IotlGlobals} from './api/context';
import CreateAccountScreen from './screens/createAccountScreen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const [userToken, setUserToken] = React.useState(IotlGlobals.providerToken);

  const Tab = createBottomTabNavigator();
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
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{title: 'Home', headerTitleAlign: 'center'}}
              />
              <Tab.Screen
                name="Search"
                component={SearchStackScreen}
                options={{title: 'Search'}}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{title: 'Settings'}}
              />
            </Tab.Navigator>
          ) : (
            <AuthStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <AuthStack.Screen
                name="SignIn"
                component={LoginScreen}
                options={{
                  title: 'Sign In',
                  animationEnabled: false,
                }}
                initialParams={{asd: 'qwewqe'}}
              />
              <AuthStack.Screen
                name="CreateAccount"
                component={CreateAccountScreen}
                options={{title: 'Create Account'}}
              />
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
