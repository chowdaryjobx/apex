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
  RefreshControl,
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
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
import DataContext from '../../context/DataContext';

import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import axios from 'axios';

const DEVICE_WIDTH = Dimensions.get('window').width;
function HomeScreen({navigation}) {
  const {
    user,
    cartItems,
    // guestCartItems,
    addToGuestCart,
    TokenIDN,
    TokenID,
    userData,
    productStatus,
    companyName,
    url,
    api,
    products,

    // brands,
    font_desc,
    fonts,
  } = React.useContext(DataContext);

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('screen');
  const [isNetworkConnected, setIsNetworkConnected] = useState(null);
  const [Pagerefreshing, setPagerefreshing] = React.useState(false);

  const [SplashScreen, setSplashScreen] = useState(true);
  const [timer, setTimer] = useState(2);
  const [animations, setAnimations] = useState(new Animated.Value(HEIGHT));
  const [anim, setAnim] = useState(new Animated.Value(1));
  const trans = {
    transform: [{translateY: animations}, {scale: anim}],
  };

  const [wallet, setWallet] = useState(null);
  const [business, setBusiness] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [latestProudcts, setLatestProducts] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [businessUser, setBusinessUser] = useState(null);
  const [brands, setBrands] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer == 0) {
      setSplashScreen(false);
    }
  }, [timer]);

  const [timer1, setTimer1] = useState(3);

  useEffect(() => {
    if (timer1 > 0) {
      setTimeout(() => {
        setTimer1(timer1 - 1);
      }, 500);
    } else if (timer1 == 0) {
      // setSplashScreen(false);
    }
  }, [timer1]);

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

  useEffect(() => {
    getCategories();
    HomeProducts();
  }, []);

  useEffect(() => {
    if (user) {
      homeBusiness();
    }
  }, [user]);

  function HomeProducts() {
    axios
      .post(api + url.HomeProducts, {
        TokenIDN: TokenIDN,
        TokenID: user ? user.TokenId : 'N.A.',
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          // console.log(res.data[0].CategoryProducts);
          setLatestProducts(res.data[0].LatestProducts);
          setCategoryProducts(res.data[0].CategoryProducts);
          setBrands(res.data[0].Brands);
        } else if (res.data[0].Status === 'Failure') {
          console.log('failed' + res.data[0].Response);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function addToCart(ProductNo) {
    let params = {
      InputType: 'ADD',
      TokenID: user.TokenId,
      ProductNo: ProductNo,
      Quantity: '1',
    };

    axios
      .post(api + url.CartItemsAddorMinus, params)
      .then(res => {
        if (res.data[0].Status === 'Success') {
          homeBusiness();
        } else if (res.data[0].Status === 'Failure') {
          alert('could not able to add product to cart');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getCategories() {
    axios
      .post(api + url.Categories, {
        TokenIDN: TokenIDN,
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setCategories(res.data[0].Categories);
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function homeBusiness() {
    axios
      .post(api + url.HomeBusiness, {
        TokenID: user.TokenId,
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setBusinessUser(res.data[0]);
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  const onpagerefresh = () => {
    setPagerefreshing(true);
    getCategories();
    setPagerefreshing(false);
  };

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

  const onShare = async img => {
    const url = 'https://awesome.contents.com/';
    const title = 'Awesome Contents';
    const message = 'Please check this out.';
    const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            // For sharing url with custom title.
            placeholderItem: {type: 'url', content: url},
            item: {
              default: {type: 'url', content: url},
            },
            subject: {
              default: title,
            },
            linkMetadata: {originalUrl: url, url, title},
          },
          {
            // For sharing text.
            placeholderItem: {type: 'text', content: message},
            item: {
              default: {type: 'text', content: message},
              message: null, // Specify no text to share via Messages app.
            },
            linkMetadata: {
              // For showing app icon on share preview.
              title: message,
            },
          },
          {
            // For using custom icon instead of default text icon at share preview when sharing with message.
            placeholderItem: {
              type: 'url',
              content: icon,
            },
            item: {
              default: {
                type: 'text',
                content: `${message} ${url}`,
              },
            },
            linkMetadata: {
              title: message,
              icon: icon,
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });

    Share.open(options);
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
                  {businessUser ? businessUser.CommssionWallBalance : null}
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
                  {businessUser ? businessUser.MyBankBalance : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AtAGlance', {type: 'A'});
                // navigation.navigate('WalletReport', {type: 'MYBANK'});
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
                  : {businessUser ? businessUser.AlphaSC : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AtAGlance', {type: 'B'});
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
                  : {businessUser ? businessUser.BetaSC : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyEarnings');
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
                  {businessUser ? businessUser.TotalEarning : null}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyGroup');
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
              <MaterialCommunityIcons
                name="account-group"
                size={30}
                color="#000"
              />
              <Text style={{fontSize: 12}}>My Group</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DailySales');
              }}
              style={{
                paddingLeft: 5,
                height: '80%',
                width: 90,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assests/icons/mybusiness.png')}
                style={{height: 30, width: 30}}
              />
              <Text style={{fontSize: 12}}>Daily Sales</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
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

  if (SplashScreen) {
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
          {timer1 === 0 ? (
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
  } else {
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
              alignItems: 'center',
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

              {/* <View
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
              </View> */}

              {user ? (
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#fff',
                      fontSize: 14,
                      fontFamily: fonts.BOLD,
                    }}>
                    {businessUser ? businessUser.Name : null}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      alert('upgrade designation');
                    }}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#fff',
                        fontSize: 12,
                        fontFamily: fonts.BOLD,
                      }}>
                      {businessUser ? businessUser.Designation : null}
                    </Text>
                    {businessUser && businessUser.FranchiseeUpgradeBtnStatus ? (
                      <EvilIcons name="arrow-up" size={25} Fstyle={{left: 5}} />
                    ) : null}
                  </TouchableOpacity>
                </View>
              ) : null}
              {!user ? (
                <View>
                  <Text
                    style={{
                      marginLeft: 10,
                      color: '#fff',
                      fontSize: 18,
                      fontFamily: fonts.BOLD,
                    }}>
                    Guest
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Cart');
                }}
                style={{flexDirection: 'row', left: -10}}>
                <EvilIcons name="cart" size={35} color="#fff" />
                <View style={{position: 'absolute', left: 20, top: -10}}>
                  <Badge
                    value={
                      user && businessUser ? businessUser.CartItemsCount : 0
                    }
                    status="success"
                  />
                </View>
              </TouchableOpacity>
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
              paddingHorizontal: 20,
              borderRadius: 50,
              elevation: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.MEDIUM,
                top: -3,
                color: '#8F8F8F',
              }}>
              Search here
            </Text>
            <Ionicons name="search" size={20} />
          </TouchableOpacity>
        </View>

        {/*================End Of Header  ================= */}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={Pagerefreshing}
              onRefresh={onpagerefresh}
            />
          }
          showsVerticalScrollIndicator={false}>
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
              {categories
                ? categories.map((item, index) => {
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
                            source={{
                              uri: `data:image/jpeg;base64,${item.CategoryImage}`,
                            }}
                            style={{height: 30, width: 30}}
                            resizeMode="contain"
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#4E4E4E',
                            fontFamily: fonts.BOLD,
                          }}>
                          {item.CategoryName}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
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
              {latestProudcts
                ? latestProudcts.map((item, index) => {
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
                                fontFamily: fonts.BOLD,
                                color: '#35CBC4',
                                fontSize: 16,
                                top: -5,
                              }}>
                              Latest Product
                            </Text>

                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: fonts.BOLD,
                                top: -5,
                              }}>
                              {item.BrandName}
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
                                source={{
                                  uri: `data:image/jpeg;base64,${item.ProductImage}`,
                                }}
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
                                  fontFamily: fonts.BOLD,
                                  top: 5,
                                  color: '#4e4e4e',
                                }}>
                                {item.ProductName}
                              </Text>

                              <Text
                                style={{
                                  fontFamily: font_desc,
                                  top: 10,
                                  fontSize: 13,
                                  color: '#A3A3A3',
                                }}>
                                {item.Description.substring(0, 90)} ...
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  top: 20,
                                  // backgroundColor: 'blue',
                                  justifyContent: 'space-between',
                                }}>
                                {user &&
                                businessUser &&
                                businessUser.FooterMenuStatus === 'Yes' ? (
                                  <View
                                  // style={{justifyContent: 'space-between'}}
                                  >
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        // justifyContent: 'center',
                                        // alignItems: 'center',
                                      }}>
                                      <Text
                                        style={{
                                          fontFamily: fonts.SEMIBOLD,
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
                                          fontFamily: fonts.BOLD,
                                          color: '#F05935',
                                        }}>
                                        {item.DRC}
                                      </Text>
                                    </View>
                                  </View>
                                ) : null}
                                <View
                                  style={{
                                    // left: 40,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                  }}>
                                  <Text
                                    style={{
                                      fontFamily: fonts.SEMIBOLD,
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
                                        fontFamily: fonts.BOLD,
                                        color: '#F05935',
                                      }}>
                                      {item.MRP}
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
                                  ProductNo: item.ProductNo,
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
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: fonts.BOLD,
                                  top: -3,
                                }}>
                                View
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                if (user) {
                                  addToCart(item.ProductNo);
                                } else {
                                  navigation.navigate('MenuScreen');
                                }
                              }}
                              style={{
                                paddingHorizontal: 20,
                                borderWidth: 1,
                                paddingVertical: 5,
                                borderColor: '#35CBC4',
                                borderRadius: 5,
                                backgroundColor: '#35CBC4',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontFamily: fonts.BOLD,
                                  top: -3,
                                }}>
                                Add to Cart
                              </Text>
                            </TouchableOpacity>
                            {item.FavouriteBtnStatus === 'Yes' ? (
                              <MaterialIcons
                                size={30}
                                color={
                                  item.FavouriteStatus === 'Yes'
                                    ? 'red'
                                    : '#8D8D8D'
                                }
                                name={
                                  item.FavouriteStatus === 'Yes'
                                    ? 'favorite'
                                    : 'favorite-border'
                                }
                                onPress={() => {
                                  alert('adding into favourite');
                                }}
                              />
                            ) : null}
                            <AntDesign
                              size={30}
                              color="#8D8D8D"
                              name="sharealt"
                              onPress={() => {
                                onShare(item.img);
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    );
                  })
                : null}
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
              {latestProudcts
                ? latestProudcts.map((e, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: 5,
                          backgroundColor:
                            activeImage === index ? '#000' : '#ccc',
                          marginHorizontal: 4,
                        }}></View>
                    );
                  })
                : null}
            </View>
          </View>

          {categoryProducts
            ? categoryProducts.map((item, index) => {
                return (
                  <>
                    <View
                      key={index}
                      style={{
                        marginTop: 5,
                        paddingHorizontal: 15,
                        backgroundColor: '#fff',
                        borderTopWidth: 1,
                        borderColor: '#ccc',
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.BOLD,
                          color: '#35CBC4',
                          fontSize: 18,
                        }}>
                        {item.CategoryName}
                      </Text>
                      <View style={{height: 220}}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{}}>
                          {categoryProducts[index].Products.map(
                            (item, index) => {
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
                                    borderColor: '#e5e5e5',
                                    height: '90%',
                                    width: 150,
                                  }}>
                                  <Image
                                    style={{
                                      borderRadius: 5,
                                      height: '80%',
                                      width: '100%',
                                    }}
                                    source={{
                                      uri: `data:image/jpeg;base64,${item.ProductImage}}`,
                                    }}
                                    resizeMode="contain"
                                  />
                                  <Text
                                    style={{
                                      fontFamily: fonts.SEMIBOLD,
                                      color: '#4e4e4e',
                                      alignSelf: 'center',
                                    }}>
                                    {item.ProductName}
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: fonts.SEMIBOLD,
                                      color: '#4e4e4e',
                                      alignSelf: 'center',
                                      fontSize: 12,
                                    }}>
                                    {item.PackingType} | {item.Volume}
                                  </Text>
                                </TouchableOpacity>
                              );
                            },
                          )}
                          {item.ViewAllBtnStatus === 'Yes' ? (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('Product', {
                                  brand: 'tanza',
                                });
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
                                    fontFamily: fonts.BOLD,
                                    color: '#fff',
                                    fontSize: 14,
                                    left: -5,
                                  }}>
                                  View All
                                </Text>
                                <AntDesign
                                  name="arrowright"
                                  size={20}
                                  color="#fff"
                                />
                              </View>
                            </TouchableOpacity>
                          ) : null}
                        </ScrollView>
                      </View>
                    </View>

                    {index % 3 === 0 ? (
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
                          {brands
                            ? brands.map((item, index) => {
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
                                      // source={{
                                      //   uri: `data:image/jpeg;base64,${item.BrandImage}`,
                                      // }}
                                      source={require('../../assests/banners/banner_background1.jpg')}
                                      style={{height: '100%', width: '100%'}}
                                    />
                                    <View
                                      style={{
                                        height: '90%',
                                        width: '95%',
                                        padding: 10,
                                        borderRadius: 10,
                                        backgroundColor: '#fff',
                                        position: 'absolute',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                      }}>
                                      <View
                                        style={{
                                          height: 150,
                                          width: 150,
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}>
                                        <Image
                                          resizeMode="contain"
                                          source={{
                                            uri: `data:image/jpeg;base64,${item.BrandImage}`,
                                          }}
                                          style={{
                                            height: '100%',
                                            width: '100%',
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                );
                              })
                            : null}
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
                          {brands
                            ? brands.map((e, index) => {
                                return (
                                  <View
                                    key={index}
                                    style={{
                                      height: 10,
                                      width: 10,
                                      borderRadius: 5,
                                      backgroundColor:
                                        activeImage === index ? '#000' : '#ccc',
                                      marginHorizontal: 4,
                                    }}></View>
                                );
                              })
                            : null}
                        </View>
                      </View>
                    ) : null}
                  </>
                );
              })
            : null}
        </ScrollView>
        {user && businessUser && businessUser.FooterMenuStatus === 'Yes' ? (
          <Footer />
        ) : null}
      </View>
    );
  }
}

export default HomeScreen;
