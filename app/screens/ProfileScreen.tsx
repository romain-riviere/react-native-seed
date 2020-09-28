import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';
import {FirebaseAuthService} from '../services/FirebaseAuthService';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppColors, AppIcons} from '../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProfileScreen extends React.Component {
  public user: FirebaseAuthTypes.User | null = null;
  constructor(props: Readonly<{}>) {
    super(props);
    auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.user?.displayName}</Text>
        <Text>{this.user?.email}</Text>
        <View>
          <Text>
            {I18n.t(
              this.user?.emailVerified
                ? 'PROFILE_SCREEN.EMAIL_VERIFIED'
                : 'PROFILE_SCREEN.EMAIL_NOT_VERIFIED',
            )}
          </Text>
          <Ionicons
            name={
              this.user?.emailVerified
                ? AppIcons.VERIFIED
                : AppIcons.NOT_VERIFIED
            }
            size={25}
            color={
              this.user?.emailVerified ? AppColors.SUCCESS : AppColors.DANGER
            }
          />
        </View>
        {this.user?.emailVerified ? (
          <Button
            title="Send e-mail verification"
            onPress={() => FirebaseAuthService.sendEmailVerification(this.user)}
          />
        ) : null}
        <Button title="Log out" onPress={() => FirebaseAuthService.logout()} />
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
