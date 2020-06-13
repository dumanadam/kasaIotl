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

  var userObj = getAppUserObj();
  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          updateAuthObjTruth({
            ...userObj,
            saveUserObj: !userObj.saveUserObj,
            authObj: {...userObj.authObj, isLoggedIn: true, showSplash: false},
          });
        }}
      />
    </View>
  );
};

export default SettingsScreen;
