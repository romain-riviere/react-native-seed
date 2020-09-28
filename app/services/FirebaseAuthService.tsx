import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export class FirebaseAuthService {
  public currentUser: FirebaseAuthTypes.User | null = null;

  constructor() {
    auth().onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  public static loginAnonymous(): Promise<FirebaseAuthTypes.UserCredential> {
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

  public static loginEmailPassword(
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

  public static sendEmailVerification(
    user: FirebaseAuthTypes.User | null,
  ): Promise<void> {
    return user
      ? user
          .sendEmailVerification()
          .then(() => console.log('Verification sent!'))
          .catch((error) => {
            console.error(error);
            return error;
          })
      : Promise.reject('user is null');
  }

  public static logout(): Promise<void> {
    return auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .catch((error) => {
        console.error(error);
        return error;
      });
  }
}
