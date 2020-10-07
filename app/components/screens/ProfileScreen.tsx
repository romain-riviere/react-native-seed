import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import I18n from 'react-native-i18n';
import {AppColors, AppIcons} from '../../Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthContext, AuthService} from '../../contexts/AuthContext';

interface State {
  user: FirebaseAuthTypes.User | null;
}
interface Props {}

class ProfileScreen extends React.Component<Props, State> {
  static contextType = AuthContext;
  private authService!: AuthService;
  private componentIsMounted: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {user: null};
  }

  componentDidMount() {
    this.componentIsMounted = true;
    this.authService = this.context;
    this.authService.onAuthStateChanged((newUser) => {
      if (this.componentIsMounted) {
        this.setState({user: newUser});
      }
    });
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  private _onSendEmailVerification = async () => {
    this.authService
      .sendEmailVerification(this.state.user)
      .then(() => console.log('Verification sent!'))
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  private _onSignOut = async () => {
    this.authService
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((error) => {
        console.error(error);
        return error;
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.user?.displayName}</Text>
        <Text>{this.state.user?.email}</Text>
        <View style={styles.row}>
          <Text>
            {I18n.t(
              this.state.user?.emailVerified
                ? 'PROFILE_SCREEN.EMAIL_VERIFIED'
                : 'PROFILE_SCREEN.EMAIL_NOT_VERIFIED',
            )}
          </Text>
          <Ionicons
            name={
              this.state.user?.emailVerified
                ? AppIcons.VERIFIED
                : AppIcons.NOT_VERIFIED
            }
            size={25}
            color={
              this.state.user?.emailVerified
                ? AppColors.SUCCESS
                : AppColors.ERROR
            }
            style={styles.emailStatus}
          />
        </View>
        {!this.state.user?.emailVerified ? (
          <Button
            title="Send e-mail verification"
            onPress={this._onSendEmailVerification}
          />
        ) : null}
        <Button title="Sign out" onPress={this._onSignOut} />
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  emailStatus: {
    marginLeft: 5,
  },
});

export default ProfileScreen;
