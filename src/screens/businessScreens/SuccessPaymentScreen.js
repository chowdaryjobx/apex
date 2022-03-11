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

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import DataContext from '../../context/DataContext';

function SuccessPaymentScreen({navigation}) {
  const {authUser, user, userData, logOut, api, url} = React.useContext(
    DataContext,
  );
  if (!user) {
    navigation.navigate('Login');
  }

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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View>
            <AntDesign
              name="arrowleft"
              size={20}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Text style={{color: COLORS.white, fontSize: 18}}>Settings</Text>
          </View>
        </View>
      </LinearGradient>
      {/*================End Of Header  ================= */}

      {/* ==================  Body  ======================= */}

      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, color: 'green'}}>
          Payment request added successfully
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PaymentInfo');
          }}
          style={{
            width: '60%',
            marginTop: 20,
            borderWidth: 1,
            borderColor: 'green',
            padding: 10,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'green'}}>Add new payment request</Text>
        </TouchableOpacity>
      </View>
      {/* ====================  End Of Body ===================== */}
    </View>
  );
}

export default SuccessPaymentScreen;
