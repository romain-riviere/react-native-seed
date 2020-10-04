import React, {useContext} from 'react';
import Root from './Root';
import {AuthContext} from './contexts/AuthContext';

function App() {
  let authService = useContext(AuthContext);

  return (
    <AuthContext.Provider value={authService}>
      <Root />
    </AuthContext.Provider>
  );
}

export default App;
