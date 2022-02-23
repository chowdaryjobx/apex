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
                paddingLeft: 10,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image
                style={{height: 20, width: 30}}
                resizeMode="stretch"
                source={require('../../assests/tabscreenimages/wallet.png')}
              /> */}
              <Entypo name="wallet" size={25} color="#000" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text>{wallet ? wallet.Commission : null}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 10,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="bank" size={25} color="#000" />
              {/* <Image
                style={{height: 20, width: 30}}
                resizeMode="stretch"
                source={require('../../assests/tabscreenimages/mybank1.png')}
              /> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text> {wallet ? wallet.MyBank : null}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 10,
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
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('AtAGlance', {type: 'A'});
              }}
              style={{
                height: '80%',
                width: 100,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="alpha" size={40} color="#000" />
                </View>
                <View style={{width: '60%', height: '100%'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{fontSize: 12}}>
                        {business ? business.ATeamCount : null}F
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 12}}>
                        {business ? business.ATeamBusiness : null} SC
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 10,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="beta" size={30} color="#000" />
              <Text style={{fontSize: 12}}>
                S : {business ? business.BTeamBusiness : null}
              </Text>
      
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WalletReport', {type: 'MYBANK'});
              }}
              style={{
                paddingLeft: 10,
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
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('AtAGlance', {type: 'B'});
              }}
              style={{
                height: '80%',
                width: 100,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
              }}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={{
                    width: '40%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons name="beta" size={40} color="#000" />
                </View>
                <View style={{width: '60%', height: '100%'}}>
                  <View style={{flex: 1, marginRight: 5}}>
                    <View
                      style={{
                        flex: 1,
                        borderBottomWidth: 1,
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {business ? business.ATeamCount : null}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{fontSize: 12}}>
                        {' '}
                        {business ? business.ATeamBusiness : null} SC
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                alert('Your Earnings');
              }}
              style={{
                paddingLeft: 10,
                height: '80%',
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginRight: (WIDTH * 15) / 100,
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
                <Text> {wallet ? wallet.MyBank : null}</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View
          style={{
            height: '100%',
            width: '15%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: '#fff',
            // opacity: 1,
            alignSelf: 'flex-end',
            // marginLeft: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              user
                ? navigation.navigate('Profile')
                : navigation.navigate('MenuScreen');
            }}>
            <MaterialCommunityIcons name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/*================ Header  ================= */}
      <StatusBar backgroundColor="#35CBC4" />
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          height: 0.08 * SIZES.height,
          width: SIZES.width,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
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
                // user
                //   ? navigation.navigate('Profile')
                //   : navigation.navigate('MenuScreen');
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            <View
              style={{
                height: 0.065 * SIZES.height,
                width: 0.065 * SIZES.height,
                borderRadius: (0.065 * SIZES.height) / 2,
                backgroundColor: COLORS.white,
                justifyContent: 'center',
                alignItems: 'center',
                // marginLeft: 10,
                // flexDirection: 'row',
              }}>
              <Image
                source={require('../../assests/extras/ala_logo.png')}
                style={{
                  height: 0.065 * SIZES.height,
                  width: 0.065 * SIZES.height,
                  borderRadius: 0.065 * SIZES.height,
                }}
              />
            </View>

            {user ? (
              <View>
                <Text style={{marginLeft: 10, color: '#fff', fontSize: 12}}>
                  Welcome
                </Text>
                <Text style={{marginLeft: 10, color: '#fff', fontSize: 18}}>
                  Ramesh
                </Text>
              </View>
            ) : null}
          </View>
          <View>
            {user ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '100%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                  style={{flexDirection: 'row', left: -20}}>
                  <EvilIcons name="cart" size={35} color="#fff" />
                  <View style={{position: 'absolute', left: 20, top: -10}}>
                    <Badge value={cartItems.length} status="success" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('hello');
                  }}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={30}
                    color="#fff"
                  />
                  <Text style={{fontSize: 13, color: '#fff'}}>My Group</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('notification');
                  }}
                  style={{flexDirection: 'row'}}>
                  <EvilIcons name="bell" size={35} color="#fff" />
                  <View style={{position: 'absolute', left: 20, top: -10}}>
                    <Badge value="3" status="success" />
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 10,
          height: '8%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          style={{
            height: '75%',
            width: '90%',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 50,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 12}}>Search here</Text>
        </TouchableOpacity>
      </View>
      {/*================End Of Header  ================= */}
      {/* <View  > */}
      <View
        style={{flex: 1, marginTop: 5, padding: 10, backgroundColor: '#fff'}}>
        <Text style={{fontSize: 14}}>{name}</Text>

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
                  borderColor: '#ccc',
                  padding: 10,
                }}>
                <View style={{width: '30%', paddingVertical: 10}}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderWidth: 1,
                      borderRadius: 15,
                      borderColor: '#ccc',
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '100%', width: '100%'}}
                      resizeMode="stretch"
                      source={item.img}
                    />
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
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginTop: 10,
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#fff',
                            fontFamily: 'Poppins-Medium',
                          }}>
                          View
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={{width: '70%', height: 100, padding: 10}}>
                  <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                    {item.title}
                  </Text>
                  <Text>{description}</Text>

                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <FontAwesome5
                      name="rupee-sign"
                      size={13}
                      color="#F05935"
                      style={{marginTop: 5}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#F05935',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {' '}
                      1000{' '}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
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
