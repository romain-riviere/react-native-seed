import {GoogleSignin} from '@react-native-community/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React from 'react';
import {AppSettings} from '../Constants';
import {showToast} from '../helpers/ToastHelper';

interface UserUpdates {
  profile?: any;
  email?: string;
  password?: string;
  phoneNumber?: FirebaseAuthTypes.AuthCredential;
}

export class AuthService {
  public onAuthStateChanged = (
    callback: FirebaseAuthTypes.AuthListenerCallback,
  ) => auth().onAuthStateChanged(callback);

  public updateUser(user: FirebaseAuthTypes.User, updates: UserUpdates) {
    let promises = [];
    if (updates.profile) {
      promises.push(user.updateProfile(updates.profile));
    }
    if (updates.email) {
      promises.push(user.updateEmail(updates.email));
    }
    if (updates.password) {
      promises.push(user.updatePassword(updates.password));
    }
    return Promise.all(promises).catch((error) => {
      this.handleError(error.code);
      return error;
    });
  }

  public signInAnonymous(): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .signInAnonymously()
      .then((userCredentials) => userCredentials)
      .catch((error) => {
        this.handleError(error.code);
        return error;
      });
  }

  public signUpEmailPassword(
    email: string,
    password: string,
    params?: FirebaseAuthTypes.UpdateProfile,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        if (userCredentials && params) {
          userCredentials.user
            .updateProfile(params)
            .then(() => {
              showToast('User registered!', 'success');
            })
            .catch((error) => {
              this.handleError(error.code);
              return error;
            });
        } else {
          showToast('User registered!', 'success');
        }
        return userCredentials;
      })
      .catch((error) => {
        this.handleError(error.code);
        return error;
      });
  }

  public signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        this.handleError(error.code);
        return error;
      });
  }

  public getCredentialsFromGoogle(): Promise<FirebaseAuthTypes.AuthCredential> {
    return new Promise<FirebaseAuthTypes.AuthCredential>((resolve, reject) => {
      GoogleSignin.configure({
        webClientId: AppSettings.WEB_CLIENT_ID,
        offlineAccess: true,
      });
      GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      }).then((hasPlayServices) => {
        if (hasPlayServices) {
          GoogleSignin.signIn()
            .then((userInfo) => {
              if (userInfo.idToken && userInfo.serverAuthCode) {
                resolve(
                  auth.GoogleAuthProvider.credential(
                    userInfo.idToken,
                    userInfo.serverAuthCode,
                  ),
                );
              } else {
                reject();
              }
            })
            .catch((err) => {
              console.error(err);
              reject();
            });
        } else {
          reject();
        }
      });
    });
  }

  public signInWithCredentials(
    credentials: FirebaseAuthTypes.AuthCredential,
  ): Promise<FirebaseAuthTypes.UserCredential> {
    return auth()
      .signInWithCredential(credentials)
      .then((user) => {
        return user;
      })
      .catch((error) => {
        this.handleError(error.code);
        return error;
      });
  }

  public sendEmailVerification(
    user: FirebaseAuthTypes.User | null,
  ): Promise<void> {
    return user
      ? user
          .sendEmailVerification()
          .then(() => console.log('Verification sent!'))
          .catch((error: any) => {
            this.handleError(error.code);
            return error;
          })
      : Promise.reject('user is null');
  }

  public signOut(): Promise<void> {
    return auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((error) => {
        this.handleError(error.code);
        return error;
      });
  }

  private handleError(errorCode: string) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        showToast('This email address is already in use!', 'error');
        break;
      case 'auth/wrong-password':
        showToast('Wrong password!', 'error');
        break;
      case 'auth/user-not-found':
        showToast('User not found!', 'error');
        break;
      case 'auth/user-disabled':
        showToast('This user is disabled, please contact support', 'error');
        break;
      default:
        break;
    }
  }
}

export const AuthContext = React.createContext(new AuthService());
