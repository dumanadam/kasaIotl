import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../api/context';
import KasaControl from '../api/KasaControl';

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

  const [kasaresult, setkasaresult] = React.useState('defaul');

  const [kasadevices, setkasadevices] = React.useState(null);
  const [kasax, setx] = React.useState(null);
  const [kasapower, setkasapower] = React.useState(null);

  const [authObj, setAuthObj] = React.useState(getAppAuthObj('from settings'));

  React.useEffect(() => {
    console.log('----------Settings ----------');
    console.log('Settings authobj ', JSON.stringify(authObj));

    console.log('----------Settings Exit ----------');
  }, [authObj]);

  const updatepage = async () => {
    const kasa = new KasaControl();
    let kasaSettings = {
      mode: 'normal',
      hue: 150,
      saturation: 80,
      color_temp: 2750,
      brightness: 80,
    };

    await kasa.login('***REMOVED***', '***REMOVED***');
    setkasaresult(kasa);
    devices = await kasa.getDevices();
    setkasadevices(devices);
    // turn off first device
    //tranition 0 - 10000 muilliseconds temp 0 - 7000 hue 0 - 360 brightness 0 - 100
    const power = await kasa.power(devices[0].deviceId, true, 0, kasaSettings);
    console.log('return USER in login from tplink', JSON.stringify(power));
    setkasapower(power);
    //mode, hue, saturation, color_temp, brightness

    const info = await kasa.info('8012146C6839D9D29F024151439E90AE1C724BBA');
    setkasaresult(info);
    console.log('return USER in login from tplink', JSON.stringify(info));

    //    console.log(power);

    //send(authObj.auth);
    //  const st = await allinone.hello();
    //console.log(JSON.stringify(authObj));
    //    const asd = new Chandu();

    /*  const asd = new Chandu();
    await asd.login('***REMOVED***', '***REMOVED***');
    console.log(JSON.stringify(asd));
    const ww = await asd
      .send(JSON.stringify(authObj.kasaObj), {
        'smartlife.iot.smartbulb.lightingservice': {
          transition_light_state: {
            on_off: 0,
            transition_period: 0,
          },
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.error(e)); */
  };

  const sethue = async theobject => {
    const kasa = new KasaControl();
    let kasaSettings = {
      hue: 110,
      saturation: 100,
      brightness: 25,
      color_temp: 0,
    };

    await kasa.login('***REMOVED***', '***REMOVED***');
    setkasaresult(kasa);
    // devices = await kasa.getDevices();

    // turn off first device
    //tranition 0 - 10000 muilliseconds temp 0 - 7000 hue 0 - 360 brightness 0 - 100
    const power = await kasa.power(devices[0].deviceId, true, 0, kasaSettings);
    console.log('return USER in login from tplink', JSON.stringify(power));
    setkasapower(power);

    //mode, hue, saturation, color_temp, brightness

    const info = await kasa.info('8012146C6839D9D29F024151439E90AE1C724BBA');
    setkasaresult(info);
    //console.log('return USER in login from tplink', JSON.stringify(info));

    //    console.log(power);

    //send(authObj.auth);
    //  const st = await allinone.hello();
    //console.log(JSON.stringify(authObj));
    //    const asd = new Chandu();

    /*  const asd = new Chandu();
    await asd.login('***REMOVED***', '***REMOVED***');
    console.log(JSON.stringify(asd));
    const ww = await asd
      .send(JSON.stringify(authObj.kasaObj), {
        'smartlife.iot.smartbulb.lightingservice': {
          transition_light_state: {
            on_off: 0,
            transition_period: 0,
          },
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => console.error(e)); */
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
      <Text style={{fontSize: 9, color: 'red'}}>
        {JSON.stringify(kasaresult.light_state)}
      </Text>
      <Button
        title="login kasacontrol"
        onPress={() => {
          updatepage();
        }}
      />

      <Text style={{fontSize: 9, color: 'red'}}>
        {JSON.stringify(kasadevices)}
      </Text>
      <Button
        title="hue"
        onPress={() => {
          sethue();
        }}
      />
      <Text style={{fontSize: 9, color: 'red'}}>
        {JSON.stringify(kasapower)}
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          logOutSequence();
        }}
      />
      <Text style={{fontSize: 9, color: 'red'}}>
        {JSON.stringify(kasapower)}
      </Text>
    </View>
  );
};

export default SettingsScreen;
