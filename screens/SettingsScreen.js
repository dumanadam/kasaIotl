import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../api/context';
import {tplinkLogin} from '../api/KasaAuthFunctions';

const SettingsScreen = ({navigation}) => {
  const {
    signIn,
    signUp,
    signOut,
    updateAuthObjTruth,
    updateUserObjTruth,
    getAppUserObj,
    getAppAuthObj,
  } = React.useContext(AuthContext);

  const [userObj, setUserObj] = React.useState({
    settingsScreen: {},
    ...getAppUserObj('from settings start'),
  });

  const [authObj, setAuthObj] = React.useState(getAppAuthObj('from settings'));

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authobj ', JSON.stringify(authObj));

    console.log('----------Settings Exit ----------');
  }, []);

  const updatepage = async () => {
    //   console.log('update page', JSON.stringify(authObj));
    // let tplinkDeviceList = await authObj.getDeviceList();

    //let result = authObj.tplinkObj.getToken();
    /*    result = await tplinkLogin('demo', authObj);
    result2 = result.tplinkObj.getToken(); */
    console.log(
      'tplinkobj from login page through state  >>>=',
      JSON.stringify(authObj.tplinkObj),
    );
    //    console.log('RESULT2>>>=', JSON.stringify(result2));
  };

  const logOutSequence = () => {
    if (authObj == undefined) {
      console.log('authObj underfined');
    } else {
      updateAuthObjTruth({
        ...authObj,
        saveAuthObj: true,
        isLoggedIn: false,
      });
    }
  };

  return (
    <View>
      <Text style={{fontSize: 9, color: 'red'}}>{JSON.stringify(authObj)}</Text>
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
