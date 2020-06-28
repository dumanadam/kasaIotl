import React, {useState, TouchableOpacity} from 'react';
import {Button, Overlay, View, Text, CheckBox} from 'react-native-elements';

const SettingsOverlay = props => {
  const [userObj, setUserObj] = useState({});
  const [visible, setVisible] = useState(props.userObj.isOverlayOpen);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.bottomContainer}>
      {userObj.isOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.firstLineContainer}>
            <CheckBox
              title={IotlStrings.rememberText}
              checked={userObj.isRemember}
              iconType="material-community"
              checkedIcon="checkbox-marked-circle-outline"
              uncheckedIcon="checkbox-blank-circle-outline"
              size={15}
              checkedColor={Colours.myYellow}
              onPress={() => rememberClicked()}
              containerStyle={styles.check}
              textStyle={styles.checkText}
            />
            <CheckBox
              title={IotlStrings.defmoUserText}
              checked={userObj.isDemoUser}
              iconType="material-community"
              checkedIcon="checkbox-marked-circle-outline"
              uncheckedIcon="checkbox-blank-circle-outline"
              size={15}
              checkedColor={Colours.myYellow}
              onPress={() => checkDemoUserClicked()}
              containerStyle={styles.check}
              textStyle={styles.checkText}
            />
          </View>
          <View style={styles.secondLineContainer}>
            <View style={styles.textButtonContainer}>
              <Icon
                name="account-plus"
                color="white"
                style={styles.buttonIcon}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccountScreen')}>
                <Text style={styles.createAccountText}>
                  {IotlStrings.createAccountButton}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.textButtonContainer}>
              <Icon name="lock-reset" color="white" style={styles.buttonIcon} />
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPasswordScreen')}>
                <Text style={styles.resetPWButtonText}>
                  {IotlStrings.resetPWButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.thirdLineContainer}>
            <View style={styles.textButtonContainer}>
              <Icon
                name="account-plus"
                color="white"
                style={styles.buttonIcon}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccountScreen')}>
                <Text style={styles.defaultsText}>
                  {IotlStrings.defaultsButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export default SettingsOverlay;
