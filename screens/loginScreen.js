import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/bg.gif')}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={'padding'}>
            <View style={styles.logo} />
            <View style={styles.BoxArea}>
              <View style={styles.loginArea}>
                <Image
                  source={require('../assets/images/bulb.gif')}
                  style={styles.imgLogo}
                />
                <Text style={styles.loginAreaTitle}>NIT3002</Text>
                <LoginForm />
              </View>

              <View style={styles.signUpArea}>
                <TouchableOpacity>
                  <Text style={styles.suText}>Create an account</Text>
                  <Text style={styles.suText}>Lan control</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  BoxArea: {
    backgroundColor: '#F68F00',
    padding: 20,
    borderRadius: 5,
    elevation: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
  suDescription: {
    color: '#DBE2E5',
    alignSelf: 'center',
  },
  suText: {
    color: '#DBE2E5',
    alignSelf: 'center',
  },
});
