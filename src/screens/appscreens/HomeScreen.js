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
  StyleSheet,
  Share,
  ToastAndroid,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import DataContext from '../../context/DataContext';

import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import axios from 'axios';

const bag1 = require('../../../assests/images/bag1.jpg');
const bag2 = require('../../../assests/images/bag2.jpg');
const DEVICE_WIDTH = Dimensions.get('window').width;
function HomeScreen({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('screen');
  const [isNetworkConnected, setIsNetworkConnected] = useState(null);
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
    fontfamily,
  } = React.useContext(DataContext);
  const [wallet, setWallet] = useState(null);
  const [business, setBusiness] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  console.log(products);
  const images1 = [
    ' https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Deals_1x._SY304_CB430401028_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg',
  ];
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Health',
      img: require('../../../assests/icons/health.png'),
    },
    {
      id: 2,
      name: 'FMCG',
      img: require('../../../assests/icons/fmcg.png'),
    },
    {
      id: 3,
      name: 'Electronics',
      img: require('../../../assests/icons/electronics.png'),
    },
    {
      id: 4,
      name: 'Mobiles',
      img: require('../../../assests/icons/mobiles.png'),
    },
    {
      id: 5,
      name: 'Garments',
      img: require('../../../assests/icons/garments.png'),
    },
    {
      id: 6,
      name: 'Appliances',
      img: require('../../../assests/icons/appliances.png'),
    },
    {
      id: 7,
      name: 'Books',
      img: require('../../../assests/icons/books.png'),
    },
    {
      id: 8,
      name: 'Toys',
      img: require('../../../assests/icons/toys.png'),
    },
  ]);

  const [latestOffers, setLatestOffers] = useState(products);

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

  const images = [
    require('../../../assests/images/bag11.jpg'),
    require('../../../assests/images/bag12.jpg'),
    require('../../../assests/images/bag13.jpg'),
    require('../../../assests/images/bag14.jpg'),
    require('../../../assests/images/bag15.jpg'),
  ];

  let total = 0;
  cartItems.map(item => {
    total += item.quantity * item.price;
  });

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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Nice product and I recommend you buy on (www.ala.com). You will also find several products useful on ala market. (referral link from business users and registered users will register the new user in My group and from guest users, registration with 0 sponsor)',
        url: 'www.ala.com',
        title: 'Alpiste',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // 1F5DAB

  const BackgroundCarousals = props => {
    const {images} = props;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollRef = React.createRef();

    function getIndex(e) {
      const viewSize = e.nativeEvent.layoutMeasurement.width;
      const contentOffSet = e.nativeEvent.contentOffset.x;
      const index = Math.floor(contentOffSet / viewSize);
      setSelectedIndex(index);
    }

    return (
      <View style={{height: '100%', width: '100%', paddingHorizontal: 20}}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={getIndex}>
          {images.map((image, index) => {
            return (
              <Image
                resizeMode="stretch"
                key={index}
                source={image}
                style={styles.backgroundImage}
              />
            );
          })}
        </ScrollView>
        <View style={styles.circleDiv}>
          {images.map((__, index) => {
            return (
              <View
                key={index + 1}
                style={[
                  styles.whiteCircles,
                  {opacity: index === selectedIndex ? 0.5 : 1},
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

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
                // marginRight: (WIDTH * 15) / 100,
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
        {/* <View
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
                ? navigation.navigate('BusinessMenu')
                : navigation.navigate('MenuScreen');
            }}>
            <MaterialCommunityIcons name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  function onchange(nativeEvent) {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != activeImage) {
        setActiveImage(slide);
      }
    }
  }

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
                user
                  ? navigation.navigate('Profile')
                  : navigation.navigate('MenuScreen');
              }}>
              <MaterialCommunityIcons name="menu" size={30} color="#fff" />
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
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: fontfamily,
                  }}>
                  Ramesh
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: fontfamily,
                  }}>
                  Designation
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
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#fff',
                      fontFamily: fontfamily,
                    }}>
                    My Group
                  </Text>
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
          borderBottomWidth: 1,
          borderColor: '#ccc',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Product', {type: 'products'});
          }}
          style={{
            height: '75%',
            width: '90%',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 50,
            elevation: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 12}}>Search here</Text>
          <Ionicons name="search" size={20} />
        </TouchableOpacity>
      </View>

      {/*================End Of Header  ================= */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            height: '5%',
            width: '100%',
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            borderColor: '#ccc',
            paddingLeft: 0,
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
            }}>
            {categories.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'ala'});
                  }}
                  style={{
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      borderColor: '#ccc',
                      backgroundColor: '#35CBC4',
                    }}>
                    <Image
                      source={item.img}
                      style={{height: 30, width: 30}}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 11,
                      color: '#000',
                      fontFamily: fontfamily,
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{height: 300, width: '100%'}}>
          <ScrollView
            onScroll={({nativeEvent}) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            contentContainerStyle={{
              height: 300,
              backgroundColor: '#fff',
              alignItems: 'center',
            }}>
            {latestOffers.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    // left: 10,
                    height: '90%',
                    width: WIDTH,
                    backgroundColor: '#fff',
                    // padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assests/banners/banner_background.jpg')}
                    style={{height: '100%', width: '100%'}}
                  />
                  <View
                    style={{
                      height: '90%',
                      width: '95%',
                      padding: 10,
                      borderRadius: 10,
                      // paddingVertical:10,
                      // paddingHorizontal:10,
                      backgroundColor: '#fff',

                      position: 'absolute',
                    }}>
                    <View
                      style={{
                        height: '10%',
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: fontfamily,
                          color: '#000',
                          fontSize: 16,
                          top: -5,
                        }}>
                        Latest Product
                      </Text>

                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: fontfamily,
                          top: -5,
                        }}>
                        {item.productBy}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: '70%',
                        width: '100%',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '30%',
                          // backgroundColor: 'green',
                          // justifyContent: 'center',
                          // alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          resizeMode="cover"
                          source={item.img}
                          style={{height: '80%', width: '90%'}}
                        />
                      </View>
                      <View
                        style={{
                          top: 15,
                          height: '100%',
                          width: '70%',
                          // backgroundColor: 'yellow',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: fontfamily,
                            top: 5,
                            color: '#4e4e4e',
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontFamily: fontfamily,
                            top: 10,
                            fontSize: 13,
                          }}>
                          {item.description}
                        </Text>
                        <View style={{flexDirection: 'row', top: 20}}>
                          <View style={{}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  fontFamily: fontfamily,
                                  fontSize: 16,
                                }}>
                                DRC :
                              </Text>
                              <FontAwesome
                                name="rupee"
                                size={13}
                                style={{left: 5, top: 7}}
                                color="#F05935"
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  left: 10,
                                  fontFamily: fontfamily,
                                  color: '#F05935',
                                }}>
                                {item.drc}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              left: 40,
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontFamily: fontfamily,
                                fontSize: 16,
                              }}>
                              M.R.P :
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                              }}>
                              <FontAwesome
                                name="rupee"
                                size={13}
                                style={{left: 5, top: 7}}
                                color="#F05935"
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  left: 10,
                                  fontFamily: fontfamily,
                                  color: '#F05935',
                                }}>
                                {item.mrp}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: '20%',
                        width: '100%',
                        flexDirection: 'row',
                        // backgroundColor: 'blue',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ProductDescription', {
                            img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
                          });
                        }}
                        style={{
                          paddingHorizontal: 30,
                          borderWidth: 1,
                          paddingVertical: 5,
                          borderColor: '#35CBC4',
                          borderRadius: 5,
                          backgroundColor: '#35CBC4',
                        }}>
                        <Text style={{color: '#fff', fontFamily: fontfamily}}>
                          View
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          addToCart(item);
                        }}
                        style={{
                          paddingHorizontal: 20,
                          borderWidth: 1,
                          paddingVertical: 5,
                          borderColor: '#35CBC4',
                          borderRadius: 5,
                          backgroundColor: '#35CBC4',
                        }}>
                        <Text style={{color: '#fff', fontFamily: fontfamily}}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                      <MaterialIcons
                        size={30}
                        name="favorite-border"
                        onPress={() => {
                          alert('adding into favourite');
                        }}
                      />
                      <AntDesign
                        size={30}
                        name="sharealt"
                        onPress={() => {
                          onShare();
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: '#fff',
              bottom: 15,
              position: 'absolute',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            {latestOffers.map((e, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: activeImage === index ? '#000' : '#ccc',
                    marginHorizontal: 4,
                  }}></View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text
            style={{
              fontFamily: fontfamily,
              color: '#35CBC4',
              fontSize: 18,
            }}>
            Products
          </Text>
          <View style={{height: 220}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              {brands[0].products.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProductDescription', {
                        img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
                      });
                    }}
                    style={{
                      padding: 5,
                      elevation: 0,
                      margin: 5,
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      // borderWidth: 1,
                      borderColor: '#e5e5e5',
                      height: '90%',
                      width: 150,
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '80%', width: '100%'}}
                      source={item.img}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      {item.productBy} | {item.weight}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'ala'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
                  More ...
                </Text>
              </TouchableOpacity>
               */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'lightblue',
                  }}>
                  <Text
                    style={{
                      fontFamily: fontfamily,
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text
            style={{
              fontFamily: fontfamily,
              color: '#35CBC4',
              fontSize: 18,
            }}>
            FMCG
          </Text>
          <View style={{height: 220}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              {brands[2].products.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProductDescription', {
                        img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
                      });
                    }}
                    style={{
                      padding: 5,
                      elevation: 0,
                      margin: 5,
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      // borderWidth: 1,
                      borderColor: '#e5e5e5',
                      height: '90%',
                      width: 150,
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '80%', width: '100%'}}
                      source={item.img}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      {item.productBy} | {item.weight}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'ala'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
                  More ...
                </Text>
              </TouchableOpacity>
               */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'lightblue',
                  }}>
                  <Text
                    style={{
                      fontFamily: fontfamily,
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text
            style={{
              fontFamily: fontfamily,
              color: '#35CBC4',
              fontSize: 18,
            }}>
            Health
          </Text>
          <View style={{height: 220}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              {latestOffers.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProductDescription', {
                        img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
                      });
                    }}
                    style={{
                      padding: 5,
                      elevation: 0,
                      margin: 5,
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      // borderWidth: 1,
                      borderColor: '#e5e5e5',
                      height: '90%',
                      width: 150,
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '80%', width: '100%'}}
                      source={item.img}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      {item.productBy} | {item.weight}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'ala'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
                  More ...
                </Text>
              </TouchableOpacity>
               */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'lightblue',
                  }}>
                  <Text
                    style={{
                      fontFamily: fontfamily,
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        {/* <View
          style={{
            marginTop: 5,
            paddingVertical: 10,
            backgroundColor: '#FBFBFB',
            borderTopWidth: 1,
            borderColor: '#ccc',

            // backgroundColor: '#f2f0f0',
          }}>
          <Text
            style={{
              fontFamily: fontfamily,
              color: '#000',
              fontSize: 18,
              left: 10,
            }}>
            FMCG
          </Text>
          <View style={{height: 160, width: '100%'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/FMCG/hairoil.png'),
                  });
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  marginLeft: 15,
                  height: 150,
                  width: 150,
                  // backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/hairoil.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Ayurvedic hair oil | amazon | 250g
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/FMCG/hairoil.png'),
                  });
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  marginLeft: 15,
                  height: 150,
                  width: 150,
                  // backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/panchagavya.png')}
                />
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: '#4e4e4e',
                    alignSelf: 'center',
                  }}>
                  Ayurvedic hair oil
                </Text>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: '#4e4e4e',
                    alignSelf: 'center',
                    fontSize: 12,
                  }}>
                  amazon | 250g
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/FMCG/teapowder.png'),
                  });
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  marginLeft: 15,
                  height: 150,
                  width: 150,
                  // backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/teapowder.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Ayurvedic hair oil | amazon | 250g
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/FMCG/panchagavyapack.png'),
                  });
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  marginLeft: 15,
                  height: 150,
                  width: 150,
                  borderRadius: 15,
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/panchagavyapack.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Ayurvedic hair oil | amazon | 250g
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'fmcg'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'orange',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
 
            </ScrollView>
          </View>
 
        </View> */}
        {/* <View
          style={{
            marginTop: 5,
            paddingVertical: 10,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
              fontSize: 18,
              left: 10,
            }}>
            Products
          </Text>
          <View style={{height: 210, width: '100%'}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/PRODUCTS/book.png'),
                  });
                }}
                style={{
                  padding: 5,
                  margin: 5,
                  marginLeft: 15,
                  height: 200,
                  width: 150,
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  source={require('../../../assests/images/apex/PRODUCTS/book.png')}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: 10,
                  }}>
                  Impact of Radiation | 1 book
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/PRODUCTS/cooling.png'),
                  });
                }}
                style={{
                  padding: 5,
                  // elevation: 15,
                  margin: 5,
                  height: 200,
                  width: 150,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#ccc',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  source={require('../../../assests/images/apex/PRODUCTS/cooling.png')}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: 10,
                  }}>
                  Spectacle | Rayban | 1 piece
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/PRODUCTS/earphone.png'),
                  });
                }}
                style={{
                  padding: 5,
                  // elevation: 5,
                  margin: 5,
                  height: 200,
                  width: 150,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#ccc',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  source={require('../../../assests/images/apex/PRODUCTS/earphone.png')}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: 10,
                  }}>
                  Earphone | Boat | 1 Piece
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/PRODUCTS/tshirt.png'),
                  });
                }}
                style={{
                  padding: 5,
                  // elevation: 5,
                  margin: 5,
                  height: 200,
                  width: 150,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  // borderWidth: 1,
                  // borderColor: '#ccc',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  source={require('../../../assests/images/apex/PRODUCTS/tshirt.png')}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: 10,
                  }}>
                  T-Shirt | Apex | 1 T-shirt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'orange',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

        </View> */}
        <View
          // key={index}
          style={{
            borderTopWidth: 1,
            borderColor: '#ccc',
            // left: 10,
            height: 230,
            width: WIDTH,
            backgroundColor: '#fff',
            paddingHorizontal: 0,
            justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Image
            source={require('../../assests/banners/banner_background1.jpg')}
            style={{height: '100%', width: '100%'}}
          />
          <View
            style={{
              height: '100%',
              width: '100%',
              // padding: 10,
              // borderRadius: 10,
              // backgroundColor: '#fff',
              position: 'absolute',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View style={{height: '20%', paddingLeft: 10}}>
              <Text
                style={{
                  fontFamily: fontfamily,
                  color: '#fff',
                  fontSize: 18,
                }}>
                Brands
              </Text>
            </View>
            <View
              style={{
                height: '80%',
                width: '100%',
                // justifyContent: 'flex-end',
              }}>
              <ScrollView
                horizontal
                contentContainerStyle={{
                  height: '100%',
                  // backgroundColor:'#fff'
                  // alignItems: 'center',
                  // justifyContent: 'center',
                }}
                showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'ala'});
                  }}
                  style={{
                    height: '100%',
                    marginHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assests/extras/ala_logo.png')}
                    // style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'john&frankie'});
                  }}
                  style={{
                    height: '100%',
                    marginHorizontal: 20,
                    alignItems: 'center',
                    // backgroundColor: 'blue'
                  }}>
                  <Image
                    source={require('../../../assests/images/brands/john&frankie.png')}
                    // style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'panchyagavya'});
                  }}
                  style={{
                    height: '80%',
                    marginHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assests/images/brands/panchyagavya.png')}
                    // style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'tanza'});
                  }}
                  style={{
                    height: '80%',
                    marginHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../assests/images/brands/brand3.png')}
                    // style={{height: '100%', width: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Product', {brand: 'tanza'});
                  }}
                  style={{
                    height: '80%',
                    marginHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assests/images/brands/brand2.png')}
                    // style={{height: '100%', width: '100%',backgroundColor: '#fff'}}
                  />
                </TouchableOpacity>
              </ScrollView>
            </View>
            {/* <ScrollView
              horizontal
              contentContainerStyle={{ */}
            {/* // height: '80%',
                // alignItems: 'center',
                // justifyContent: 'center', */}
            {/* }}
              showsHorizontalScrollIndicator={false}> */}
            {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'ala'});
                }}
                style={{
                  height: '100%',
                  marginHorizontal: 20,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assests/extras/ala_logo.png')}
                  // style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity> */}

            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Product', {brand: 'panchyagavya'});
              }}
              style={{
                height: '100%',
                marginHorizontal: 20,
                alignItems: 'center',
                // backgroundColor: 'blue'
              }}>
              <Image
                source={require('../../../assests/images/brands/john&frankie.png')}
                // style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Product', {brand: 'panchyagavya'});
              }}
              style={{
                height: '80%',
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assests/images/brands/panchyagavya.png')}
                // style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Product', {brand: 'tanza'});
              }}
              style={{
                height: '80%',
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../../assests/images/brands/brand3.png')}
                // style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('Product', {brand: 'tanza'});
              }}
              style={{
                height: '80%',
                marginHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assests/images/brands/brand2.png')}
                // style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity> */}
            {/* </ScrollView> */}
          </View>
        </View>
        {/* <View
          style={{
            marginTop: 5,
            paddingLeft: 10,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
              fontSize: 18,
            }}>
            Health
          </Text>
          <View style={{height: 220}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              {brands[3].products.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProductDescription', {
                        img: item.images,
                      });
                    }}
                    style={{
                      padding: 5,
                      elevation: 0,
                      margin: 5,
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      // borderWidth: 1,
                      borderColor: '#e5e5e5',
                      height: '90%',
                      width: 150,
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '80%', width: '100%'}}
                      source={item.img}
                      resizeMode="contain"
                    />
                    <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                      {item.title} | {item.productBy} | {item.weight}
                    </Text>
                  </TouchableOpacity>
                );
              })}
         
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    fontSize: 16,
                    left: -5,
                  }}>
                  View All
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    // flexDirection: 'row',
                    backgroundColor: 'lightblue',
                  }}>
                  <AntDesign
                    name="arrowright"
                    size={30}
                    color="#fff"
                    // style={{left: 5}}
                  />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View> */}
        <View
          style={{
            marginTop: 5,
            paddingHorizontal: 15,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderColor: '#ccc',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: fontfamily,
              color: '#35CBC4',
              fontSize: 18,
            }}>
            Health
          </Text>
          <View style={{height: 220}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{}}>
              {latestOffers.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('ProductDescription', {
                        img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
                      });
                    }}
                    style={{
                      padding: 5,
                      elevation: 0,
                      margin: 5,
                      flex: 1,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      // borderWidth: 1,
                      borderColor: '#e5e5e5',
                      height: '90%',
                      width: 150,
                    }}>
                    <Image
                      style={{borderRadius: 5, height: '80%', width: '100%'}}
                      source={item.img}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fontfamily,
                        color: '#4e4e4e',
                        alignSelf: 'center',
                        fontSize: 12,
                      }}>
                      {item.productBy} | {item.weight}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'ala'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
                  More ...
                </Text>
              </TouchableOpacity>
               */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Product', {brand: 'tanza'});
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  flex: 1,
                  borderRadius: 15,
                  borderColor: '#e5e5e5',
                  height: '90%',
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 130,
                    width: 130,
                    borderRadius: 130 / 2,
                    // paddingHorizontal: 20,
                    backgroundColor: '#fff',
                    // borderRadius: 5,
                    flexDirection: 'row',
                    backgroundColor: 'lightblue',
                  }}>
                  <Text
                    style={{
                      fontFamily: fontfamily,
                      color: '#fff',
                      fontSize: 14,
                      left: -5,
                    }}>
                    View All
                  </Text>
                  <AntDesign name="arrowright" size={20} color="#fff" />
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      {user ? <Footer /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  backgroundImage: {
    padding: 10,
    height: '100%',
    width: DEVICE_WIDTH - 20,
    borderRadius: 5,
    marginRight: 20,
  },
  circleDiv: {
    position: 'absolute',
    height: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  whiteCircles: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },
  wrap: {
    position: 'absolute',
    width: WIDTH - 30,
    height: HEIGHT * 0.25,
    backgroundColor: 'lightblue',
  },
  wrapDot: {
    bottom: 0,
    // position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    margin: 3,
    color: '#e5e5e5',
  },
  dotActive: {
    margin: 3,
    color: '#444646',
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    backgroundColor: 'lightblue',
  },
});

export default HomeScreen;
