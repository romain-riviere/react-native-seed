import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';
import {FirebaseAuthService} from '../services/FirebaseAuthService';

class AuthenticationScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('AUTHENTICATION_SCREEN.LOGIN.TITLE')}</Text>
        <Button
          title="Log in anonymously"
          onPress={() => FirebaseAuthService.loginAnonymous()}
        />
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

export default AuthenticationScreen;
