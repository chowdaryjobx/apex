import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Animated,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import DataContext from '../../context/DataContext';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import {Rating, RatingProps} from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function ProductScreen({navigation, route}) {
  const brand = route.params.brand;

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('screen');
  const [isNetworkConnected, setIsNetworkConnected] = useState(null);
  const {
    user,
    cartItems,
    userData,
    productStatus,
    companyName,
    api,
    url,
    brands,
    fontfamily,
    fonts,
  } = React.useContext(DataContext);
  const [wallet, setWallet] = useState(null);
  const [business, setBusiness] = useState(null);
  const [name, setName] = useState('Products');

  let description =
    'Contains laxative and carminative actions *Helps in the treatment of constipation and indigestion';

  let arraydata;

  if (brand === 'ala') {
    arraydata = brands[0].products;
  } else if (brand === 'panchyagavya') {
    arraydata = brands[1].products;
  } else if (brand === 'tanza') {
    arraydata = brands[2].products;
  } else if (brand === 'john&frankie') {
    arraydata = brands[3].products;
  }

  const [data, setData] = useState(arraydata);

  let total = 0;
  cartItems.map(item => {
    total += item.quantity * item.price;
  });

  useEffect(() => {
    if (user !== null) {
      let data = {TokenID: user.TokenId};
      axios
        .post(api + url.MyBusiness, data)
        .then(res => {
          if (res.data[0].Status == 'Success') {
            // setErrorMessage(null);
            setBusiness(res.data[0]);
          } else if (res.data[0].Status === 'Failure') {
            if (
              res.data[0].Response === 'Server is busy, please try again later'
            ) {
              navigation.navigate('PayoutTimeError');
            } else {
              // setErrorMessage(res.data[0].Response);
            }
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });

      axios
        .post(api + url.AllWalletBalance, data)
        .then(res => {
          if (res.data[0].Status == 'Success') {
            // setErrorMessage(null);
            setWallet(res.data[0]);
          } else if (res.data[0].Status === 'Failure') {
            if (
              res.data[0].Response === 'Server is busy, please try again later'
            ) {
              navigation.navigate('PayoutTimeError');
            } else {
              // setErrorMessage(res.data[0].Response);
            }
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, [user]);

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

  function truncate(input) {
    if (input.length > 5) {
      return input.substring(0, 70) + '...';
    }
    return input;
  }

  const Footer = () => {
    return (
      <View
        style={{
          elevation: 10,
          height: '8%',
          width: '100%',
          backgroundColor: '#fff', // '#1F5DAB',
          // flexDirection: 'row',
        }}>
        <View style={{height: '100%', width: '100%'}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'COMMISSION'});
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="wallet" size={25} color="#000" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text style={{fontSize: 12}}>
                  {wallet ? wallet.Commission : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="bank" size={25} color="#000" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text style={{fontSize: 12}}>
                  {' '}
                  {wallet ? wallet.MyBank : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="graph" size={30} color="#000" />

              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons name="alpha" size={20} color="#000" />
                <Text style={{fontSize: 12}}>
                  : {business ? business.ATeamBusiness : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SimpleLineIcons name="graph" size={30} color="#000" />
              <View style={{flexDirection: 'row'}}>
                <MaterialCommunityIcons name="beta" size={20} color="#000" />
                <Text style={{fontSize: 12}}>
                  : {business ? business.BTeamBusiness : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('Your Earnings');
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="hand-holding-usd" size={30} color="#000" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text style={{fontSize: 12}}>
                  {' '}
                  {wallet ? wallet.MyBank : null}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={{height: HEIGHT, width: WIDTH, backgroundColor: '#fff'}}>
      {/*================ Header  ================= */}
      <StatusBar backgroundColor="#35CBC4" />
      <View
        style={{
          height: '8%',
          width: '100%',
          flexDirection: 'row',
          // backgroundColor: 'blue',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialCommunityIcons name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <View
          style={{
            height: '75%',
            width: '90%',
            backgroundColor: '#fff',
            marginLeft: 10,
            borderRadius: 50,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Search Here"
            style={{flex: 1, paddingLeft: 20, fontFamily: fonts.MEDIUM}}
          />
        </View>
      </View>

      {/*================End Of Header  ================= */}
      {/* <View  > */}
      <View
        style={{
          flex: 1,
          marginTop: 5,
          padding: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#e4e4e4',
        }}>
        <Text style={{fontSize: 14, fontFamily: fonts.BOLD}}>{name}</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    data,
                  });
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#e4e4e4',
                  padding: 10,
                }}>
                <View style={{width: '30%', paddingVertical: 10}}>
                  <View
                    style={{
                      height: 150,
                      width: '100%',
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '100%', width: '100%'}}
                      resizeMode="contain"
                      source={item.img}
                    />
                  </View>
                </View>
                <View style={{width: '70%', padding: 10}}>
                  <Text
                    style={{
                      fontFamily: fonts.BOLD,
                      color: '#4e4e4e',
                      fontSize: 15,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.MEDIUM,
                      fontSize: 12,
                      marginTop: 5,
                    }}>
                    {description}
                  </Text>

                  <View style={{flexDirection: 'row', top: 8}}>
                    <Rating
                      startingValue={4}
                      type="star"
                      ratingCount={5}
                      imageSize={15}
                      readonly={true}
                      style={{alignSelf: 'flex-start', top: 0}}
                    />
                    <Text style={{left: 5, fontSize: 12}}>(106)</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <FontAwesome5
                        name="rupee-sign"
                        size={13}
                        color="#F05935"
                        style={{marginTop: 6}}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: '#F05935',
                          fontFamily: fonts.BOLD,
                        }}>
                        {' '}
                        1000{' '}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ProductDescription', {
                          data,
                        });
                      }}>
                      <LinearGradient
                        colors={['#35CBC4', '#16ABB1']}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 0.25}}
                        style={{
                          paddingHorizontal: 0,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingVertical: 8,
                          borderRadius: 10,
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: 40,
                            top: -3,
                            fontSize: 15,
                            color: '#fff',
                            fontFamily: fonts.BOLD,
                          }}>
                          View
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {user ? <Footer /> : null}
    </View>
  );
}

export default ProductScreen;
