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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DataContext from '../../context/DataContext';
import {Avatar, Badge, Icon, withBadge} from 'react-native-elements';
import {Rating, RatingProps} from 'react-native-elements';
const {width} = Dimensions.get('window');
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;
export default function ProductDescription({navigation, route}) {
  const latestData = route.params.data;
  const img = route.params.img;

  const {
    user,
    cartItems,
    userData,
    productStatus,
    companyName,
    api,
    url,
  } = React.useContext(DataContext);
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const [mainoffer, setMainOffer] = useState(10);
  const [qty, setQty] = useState(1);
  const [mrp, setMrp] = useState(300);
  const [drc, setDrc] = useState(30);
  const [activeImage, setActiveImage] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [business, setBusiness] = useState(null);

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
  //   [
  //   {
  //     id: 1,
  //     title: 'Alpite',
  //     productBy: 'Apex Market',
  //     description:
  //       'Useful to stimulate pancreas, to generate amount of insulting ...',
  //     bv: 1,
  //     drc: '10%',
  //     mrp: 200,
  //     img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
  //   },
  //   {
  //     id: 2,
  //     title: 'Herbo Flax',
  //     productBy: 'Amazon',
  //     description:
  //       'Useful to stimulate pancreas, to generate amount of insulting ...',
  //     bv: 1,
  //     drc: '10%',
  //     mrp: 200,
  //     img: require('../../../assests/images/apex/HEALTH/herboflax.png'),
  //   },
  //   {
  //     id: 3,
  //     title: 'Kickbags',
  //     productBy: 'Amazon',
  //     description:
  //       'Useful to stimulate pancreas, to generate amount of insulting ...',
  //     bv: 1,
  //     drc: '10%',
  //     mrp: 200,
  //     img: require('../../../assests/images/apex/HEALTH/kickgas.png'),
  //   },
  //   {
  //     id: 4,
  //     title: 'Muscle Oil',
  //     productBy: 'Amazon',
  //     description:
  //       'Useful to stimulate pancreas, to generate amount of insulting ...',
  //     bv: 1,
  //     drc: '10%',
  //     mrp: 200,
  //     img: require('../../../assests/images/apex/HEALTH/muscleoil.png'),
  //   },
  // ]);
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
                <FontAwesome5 name="rupee-sign" size={12} />
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
                <FontAwesome5 name="rupee-sign" size={12} />
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
              <MaterialCommunityIcons name="alpha" size={30} color="#000" />
              <Text style={{fontSize: 12}}>
                S : {business ? business.ATeamBusiness : null}
              </Text>
              {/* <Image
                style={{height: 20, width: 30}}
                resizeMode="stretch"
                source={require('../../assests/tabscreenimages/mybank1.png')}
              /> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text> {wallet ? wallet.MyBank : null}</Text>
              </View> */}
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
              <MaterialCommunityIcons name="beta" size={30} color="#000" />
              <Text style={{fontSize: 12}}>
                S : {business ? business.BTeamBusiness : null}
              </Text>
              {/* <Image
                style={{height: 20, width: 30}}
                resizeMode="stretch"
                source={require('../../assests/tabscreenimages/mybank1.png')}
              /> */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome name="rupee" size={12} />
                <Text> {wallet ? wallet.MyBank : null}</Text>
              </View> */}
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
                <FontAwesome5 name="rupee-sign" size={12} />
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
            opacity: 0.9,
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

      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            paddingHorizontal: 20,
            top: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
            Alpiste
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Rating
              startingValue={4}
              type="star"
              ratingCount={5}
              imageSize={15}
              readonly={true}
              style={{alignSelf: 'center'}}
            />
            <Text> (105)</Text>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 20,
            top: 10,
            paddingBottom: 10,
          }}>
          <Text>
            Useful to stimulate pancreas, to generate amount of insuling Useful
            to stimulate pancreas, to generate amount of insuling, to stimulate
            pancreas, to generate amount of insuling
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
            {img ? (
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
                    source={img}
                    style={{height: '100%', width: '90%'}}
                  />
                </View>
              </View>
            ) : null}

            {latestOffers !== undefined
              ? latestOffers.map((item, index) => {
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
                          source={item.img}
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
            <MaterialIcons
              name="favorite-border"
              style={{marginRight: 20}}
              size={25}
              onPress={() => {
                alert('working on it');
              }}
            />
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
                {latestOffers
                  ? latestOffers.map((e, index) => (
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
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
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
                      fontFamily: 'Poppins-Medium',
                      fontSize: 18,
                      left: 10,
                      color: '#F05935',
                    }}>
                    {mrp}
                  </Text>
                  {/* <Text style={{left: 10}}>(inclusive of all taxes)</Text> */}
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingRight: 10, top: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontFamily: 'Poppins-Medium', fontSize: 18}}>
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
                      fontFamily: 'Poppins-Medium',
                      fontSize: 18,
                      left: 10,
                      color: '#F05935',
                    }}>
                    {drc}
                  </Text>
                </View>
              </View>
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
                borderColor: '#ccc',
                top: 20,
                padding: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}>
              <Text style={{color: '#DC0000', fontSize: 16}}>
                Save Extra{' '}
                <Text style={{color: '#000', fontSize: 12}}>with 2 offers</Text>{' '}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                top: 20,
                padding: 10,
                borderBottomWidth: 1,
                borderColor: '#ccc',
                flexDirection: 'row',
                paddingRight: 10,
              }}>
              <Text style={{color: '#DC0000', fontSize: 16}}>
                Bank Offer :
                <Text style={{color: '#000', fontSize: 14}}>
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
                borderBottomWidth: 1,
                borderColor: '#ccc',
                flexDirection: 'row',
                paddingRight: 10,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}>
              <Text style={{color: '#DC0000', fontSize: 16}}>
                Bank Offer :
                <Text style={{color: '#000', fontSize: 14}}>
                  {' '}
                  5% Instant discount on SBI Cashback Card Transcations
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              top: 30,
              height: 50,
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
              <Text>Checkout Price : </Text>
              <FontAwesome5 name="rupee-sign" size={13} color="#F05935" />
              <Text style={{fontSize: 18, color: '#F05935', left: 5}}>
                {(mrp + drc) * qty}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#ccc',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (qty > 0) {
                    setQty(qty - 1);
                  }
                }}
                style={{
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: 2,
                    width: 15,
                    backgroundColor: 'black',
                  }}></View>
                {/* <Text style={{fontSize: 20}}>-</Text> */}
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20, color: '#60B245'}}>{qty}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setQty(qty + 1);
                }}
                style={{
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 25, color: '#60B245'}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              top: 60,
              flexDirection: 'row',
              // alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <View>
              <TouchableOpacity
                onPressIn={() => {
                  navigation.navigate('Cart');
                }}
                style={{
                  backgroundColor: '#35CBC4',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Text style={{color: '#fff'}}>Add to cart</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPressIn={() => {
                  navigation.navigate('Cart');
                }}
                style={{
                  backgroundColor: '#35CBC4',
                  paddingVertical: 10,
                  paddingHorizontal: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {}}>
                <Text style={{color: 'orange'}}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{paddingHorizontal: 20, top: 60}}>
            <TouchableOpacity
              onPressIn={() => {
                alert('adding into cart');
              }}
              style={{
                backgroundColor: '#35CBC4',
                padding: 10,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {}}>
              <Text style={{color: '#fff'}}>Buy Now</Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{paddingHorizontal: 20, top: 80}}>
         
          </View> */}
        </View>
        <View
          style={{
            width: '100%',
            paddingVertical: 3,
            backgroundColor: '#ccc',
          }}></View>
        <View style={{marginTop: 5, paddingLeft: 10, backgroundColor: '#fff'}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
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
              {latestOffers
                ? latestOffers.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('ProductDescription', {
                            data,
                            // img: require('../../../assests/images/apex/HEALTH/alpiste.png'),
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
                          source={item.img}
                          resizeMode="contain"
                        />
                        <Text
                          style={{fontFamily: 'Poppins-Medium', color: '#000'}}>
                          {item.title} | {item.productBy} | {item.weight}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignSelf: 'flex-end', top: -5}}
            onPress={() => {
              navigation.navigate('Product', {type: 'health'});
            }}>
            <Text style={{fontFamily: 'Poppins-Medium', right: 20}}>
              More ...
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 20, borderTopWidth: 1, borderColor: '#ccc'}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
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
            {customerQuestions.map((item, index) => {
              return (
                <View key={index} style={{paddingVertical: 10}}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Q :{item.q}{' '}
                  </Text>
                  <Text style={{fontSize: 14}}>
                    <Text style={{color: '#000'}}>A : </Text>
                    {item.a}{' '}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
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
