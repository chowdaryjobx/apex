import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Share from 'react-native-share';
import NetInfo from '@react-native-community/netinfo';
import DataContext from '../../context/DataContext';

function MyOrders({navigation}) {
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

  const [myorders, setMyOrders] = useState([
    {
      id: 1,
      title: 'Sceptre 24" Professional Thin 75Hz 1080p',
      img: 'https://m.media-amazon.com/images/I/71rXSVqET9L._AC_UL320_.jpg',
      status: 'Arriving',
      deliveryDate: '25-02-2022',
      cancelledDate: '',
      orderno: 'ALA123456789',
    },
    {
      id: 2,
      title: 'Seagate Portable 2TB External Hard Drive',
      img: 'https://m.media-amazon.com/images/I/81tjLksKixL._AC_UL320_.jpg',
      status: 'Cancelled',
      deliveryDate: '',
      cancelledDate: '25-02-2022',
      orderno: 'ALA123456788',
    },
    {
      id: 3,
      title: 'Logitech C920x HD Pro Webcam',
      img: 'https://m.media-amazon.com/images/I/71iNwni9TsL._AC_UL320_.jpg',
      status: 'Delivered',
      deliveryDate: '25-02-2022',
      cancelledDate: '',
      orderno: 'ALA123456787',
    },
    {
      id: 4,
      title: 'Logitech MK270 Wireless Keyboard and Mouse',
      img: 'https://m.media-amazon.com/images/I/61pUul1oDlL._AC_UL320_.jpg',
      status: 'Cancelled',
      deliveryDate: '',
      cancelledDate: '25-02-2022',
      orderno: 'ALA123456786',
    },
    {
      id: 5,
      title: 'Original HP 67 Black/Tri-color Ink Cartridges',
      img: 'https://m.media-amazon.com/images/I/71ic26eWeLL._AC_UL320_.jpg',
      status: 'Delivered',
      deliveryDate: '23-02-2022',
      cancelledDate: '',
      orderno: 'ALA123456785',
    },
  ]);

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
          <View>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: '#fff',
                left: 15,
                fontSize: 18,
              }}>
              My Orders
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
          paddingHorizontal: 20,
        }}>
        {myorders.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OrderDetails', {item});
              }}
              key={i}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <View
                style={{
                  width: '30%',
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '80%', width: '80%'}}
                  source={{uri: item.img}}
                />
              </View>
              <View
                style={{
                  width: '60%',
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: item.status === 'Arriving' ? 'green' : '#000',
                    fontFamily: fonts.SEMIBOLD,
                  }}>
                  {item.title}
                </Text>
                {item.status === 'Delivered' ? (
                  <Text
                    style={{
                      color: item.status === 'Arriving' ? 'green' : '#B7B7B7',
                      fontFamily: fonts.SEMIBOLD,
                      top: 10,
                    }}>
                    Delivered on {item.deliveryDate}
                  </Text>
                ) : item.status === 'Arriving' ? (
                  <Text
                    style={{
                      color: item.status === 'Arriving' ? 'green' : '#000',
                      fontFamily: fonts.SEMIBOLD,
                    }}>
                    Arriving on {item.deliveryDate}
                  </Text>
                ) : item.status === 'Cancelled' ? (
                  <>
                    <Text
                      style={{
                        color: item.status === 'Arriving' ? 'green' : '#000',
                        fontFamily: fonts.REGULAR,
                        color: '#B7B7B7',
                        top: 10,
                      }}>
                      Cancelled on {item.cancelledDate}
                    </Text>
                  </>
                ) : null}
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Entypo name="chevron-small-right" size={25} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default MyOrders;
