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
  const {kasaSettings, authObj} = props;
  //console.log('kasasettings and autobj', kasaSettings);
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
          {' '}
          <Text>{kasaSettings.rssi}</Text>
          <Icon
            style={
              kasaSettings.power ? styles.headerRightCon : styles.headerRightDis
            }
            name={kasaSettings.power ? 'flash-outline' : 'flash-off'}
            disabledStyle={styles.headerLeftDis}
            disabled={true}
            size={25}
            iconStyle={{
              color: Colours.myRedConf,
            }}
          />{' '}
        </React.Fragment>
      )}

      <Icon
        style={
          kasaSettings.isLoggedIn
            ? styles.headerRightCon
            : styles.headerRightDis
        }
        name={kasaSettings.isLoggedIn ? 'cloud-outline' : 'cloud-off-outline'}
        disabledStyle={styles.headerLeftDis}
        disabled={true}
        size={25}
        iconStyle={{
          color: Colours.myRedConf,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
    width: 55,
  },
  headerLeftDis: {
    marginRight: 7,
    fontSize: 12,
    color: Colours.myRedConf,
    marginBottom: 40,
  },
});
export default HeaderLeft;
