import React from 'react';
import StackNavigator from './navigators/StackNavigator';
import AuthenticationScreen from './components/screens/AuthenticationScreen';
import {RootSiblingParent} from 'react-native-root-siblings';
import {AuthContext} from './contexts/AuthContext';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

function Root() {
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);

  const authService = React.useContext(AuthContext);

  authService.onAuthStateChanged((newUser) => {
    setUser(newUser);
  });

  return (
    <RootSiblingParent>
      {user ? <StackNavigator /> : <AuthenticationScreen />}
    </RootSiblingParent>
  );
}

export default Root;
