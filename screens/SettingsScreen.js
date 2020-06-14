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

  const [authObj, setUserObj] = React.useState(getAppUserObj());

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authObj 1', authObj);

    console.log('Settings useeffect authObj updated', authObj);
    console.log('Settings authObj 2', authObj);
    console.log('----------Settings Exit ----------');
  }, []);

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authObj 1', authObj);

    console.log('Settings useeffect authObj updated', authObj);
    console.log('Settings authObj 2', authObj);
    console.log('----------Settings Exit ----------');
  }, [authObj]);

  const updatepage = () => {
    setUserObj({...authObj});
  };

  const logOutSequence = () => {
    console.log('deldeldeldeldeldel', authObj);
    if (authObj != undefined) {
      updateAuthObjTruth({
        ...authObj,
        saveUserObj: true,
        authObj: {
          ...authObj.authObj,
          isLoggedIn: false,
          page: 'settings',
        },
      });
      console.log('authObj underfined');
    } else {
      console.log('authObj logging ourt sequence', authObj);
    }
  };

  return (
    <View>
      <Text style={{fontSize: 30, color: 'red'}}>
        {JSON.stringify(authObj)}
      </Text>
      <Button
        title="update page"
        onPress={() => {
          updatepage();
        }}
      />

      <Button
        title="Logout"
        onPress={() => {
          logOutSequence();
        }}
      />
    </View>
  );
};

export default SettingsScreen;
