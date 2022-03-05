import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
function SplashScreen({navigation}) {
  const [animations, setAnimations] = useState(new Animated.Value(HEIGHT));
  const [anim, setAnim] = useState(new Animated.Value(1));
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 500);
    } else if (timer == 0) {
      // setSplashScreen(false);
    }
  }, [timer]);

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.timing(animations, {
      toValue: HEIGHT / 3,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animate1();
    });
  };

  const animate1 = () => {
    Animated.timing(anim, {
      toValue: 1.5,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const trans = {
    transform: [{translateY: animations}, {scale: anim}],
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Animated.View
        style={[
          {
            height: 150,
            width: 150,
            borderRadius: 75,
          },
          trans,
        ]}>
        <Image
          style={{height: 150, width: 150}}
          source={require('../../../src/assests/extras/ala_logo.png')}
        />
        {timer === 0 ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 25,
                marginTop: 20,
                top: 3,
                color: '#1F5DAB',
                fontFamily: 'Amidic-Regular',
              }}>
              ALA
            </Text>
            <Text
              style={{
                fontSize: 22,
                marginTop: 20,
                color: '#000',
                left: 10,
                fontFamily: 'RisingSun-Black',
              }}>
              Market
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}

// <View
//   style={{
//     height: '100%',
//     width: '100%',
//     alignItems: 'center',
//     position: 'absolute',
//     // backgroundColor: 'lightblue',
//   }}>
//   <View style={{flex: 2}}></View>
//   <View style={{flex: 1}}>

//   </View>
// </View>

export default SplashScreen;
