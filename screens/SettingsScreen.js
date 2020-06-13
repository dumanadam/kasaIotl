import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../api/context';

const SettingsScreen = ({navigation}) => {
  const {
    signIn,
    signUp,
    signOut,
    updateAuthObjTruth,
    getAppUserObj,
  } = React.useContext(AuthContext);

  var userObdj = {};
  userObdj = {...getAppUserObj()};
  if (userObdj.authObj != null) {
    console.log('settings', userObdj);
    userObdj.authObj = {...userObdj.authObj, showSplash: false};

    /*     userObdj = {
      ...userObdj,
      authObj: {
        ...userObdj.authObj,
        isLoggedIn: false,
        showSplash: false,
      },
    }; */
  }

  console.log('settings screen setting userObdj', userObdj.authObj);
  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          updateAuthObjTruth(userObdj.authObj);
        }}
      />
    </View>
  );
};

export default SettingsScreen;
