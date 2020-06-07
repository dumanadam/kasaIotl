import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import LoginForm from './LoginForm';
import {IotlStrings} from '../api/context';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.gif')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/bulb.gif')}
              style={styles.imgLogo}
            />
            <Text style={styles.loginAreaTitle}>{IotlStrings.loginTitle}</Text>
            <LoginForm />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.accountContainer}>
              <View style={styles.textButtonContainer}>
                <Icon
                  name="account-plus"
                  color="white"
                  style={styles.buttonIcon}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateAccountScreen')}>
                  <Text style={styles.createAccountButton}>
                    {IotlStrings.createAccountButton}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.textButtonContainer}>
                <Icon
                  name="lock-reset"
                  color="white"
                  style={styles.buttonIcon}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ResetPasswordScreen')}>
                  <Text style={styles.resetPWButtonText}>
                    {IotlStrings.resetPWButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textButtonContainer}>
              <Icon
                name="lan-connect"
                color="white"
                style={styles.buttonIcon}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('LanControlScreen')}>
                <Text style={styles.lanControlButton}>
                  {IotlStrings.lanControlButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  botButton: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BoxArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,

    resizeMode: 'cover',
  },
  imgLogo: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  logo: {alignItems: 'center', justifyContent: 'center'},
  logoDesc: {
    textAlign: 'center',
    color: '#f2f2f2',
  },
  topContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 0,
    flexDirection: 'row',
    padding: 10,

    elevation: 2,
    width: 260,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  accountContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  textButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 10,
  },
  createAccountButton: {
    color: '#DBE2E5',
    flexDirection: 'row',
  },
  buttonIcon: {
    color: '#DBE2E5',
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 3,
  },
  bottomContainerV: {
    flex: 1,
    flexDirection: 'column',

    padding: 10,
  },

  LanContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  lanControlButton: {
    padding: 10,
    backgroundColor: 'transparent',

    margin: 10,
    width: 5,
    flex: 1,
  },
  resetPWButtonText: {
    padding: 10,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  loginAreaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    width: 240,
  },
  signUpArea: {
    alignItems: 'center',
    margin: 15,

    padding: 20,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  lanControlButton: {
    color: '#DBE2E5',

    margin: 3,
  },
  resetPWButtonText: {
    color: '#DBE2E5',
    borderWidth: 0,
    margin: 3,
  },
});

export default LoginScreen;
