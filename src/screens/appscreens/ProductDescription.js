import React, {useRef, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import DataContext from '../../context/DataContext';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import {Rating, RatingProps} from 'react-native-elements';
const {width} = Dimensions.get('window');
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;
export default function ProductDescription({navigation, route}) {
  const latestData = route.params.data;
  const {ProductNo} = route.params;
  // const img = route.params.img;
  const img = null;

  const {
    user,
    cartItems,
    api,
    url,
    fonts,
    TokenIDN,
    // guestCartItems,
    addToGuestCart,
    guestIncreaseProducts,
    guestDecreaseProducts,
    guestRemoveProduct,
  } = React.useContext(DataContext);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const [mainoffer, setMainOffer] = useState(10);
  const [qty, setQty] = useState(0);
  const [mrp, setMrp] = useState(300);
  const [drc, setDrc] = useState(30);
  const [activeImage, setActiveImage] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [business, setBusiness] = useState(null);
  const [businessUser, setBusinessUser] = useState(null);
  console.log(businessUser);
  const [errorMessage, setErrorMessage] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [customerQuestions, setCustomerQuestions] = useState([
    {
      q: 'What is the use of this product ?',
      a: 'Useful to stimulate pancreas, to genereate amount of insulting',
    },
    {
      q: 'It can be placed anywhere in the home ?',
      a: 'It should be kept in a cool place.',
    },
    {
      q: 'What is the use of this product ?',
      a: 'Useful to stimulate pancreas, to genereate amount of insulting',
    },
    {
      q: 'Who can use this product ?',
      a: 'More than 18 years of age people can use.',
    },
    {
      q: 'What is the use of this product ?',
      a: 'Useful to stimulate pancreas, to genereate amount of insulting',
    },
  ]);

  const [latestOffers, setLatestOffers] = useState(latestData);

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

  const showToastWithGravity = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    if (user) {
      homeBusiness();
    }
  }, [user]);

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
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  function addToCart(ProductNo, value) {
    if (value === 'btn' && qty >= 1) {
      showToastWithGravity('Product already added to cart');
    } else {
      let params = {
        InputType: 'ADD',
        TokenID: user.TokenId,
        ProductNo: ProductNo,
        Quantity: '1',
      };

      axios
        .post(api + url.CartItemsAddorMinus, params)
        .then(res => {
          if (
            res.data[0].Status === 'Success' &&
            res.data[0].Response === 'Cart added successfully'
          ) {
            setQty(qty + 1);
            showToastWithGravity('Product  added to cart');
          } else if (res.data[0].Status === 'Failure') {
            setErrorMessage(res.data[0].Response);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }
  function removeFromCart(ProductNo) {
    let params = {
      InputType: 'MINUS',
      TokenID: user.TokenId,
      ProductNo: ProductNo,
      Quantity: '1',
    };
    axios
      .post(api + url.CartItemsAddorMinus, params)
      .then(res => {
        if (
          res.data[0].Status === 'Success' &&
          res.data[0].Response === 'Cart updated successfully'
        ) {
          setQty(qty - 1);
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  // useEffect(() => {
  //   if (user !== null) {
  //     let data = {TokenID: user.TokenId};
  //     axios
  //       .post(api + url.MyBusiness, data)
  //       .then(res => {
  //         if (res.data[0].Status == 'Success') {
  //           // setErrorMessage(null);
  //           setBusiness(res.data[0]);
  //         } else if (res.data[0].Status === 'Failure') {
  //           if (
  //             res.data[0].Response === 'Server is busy, please try again later'
  //           ) {
  //             navigation.navigate('PayoutTimeError');
  //           } else {
  //             // setErrorMessage(res.data[0].Response);
  //           }
  //         }
  //       })
  //       .catch(err => {
  //         setErrorMessage(err.message);
  //       });

  //     axios
  //       .post(api + url.AllWalletBalance, data)
  //       .then(res => {
  //         if (res.data[0].Status == 'Success') {
  //           // setErrorMessage(null);
  //           setWallet(res.data[0]);
  //         } else if (res.data[0].Status === 'Failure') {
  //           if (
  //             res.data[0].Response === 'Server is busy, please try again later'
  //           ) {
  //             navigation.navigate('PayoutTimeError');
  //           } else {
  //             // setErrorMessage(res.data[0].Response);
  //           }
  //         }
  //       })
  //       .catch(err => {
  //         setErrorMessage(err.message);
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    if (ProductNo !== null || ProductNo !== undefined) {
      let data = {TokenID: user ? user.TokenId : 'N.A.', ProductNo, TokenIDN};
      axios
        .post(api + url.ViewProduct, data)
        .then(res => {
          if (res.data[0].Status == 'Success') {
            setProductInfo(res.data[0]);
          } else if (res.data[0].Status === 'Failure') {
            if (
              res.data[0].Response === 'Server is busy, please try again later'
            ) {
              navigation.navigate('PayoutTimeError');
            } else {
              setErrorMessage(res.data[0].Response);
            }
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, [user, ProductNo]);

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

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/*================ Header  ================= */}
      <StatusBar backgroundColor="#35CBC4" />
      {/* <LinearGradient
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
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontSize: 14,
                    fontFamily: fonts.BOLD,
                  }}>
                  Ramesh
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    color: '#fff',
                    fontSize: 12,
                    fontFamily: fonts.BOLD,
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
                  style={{flexDirection: 'row', left: -10}}>
                  <EvilIcons name="cart" size={35} color="#fff" />
                  <View style={{position: 'absolute', left: 20, top: -10}}>
                    <Badge
                      value={
                        user && productInfo
                          ? productInfo.CartItemsCount
                          : cartItems.length
                      }
                      status="success"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    alert('hello');
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: 3,
                  }}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={30}
                    color="#fff"
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#fff',
                      fontFamily: fonts.BOLD,
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
      </LinearGradient> */}

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
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={30}
                color="#fff"
              />
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

                    // guestCartItems
                    // ? guestCartItems.length
                    // : 0
                  }
                  status="success"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {productInfo ? (
        <ScrollView contentContainerStyle={{}}>
          <View
            style={{
              paddingHorizontal: 20,
              top: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{fontFamily: fonts.BOLD, color: '#4e4e4e', fontSize: 15}}>
              {productInfo.ProductName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Rating
                startingValue={productInfo.Rating}
                type="star"
                ratingCount={5}
                imageSize={15}
                readonly={true}
                style={{alignSelf: 'center'}}
              />
              <Text style={{fontFamily: fonts.MEDIUM, top: -2}}>
                {' '}
                ({productInfo.RatingUsers})
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 20,
              marginTop: 15,
            }}>
            <Text style={{fontFamily: fonts.MEDIUM, fontSize: 13}}>
              {productInfo.BrandName}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 20,
              marginTop: 5,
              paddingBottom: 10,
            }}>
            <Text style={{fontFamily: fonts.MEDIUM, fontSize: 13}}>
              {productInfo.Description.substring(0, 200)}{' '}
              {productInfo.Description.length > 200 ? '...' : null}
            </Text>
          </View>
          <View>
            <ScrollView
              onScroll={({nativeEvent}) => onchange(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled
              contentContainerStyle={{
                height: 300,
                // width: '100%',
                backgroundColor: '#fff',
                alignItems: 'center',
              }}>
              {productInfo.Images.length === 1 ? (
                <View
                  // key={index}
                  style={{
                    height: '90%',
                    width: WIDTH,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: '90%',
                      width: '95%',
                      padding: 10,
                      borderRadius: 10,
                      alignItems: 'center',
                      // position: 'absolute',
                    }}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri: `data:image/jpeg;base64,${productInfo.Images[0].ProductImage}`,
                      }}
                      // source={img}
                      style={{height: '100%', width: '90%'}}
                    />
                  </View>
                  <Text>dlfj</Text>
                </View>
              ) : null}

              {productInfo !== undefined || productInfo !== null
                ? productInfo.Images.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          height: '90%',
                          width: WIDTH,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            height: '90%',
                            width: '95%',
                            padding: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            // position: 'absolute',
                          }}>
                          <Image
                            resizeMode="contain"
                            source={{
                              uri: `data:image/jpeg;base64,${item.ProductImage}`,
                            }}
                            style={{height: '100%', width: '90%'}}
                          />
                        </View>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
            <View
              style={{
                height: '100%',
                width: '20%',
                position: 'absolute',
                alignSelf: 'flex-end',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 20,
              }}>
              <AntDesign
                name="sharealt"
                style={{marginRight: 20}}
                size={25}
                onPress={() => {
                  alert('working on it');
                }}
              />
              {productInfo.FavouriteBtnStatus === 'Yes' ? (
                <MaterialIcons
                  name="favorite-border"
                  style={{marginRight: 20}}
                  size={25}
                  onPress={() => {
                    alert('working on it');
                  }}
                />
              ) : null}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingTop: 0,
              backgroundColor: 'blue',
            }}>
            <View style={{width: '100%'}}>
              <View>
                <View style={styles.wrapDot}>
                  {productInfo && productInfo.Images.length > 1
                    ? productInfo.Images.map((e, index) => (
                        <View
                          key={index}
                          style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor:
                              activeImage === index ? '#000' : '#ccc',
                            margin: 2,
                          }}></View>
                      ))
                    : null}
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 10,
              width: '100%',
              paddingVertical: 0.5,
              backgroundColor: '#ccc',
            }}></View>
          <View style={{paddingBottom: 100}}>
            <View style={{paddingHorizontal: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'row', top: 10}}>
                    <Text
                      style={{
                        fontFamily: fonts.SEMIBOLD,
                        fontSize: 18,
                      }}>
                      M.R.P :
                    </Text>
                    <FontAwesome5
                      name="rupee-sign"
                      size={13}
                      style={{left: 5, top: 7}}
                      color="#F05935"
                    />
                    <Text
                      style={{
                        fontFamily: fonts.BOLD,
                        fontSize: 18,
                        left: 10,
                        color: '#F05935',
                      }}>
                      {productInfo.MRP}
                    </Text>
                    {/* <Text style={{left: 10}}>(inclusive of all taxes)</Text> */}
                  </View>
                </View>
                {productInfo.DRCDispStatus === 'Yes' ? (
                  <View
                    style={{flexDirection: 'row', paddingRight: 10, top: 10}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: fonts.SEMIBOLD,
                          fontSize: 18,
                        }}>
                        DRC :
                      </Text>
                      <FontAwesome5
                        name="rupee-sign"
                        size={13}
                        style={{left: 5, top: 7}}
                        color="#F05935"
                      />
                      <Text
                        style={{
                          fontFamily: fonts.BOLD,
                          fontSize: 18,
                          left: 10,
                          color: '#F05935',
                        }}>
                        {productInfo.DRC}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>

              {/* <View
              style={{
                left: 0,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 18,
                  }}>
                  M.R.P :
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="rupee"
                    size={18}
                    style={{left: 5}}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      left: 10,
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                    }}>
                    200
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 18,
                  }}>
                  M.R.P :
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FontAwesome
                    name="rupee"
                    size={18}
                    style={{left: 5}}
                    color="#000"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      left: 10,
                      fontFamily: 'Poppins-Medium',
                      color: '#000',
                    }}>
                    200
                  </Text>
                </View>
              </View>
            </View> */}
              <View
                style={{
                  borderWidth: 1,
                  top: 20,
                  padding: 10,
                  // borderBottomWidth: 1,
                  borderColor: '#e4e4e4',
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}>
                <Text
                  style={{
                    color: '#DC0000',
                    fontSize: 16,
                    fontFamily: fonts.SEMIBOLD,
                  }}>
                  Save Extra{' '}
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 14,
                      fontFamily: fonts.SEMIBOLD,
                    }}>
                    with {productInfo.Offers.length} offers
                  </Text>{' '}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  top: 20,
                  padding: 10,
                  // borderBottomWidth: 1,
                  borderColor: '#e4e4e4',
                  flexDirection: 'row',
                  paddingRight: 10,
                }}>
                <Text
                  style={{
                    color: '#DC0000',
                    fontSize: 16,
                    fontFamily: fonts.SEMIBOLD,
                  }}>
                  Bank Offer :
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontFamily: fonts.SEMIBOLD,
                    }}>
                    {' '}
                    5% Instant discount on SBI Cashback Card Transcations
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  top: 20,
                  padding: 10,
                  // borderBottomWidth: 1,
                  borderColor: '#e4e4e4',
                  flexDirection: 'row',
                  paddingRight: 10,
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}>
                <Text
                  style={{
                    color: '#DC0000',
                    fontSize: 16,
                    fontFamily: fonts.SEMIBOLD,
                  }}>
                  Bank Offer :
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontFamily: fonts.SEMIBOLD,
                    }}>
                    {' '}
                    5% Instant discount on SBI Cashback Card Transcations
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                top: 30,
                width: '100%',
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={{fontFamily: fonts.SEMIBOLD}}>
                  Checkout Price :{' '}
                </Text>
                <FontAwesome5 name="rupee-sign" size={13} color="#F05935" />
                <Text style={{fontSize: 18, color: '#F05935', left: 5}}>
                  {productInfo.MRP * qty}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (qty > 0) {
                      removeFromCart(ProductNo);
                    }
                  }}
                  style={{
                    backgroundColor: '#35CBC4',
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    elevation: 5,
                    marginRight: 10,
                  }}>
                  <Text style={{fontSize: 25, color: '#fff'}}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    elevation: 5,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 16, color: '#000'}}>{qty}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    addToCart(ProductNo, 'nbtn');
                    // setQty(qty + 1);
                  }}
                  style={{
                    backgroundColor: '#35CBC4',
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    elevation: 5,
                  }}>
                  <Text style={{fontSize: 25, color: '#fff'}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                top: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPressIn={() => {
                  if (user) {
                    addToCart(ProductNo, 'btn');
                  } else {
                    addToGuestCart(productInfo[0]);
                  }
                }}
                style={{
                  backgroundColor: '#35CBC4',
                  paddingVertical: 10,
                  // paddingHorizontal: 30,
                  width: '45%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Text style={{color: '#fff', fontFamily: fonts.SEMIBOLD}}>
                  Add to cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressIn={() => {
                  navigation.navigate('Cart');
                }}
                style={{
                  backgroundColor: 'orange',
                  paddingVertical: 10,
                  // paddingHorizontal: 40,
                  width: '45%',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Text style={{color: '#fff', fontFamily: fonts.SEMIBOLD}}>
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: 3,
              backgroundColor: '#ccc',
            }}></View>
          <View
            style={{
              marginTop: 5,
              paddingHorizontal: 20,
              backgroundColor: '#fff',
            }}>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: '#000',
                fontSize: 18,
              }}>
              Related Products
            </Text>
            <View style={{height: 220}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{}}>
                {productInfo && productInfo.RelatedProducts.length > 0
                  ? productInfo.RelatedProducts.map((item, index) => {
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
                            style={{
                              borderRadius: 5,
                              height: '80%',
                              width: '100%',
                            }}
                            // source={item.img}
                            source={{
                              uri: `data:image/jpeg;base64,${item.ProductImage}`,
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
                              // color: '#4e4e4e',
                              alignSelf: 'center',
                              fontSize: 12,
                            }}>
                            {item.PackingType} | {item.Volume}
                          </Text>
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </ScrollView>
            </View>
            {/* <TouchableOpacity
            style={{flexDirection: 'row', alignSelf: 'flex-end', top: -5}}
            onPress={() => {
              navigation.navigate('Product', {type: 'health'});
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
              More ...
            </Text>
          </TouchableOpacity> */}
          </View>

          {productInfo && productInfo.QuestionAndAnswers.length > 0 ? (
            <View style={{padding: 20, borderTopWidth: 1, borderColor: '#ccc'}}>
              <Text
                style={{
                  fontFamily: fonts.BOLD,
                  paddingBottom: 10,
                  color: '#000',
                  fontSize: 18,
                }}>
                Customer Questions
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  padding: 15,
                }}>
                {productInfo.QuestionAndAnswers.map((item, index) => {
                  return (
                    <View key={index} style={{paddingVertical: 10}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontFamily: fonts.SEMIBOLD,
                        }}>
                        Q :{item.Question}{' '}
                      </Text>
                      <Text style={{fontSize: 14, fontFamily: fonts.REGULAR}}>
                        <Text style={{color: '#000'}}>A : </Text>
                        {item.Answer}{' '}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : null}
          {/* <View
          style={{
            marginTop: 5,
            paddingVertical: 10,
            backgroundColor: '#FBFBFB',
            // backgroundColor: '#f2f0f0',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#000',
              fontSize: 18,
              left: 10,
            }}>
            You might also like
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
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/hairoil.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Ayurvedic
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: -10,
                  }}>
                  hair oil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDescription', {
                    img: require('../../../assests/images/apex/FMCG/panchagavya.png'),
                  });
                }}
                style={{
                  padding: 5,
                  elevation: 0,
                  margin: 5,
                  marginLeft: 15,
                  height: 150,
                  width: 150,
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/panchagavya.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Pancha Gavya
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
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/panchagavyapack.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Pancha Gavya
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#000',
                    top: -10,
                  }}>
                  Pack of 5
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
                  backgroundColor: 'white',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: '#e5e5e5',
                }}>
                <Image
                  style={{borderRadius: 5, height: '70%', width: '100%'}}
                  resizeMode="center"
                  source={require('../../../assests/images/apex/FMCG/teapowder.png')}
                />
                <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                  Action Premium Quality
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              top: 0,
              right: 10,
            }}
            onPress={() => {
              navigation.navigate('Product', {type: 'fmcg'});
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', right: 10}}>
              More ...
            </Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {errorMessage ? <Text>{errorMessage}</Text> : <Text>Loading</Text>}
        </View>
      )}
      {user ? <Footer /> : null}
    </View>
  );
}

function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 10,
  },
  card: {
    width: width - 40,
    height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  indicatorConatiner: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  dot: {
    margin: 2,
    color: '#ccc',
  },
  dotActive: {
    margin: 2,
    color: '#000',
  },
  wrapDot: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});
