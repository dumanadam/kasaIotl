import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  IotlStrings,
  IotlGlobals,
  AuthContext,
  Colours,
  Errors,
} from '../api/context';
import {Tooltip, Text} from 'react-native-elements';

const HeaderLeft = props => {
  const kasaSettings = props.kasaSettings;
  console.log('Current device status >', kasaSettings);

  const authObj = props.authObj;
  // console.log('Current device status >', kasaSettings.authDeviceList[0]);
  console.log('authobj >', authObj.isLoggedIn);

  return (
    <View style={{flexDirection: 'row'}}>
      {authObj.noDevicesKasa ? (
        <Text
          style={
            !authObj.noDevicesKasa ? styles.headerLeftCon : styles.headerLeftDis
          }>
          {!authObj.noDevicesKasa
            ? IotlStrings.greenDevicesL
            : IotlStrings.noDevicesL}
        </Text>
      ) : (
        <React.Fragment>
          <Tooltip popover={<Text>Wifi Strength of Bulb</Text>}>
            <Text style={styles.headerRSSI}>
              {JSON.stringify(kasaSettings.rssi)}
            </Text>
          </Tooltip>
          <Tooltip
            popover={
              <Text>
                {authObj.authDeviceList[0].status
                  ? 'Bulb Powered ON'
                  : 'Bulb Powered OFF'}
              </Text>
            }>
            <Icon
              style={
                authObj.authDeviceList[0].status
                  ? styles.headerLeftCon
                  : styles.headerLeftDis
              }
              name={
                authObj.authDeviceList[0].status ? 'flash-outline' : 'flash-off'
              }
              disabledStyle={styles.headerLeftDis}
              disabled={true}
              size={25}
              iconStyle={{
                color: Colours.myRedConf,
              }}
            />
          </Tooltip>
          <Tooltip
            popover={
              <Text>
                {authObj.isLoggedIn
                  ? 'Logged into Kasa account'
                  : 'Bulb Powered OFF'}
              </Text>
            }>
            <Icon
              style={
                authObj.isLoggedIn ? styles.headerLeftCon : styles.headerLeftDis
              }
              name={authObj.isLoggedIn ? 'cloud-outline' : 'cloud-off-outline'}
              disabledStyle={styles.headerLeftDis}
              disabled={true}
              size={25}
              iconStyle={{
                color: Colours.myRedConf,
              }}
            />
          </Tooltip>
        </React.Fragment>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  headerRSSI: {
    marginRight: 7,
    fontSize: 10,
    color: Colours.myGreenConf,
    paddingBottom: 20,
  },
  headerRightCon: {
    color: Colours.myGreenConf,
    fontSize: 15,
    marginBottom: 40,
    marginRight: 7,
  },
  headerRightDis: {
    fontSize: 15,
    color: Colours.myRedConf,
    marginBottom: 35,
    marginRight: 7,
  },
  headerTextCon: {
    color: Colours.myWhite,
    marginBottom: 20,
    fontWeight: '700',
  },
  headerTextDis: {
    color: Colours.myRedConf,
    marginBottom: 20,
    fontWeight: '700',
  },
  headerLeftCon: {
    marginBottom: 30,
    marginRight: 7,
    fontSize: 12,
    color: Colours.myGreenConf,
    flex: 0,
  },
  headerLeftDis: {
    marginRight: 7,
    fontSize: 12,
    color: Colours.myRedConf,
    marginBottom: 40,
  },
});
export default HeaderLeft;
