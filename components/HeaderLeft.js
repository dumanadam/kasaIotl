import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  IotlStrings,
  IotlGlobals,
  AuthContext,
  Colours,
  Errors,
} from '../api/context';

const HeaderLeft = props => {
  const {kasaSettings} = props;
  const authObj = props.authObj;
  // console.log('Current device status >', kasaSettings.authDeviceList[0]);
  console.log('authobj >', kasaSettings.isLoggedIn);
  return (
    <View style={{flexDirection: 'row'}}>
      {kasaSettings.noDevicesKasa ? (
        <Text
          style={
            !kasaSettings.noDevicesKasa
              ? styles.headerLeftCon
              : styles.headerLeftDis
          }>
          {!kasaSettings.noDevicesKasa
            ? IotlStrings.greenDevicesL
            : IotlStrings.noDevicesL}
        </Text>
      ) : (
        <React.Fragment>
          <Text style={styles.headerRSSI}>
            {JSON.stringify(kasaSettings.deviceInfo.rssi)}
          </Text>
          <Icon
            style={
              kasaSettings.authDeviceList[0].status
                ? styles.headerLeftCon
                : styles.headerLeftDis
            }
            name={
              kasaSettings.authDeviceList[0].status
                ? 'flash-outline'
                : 'flash-off'
            }
            size={25}
            iconStyle={{
              color: Colours.myRedConf,
            }}
          />
          <Icon
            style={
              kasaSettings.isLoggedIn
                ? styles.headerLeftCon
                : styles.headerLeftDis
            }
            name={
              kasaSettings.isLoggedIn ? 'cloud-outline' : 'cloud-off-outline'
            }
            size={25}
            iconStyle={{
              color: Colours.myRedConf,
            }}
          />
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
  },
  headerLeftDis: {
    marginRight: 7,
    fontSize: 12,
    color: Colours.myRedConf,
    marginBottom: 40,
  },
});
export default HeaderLeft;
