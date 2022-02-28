import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

function SplashScreen({navigation}) {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);
  console.log(timer);

  if (timer === 0) {
    navigation.navigate('Home');
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{height: 200, width: 200}}
        source={require('../../../src/assests/extras/ala_logo.png')}
      />
    </View>
  );
}

export default SplashScreen;
