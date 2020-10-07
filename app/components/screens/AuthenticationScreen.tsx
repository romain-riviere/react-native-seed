import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import I18n from 'react-native-i18n';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import {showToast} from '../../helpers/ToastHelper';
import {AuthContext, AuthService} from '../../contexts/AuthContext';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import KeyboardListener from '../../helpers/KeyboardListener';

interface State {
  isSignIn: boolean;
  keyboardOpen: boolean;
  user: FirebaseAuthTypes.User | null;
}
interface Props {}

class AuthenticationScreen extends React.Component<Props, State> {
  static contextType = AuthContext;
  private authService!: AuthService;
  private componentIsMounted: boolean = false;

  constructor(props: Props) {
    super(props);
    this.state = {isSignIn: true, user: null, keyboardOpen: false};
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

  private _onPressSignInAnonymous = async () => {
    this.authService
      .signInAnonymous()
      .then((userCredential: FirebaseAuthTypes.UserCredential) => {
        showToast('You are connected anonymously!', 'success');
        return userCredential;
      })
      .catch((err: any) => {
        if (err.code === 'auth/operation-not-allowed') {
          console.error(err);
          showToast('Anonymous signing is not allowed in firebase.', 'error');
        }
        return err;
      });
  };

  private _onPressToggleMode = async () => {
    this.setState((prevState) => ({
      isSignIn: !prevState.isSignIn,
    }));
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          {this.state.isSignIn ? <SignInForm /> : <SignUpForm />}
          {!this.state.keyboardOpen ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={this._onPressToggleMode}>
                <Text>
                  {I18n.t(
                    this.state.isSignIn
                      ? 'AUTHENTICATION_SCREEN.TO_SIGNUP'
                      : 'AUTHENTICATION_SCREEN.TO_SIGNIN',
                  )}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={this._onPressSignInAnonymous}>
                <Text>
                  {I18n.t('AUTHENTICATION_SCREEN.SIGNIN_ANONYMOUSLY')}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>
        <KeyboardListener
          onDidShow={() => this.setState({keyboardOpen: true})}
          onDidHide={() => this.setState({keyboardOpen: false})}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingBottom: 20,
  },
});

export default AuthenticationScreen;
