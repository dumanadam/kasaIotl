import React from 'react';
import SplashScreen from './screens/splashScreen';
import LoginScreen from './screens/loginScreen';

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
  const [auth, setAuth] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      console.log('app.js----');
    }, 500);
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
