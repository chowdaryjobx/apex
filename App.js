import React from 'react';
import { AuthScreens, AppScreens } from './src/navigator';
import DataContext, { AuthContext } from './src/context/DataContext';

const App = () => {

  // const { user } = React.useContext(DataContext)
  return (
    <AppScreens />
    // user ? <AppScreens /> : <AuthScreens />
  )
}

export default () => {
  return (
    <AuthContext>
      <App />
    </AuthContext>
  );
}