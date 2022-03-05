import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DataContext from '../../context/DataContext';

function MyBusinessScreen({navigation}) {
  const {
    user,
    cartItems,
    userData,
    productStatus,
    companyName,
    url,
    api,
    products,
    addToCart,
    brands,
    font_desc,
    fonts,
  } = React.useContext(DataContext);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          height: '8%',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              // width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: '#fff',
                left: 15,
                fontSize: 18,
              }}>
              My Business
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DailySales');
          }}
          style={{
            height: '15%',
            width: '80%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '40%',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: '70%', width: '70%'}}
              resizeMode="contain"
              source={require('../../assests/icons/dailysales.png')}
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '60%',
              //   backgroundColor: 'green',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, fontFamily: fonts.BOLD}}>
              Daily Sales
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '15%',
            width: '80%',
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginTop: 30,
            elevation: 3,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '40%',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: '80%', width: '80%'}}
              resizeMode="contain"
              source={require('../../assests/icons/franchiseupgrade.png')}
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '60%',
              //   backgroundColor: 'green',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 20, fontFamily: fonts.BOLD}}>
              Franchise
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MyBusinessScreen;
