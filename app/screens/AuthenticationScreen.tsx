import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

class AuthenticationScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }

  private loginAnonymous(): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .signInAnonymously()
      .then((userCredentials) => userCredentials)
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
        return error;
      });
  }

  private loginEmailPassword(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => user)
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
        return error;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('AUTHENTICATION_SCREEN.LOGIN.TITLE')}</Text>
        <Button
          title="Log in anonymously"
          onPress={() => this.loginAnonymous()}
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
