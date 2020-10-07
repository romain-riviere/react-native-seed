import React, {useContext, useEffect} from 'react';
import Root from './Root';
import {AuthContext} from './contexts/AuthContext';
import RNBootSplash from 'react-native-bootsplash';

function App() {
  let authService = useContext(AuthContext);

  let init = async () => {
    // …do multiple async tasks
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 250});
    });
  }, []);

  return (
    <AuthContext.Provider value={authService}>
      <Root />
    </AuthContext.Provider>
  );
}

export default App;
