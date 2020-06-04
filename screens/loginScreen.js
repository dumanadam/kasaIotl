import React, {Component} from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import LoginForm from './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/bg.jpg')}
          style={styles.headBackground}
        />
        <View>
          <KeyboardAvoidingView behavior={'position'}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/images/iotl.gif')}
                style={styles.imgLogo}
              />
            </View>

            <ScrollView>
              <View style={styles.loginArea}>
                <LoginForm />
              </View>
            </ScrollView>
            <View style={styles.signUpArea}>
              <TouchableOpacity>
                <Text style={styles.suText}>Create an account</Text>
                <Text style={styles.suText}>Lan control</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 80,
  },
  headBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 300,
    width: '100%',
  },
  imgLogo: {
    height: 50,
    width: 50,
  },
  logo: {
    alignItems: 'center',
  },
  logoDesc: {
    textAlign: 'center',
    color: '#f2f2f2',
  },
  loginArea: {
    marginHorizontal: 40,
    marginVertical: 40,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    //shadow css leri ios için geçerli elevation android için geçerli
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  loginAreaTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  signUpArea: {
    alignItems: 'center',
  },
  suDescription: {
    color: '#999',
  },
  suText: {
    color: '#666',
  },
});


.GaryAmDesign-1-hex { color: #050F14; }
.GaryAmDesign-2-hex { color: #DBE2E5; }
.GaryAmDesign-3-hex { color: #F68F00; }
.GaryAmDesign-4-hex { color: #154159; }
.GaryAmDesign-5-hex { color: #1A516A; }