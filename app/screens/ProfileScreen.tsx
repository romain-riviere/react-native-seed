import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';
import auth from '@react-native-firebase/auth';

class ProfileScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  private logout(): Promise<void> {
    return auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('PROFILE_SCREEN.TITLE')}</Text>
        <Button title="Log out" onPress={() => this.logout()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
