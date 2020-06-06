import * as React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../api/context';

const SettingsScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View>
      <Text>Settings Screen</Text>
      <Button
        title="Logout"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default SettingsScreen;
