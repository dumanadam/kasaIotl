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

const LoginScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.gif')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={'padding'}>
          <View style={styles.loginArea}>
            <Image
              source={require('../assets/images/bulb.gif')}
              style={styles.imgLogo}
            />
            <Text style={styles.loginAreaTitle}>{IotlStrings.loginTitle}</Text>
            <LoginForm />
          </View>
          <View style={styles.bottomContainerH}>
            <View style={styles.accountContainer}>
              <View style={styles.createAccountButton}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreateAccountScreen')}>
                  <Text style={styles.createAccountButton}>
                    {IotlStrings.createAccountButton}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.resetPWButtonText}>
                <TouchableOpacity>
                  <Text style={styles.resetPWButtonText}>
                    {' '}
                    {IotlStrings.resetPWButton}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.lanControlButton}>
              <TouchableOpacity>
                <Text style={styles.lanControlButton}>
                  {' '}
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
  bottomContainerH: {
    flex: 0,
    flexDirection: 'row',
    backgroundColor: '#F68F00',
    padding: 10,
    borderRadius: 5,
    elevation: 14,

    margin: 10,
  },
  bottomContainerV: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F68F00',
    padding: 10,
    borderRadius: 5,
    elevation: 14,

    margin: 10,
  },
  accountContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  LanContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  createAccountButton: {
    backgroundColor: '#F68F00',
    padding: 10,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  lanControlButton: {
    backgroundColor: '#F68F00',
    padding: 10,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  resetPWButtonText: {
    backgroundColor: '#F68F00',
    padding: 10,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  loginArea: {
    backgroundColor: '#F68F00',
    padding: 20,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginAreaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  signUpArea: {
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#F68F00',
    padding: 20,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountButton: {
    color: '#DBE2E5',
    borderWidth: 1,
    margin: 3,
  },
  lanControlButton: {
    color: '#DBE2E5',
    borderWidth: 1,
    margin: 3,
  },
  resetPWButtonText: {
    color: '#DBE2E5',
    borderWidth: 0,
    margin: 3,
  },
});

export default LoginScreen;
