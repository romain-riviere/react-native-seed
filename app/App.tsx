import React, {useEffect, useState} from 'react';
import StackNavigator from './navigators/StackNavigator';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthenticationScreen from './screens/AuthenticationScreen';
import {ToastProvider} from 'react-native-rooster';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  return (
    <ToastProvider>
      user ? <StackNavigator /> : <AuthenticationScreen />
    </ToastProvider>
  );
}

export default App;
