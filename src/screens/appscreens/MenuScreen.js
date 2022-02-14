import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import DataContext from '../../context/DataContext';

function MenuScreen({navigation}) {
  const {companyName} = React.useContext(DataContext);
  const [isNetworkConnected, setIsNetworkConnected] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        if (state.isConnected) {
          setIsNetworkConnected(state.isConnected);
        }
      } else {
        setIsNetworkConnected(false);
      }
    });
    if (isNetworkConnected) {
    } else {
      unsubscribe();
    }
  });

  if (isNetworkConnected === false) {
    navigation.navigate('NetworkError');
  }

  return (
    <View style={{flex: 1}}>
      {/*================ Header  ================= */}
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 0.08 * SIZES.height,
          width: SIZES.width,
        }}>
        <View
          style={{
            paddingVertical: 13,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: COLORS.white, fontSize: 18}}>
              {companyName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RewardPoints');
          }}></TouchableOpacity>
      </LinearGradient>
      {/*================End Of Header  ================= */}

      {/* ==================  Body  ======================= */}

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: '30%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assests/extras/ala_logo.png')}
            style={{height: 100, width: 100}}
          />
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Gabriela Bold',
              color: '#008E46',
            }}>
            {companyName}
          </Text>
        </View>
        <View
          style={{
            height: '13%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={{
              height: '80%',
              width: '85%',
              elevation: 2,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <MaterialCommunityIcons name="login" size={25} />
            </View>
            <View
              style={{height: '100%', width: '60%', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Login</Text>
              <Text style={{fontSize: 14, color: '#9c9c9c'}}>
                Login to your account
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <EvilIcons name="chevron-right" size={25} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: '13%',
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#fff',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={{
              height: '80%',
              width: '85%',
              elevation: 2,
              backgroundColor: '#fff',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#ccc',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="account-plus" size={25} />
            </View>
            <View
              style={{height: '100%', width: '60%', justifyContent: 'center'}}>
              <Text style={{fontSize: 18}}>Register</Text>
              <Text style={{fontSize: 14, color: '#9c9c9c'}}>
                Register for a new account
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <EvilIcons name="chevron-right" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* ====================  End Of Body ===================== */}
    </View>
  );
}

export default MenuScreen;
