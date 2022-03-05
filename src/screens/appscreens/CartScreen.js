import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Dimensions,
} from 'react-native';
import {BottomSheet, CheckBox} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS, SIZES} from '../../constants';
import DataContext from '../../context/DataContext';

const HEIGHT = Dimensions.get('window').height;

function CartScreen({navigation}) {
  const {
    user,
    userData,
    increaseProducts,
    decreaseProducts,
    removeProduct,
    cartItems,
    guestCartItems,
    addToGuestCart,
    guestIncreaseProducts,
    guestDecreaseProducts,
    guestRemoveProduct,
    // emptyCart,
    deliverableAddresses,
    companyName,
    fonts,
  } = React.useContext(DataContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [tip, setTip] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [
    cookingInstructionsBottomSheet,
    setCookingInstructionsBottomSheet,
  ] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [refresh, setRefresh] = useState(false);
  let total = 0;
  let quantity = 0;
  if (user) {
    quantity = cartItems.length;
    cartItems.map(item => {
      total += item.inCart * item.mrp;
    });

    if (tip !== null) {
      {
        total += tip;
      }
    }
  } else {
    quantity = guestCartItems.length;
    guestCartItems.map(item => {
      total += item.inCart * item.mrp;
    });

    if (tip !== null) {
      {
        total += tip;
      }
    }
  }

  if (couponValue) {
    total = total - couponValue;
  }

  const [couponValue, setCouponValue] = useState(null);
  const [couponCode, setCouponCode] = useState('NEWBEE');

  const [userCoupon, setUserCoupon] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [coupons, setCoupons] = useState([
    {
      coupon: 'ALA300',
      value: 300,
      expireDate: '31st MARCH 2022',
      expireTime: '11:59 PM',
      selected: false,
    },
    {
      coupon: 'NEW100',
      value: 100,
      expireDate: '31st FEB 2022',
      expireTime: '11:59 PM',
      selected: false,
    },
    {
      coupon: 'A200',
      value: 200,
      expireDate: '31st APRIL 2022',
      expireTime: '11:59 PM',
      selected: false,
    },
  ]);

  const alterCoupons = index => {
    coupons.map((item, i) => {
      if (index === i) {
        coupons[index].selected = !coupons[index].selected;
      } else {
        coupons[i].selected = false;
      }
    });

    setRefresh(!refresh);
  };

  function checkCoupon() {
    if (userCoupon === couponCode) {
      setCouponValue(2400);
      setErrorMessage(null);
    } else {
      setErrorMessage('Sorry, This coupon is not available');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#F4F4F4'}}>
      <BottomSheet
        isVisible={cookingInstructionsBottomSheet}
        containerStyle={{}}>
        <View
          style={{
            height: HEIGHT,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>
            <ScrollView style={{padding: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="arrowleft"
                  size={20}
                  colors="#000"
                  onPress={() => {
                    setCookingInstructionsBottomSheet(false);
                  }}
                />
                <Text style={{fontSize: 16, fontFamily: fonts.BOLD, left: 20}}>
                  Apply Coupon
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '70%',
                  }}>
                  <TextInput
                    placeholder="Coupon Code"
                    value={userCoupon}
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#e4e4e4',
                      borderRadius: 5,
                      paddingLeft: 20,
                    }}
                    onChangeText={text => {
                      setUserCoupon(text);
                    }}
                  />
                  {errorMessage ? (
                    <Text
                      style={{
                        color: 'red',
                        fontFamily: fonts.SEMIBOLD,
                        left: 15,
                      }}>
                      {errorMessage}
                    </Text>
                  ) : null}
                </View>
                <TouchableOpacity
                  onPress={() => {
                    checkCoupon();
                  }}
                  style={{width: '20%', justifyContent: 'center'}}>
                  <Text
                    style={{
                      color: '#19BABD',
                      fontSize: 16,
                      fontFamily: fonts.SEMIBOLD,
                    }}>
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View style={{backgroundColor: '#fff', marginTop: 10}}>
              {coupons.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      paddingRight: 20,
                      paddingBottom: 30,
                      borderBottomWidth: 1,
                      borderColor: '#e4e4e4',
                      paddingTop: 10,
                    }}>
                    <View>
                      <CheckBox
                        checkedColor="#19BABD"
                        checked={item.selected}
                        onPress={() => {
                          alterCoupons(index);
                          setCouponValue(item.value);
                        }}
                      />
                    </View>

                    <View style={{paddingRight: 20}}>
                      <View style={{width: '50%'}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: fonts.BOLD,
                            borderWidth: 1,
                            borderColor: item.selected ? '#19BABD' : '#989898',
                            borderStyle: 'dashed',
                            paddingHorizontal: 40,
                            paddingVertical: 10,
                            borderRadius: 5,
                            color: item.selected ? '#19BABD' : '#989898',
                          }}>
                          {item.coupon}
                        </Text>
                      </View>
                      <View style={{marginTop: 10}}>
                        <Text style={{color: '#000'}}>
                          Save Rs. {item.value}
                        </Text>
                        <Text style={{color: '#000', top: 10}}>
                          Rs. 300 off on minimum purchase of Rs.1999. Expires
                          on:
                          {item.expireDate} | {item.expireTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={{
              alignSelf: 'flex-end',
              height: '8%',
              width: '100%',
              backgroundColor: '#fff',
              flexDirection: 'row',
              elevation: 5,
            }}>
            <View
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: fonts.SEMIBOLD, top: -2}}>
                Maximum Savings
              </Text>
              <Text style={{fontFamily: fonts.SEMIBOLD, top: -2}}>
                Rs.{couponValue}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCookingInstructionsBottomSheet(false);
              }}
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: '#19BABD',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.BOLD,
                  top: -2,
                  color: '#fff',
                }}>
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>

      <StatusBar
        backgroundColor={'#fff'}
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#F4F4F4',
          paddingLeft: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <AntDesign
          name="arrowleft"
          size={20}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            height: 0.07 * SIZES.height,
            width: 0.8 * SIZES.width,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{fontSize: 16, fontWeight: '500', fontFamily: fonts.BOLD}}>
            {companyName}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontFamily: fonts.MEDIUM}}>
              {user ? cartItems.length : guestCartItems.length} items, To Pay :
            </Text>
            <FontAwesome
              name="rupee"
              size={14}
              color="black"
              style={{marginLeft: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontFamily: fonts.SEMIBOLD,
                }}>
                {' '}
                {total}
              </Text>
            </FontAwesome>
          </View>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F4F4F4',
            marginTop: 5,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <EvilIcons name="location" size={20} color="#35CBC4" />
            <Text style={{left: 10}}>Your in a new location ?</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                // user ? navigation.navigate('Address') : navigation.navigate('Login')
              }}
              style={{
                borderRadius: 5,
                margin: 10,
                flex: 1,
                borderWidth: 1,
                borderColor: '#35CBC4',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#35CBC4',
                  fontFamily: fonts.SEMIBOLD,
                  top: -2,
                }}>
                SELECT ADDRESS
              </Text>
              {user ? (
                <Text style={{fontSize: 8, color: '#35CBC4'}}>
                  {/* {userData.address} */}
                </Text>
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // user ? navigation.navigate('Address') : navigation.navigate('Login')
              }}
              style={{
                backgroundColor: '#35CBC4',
                borderRadius: 5,
                margin: 10,
                flex: 1,
                borderWidth: 1,
                borderColor: '#F4F4F4',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#fff',
                  fontFamily: fonts.SEMIBOLD,
                  top: -2,
                }}>
                Add New ADDRESS
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {user ? (
          cartItems.length == 0 ? (
            <View
              style={{
                padding: 20,
                width: '100%',
                backgroundColor: '#fff',
                top: 10,
                bottom: 10,
              }}>
              <Text style={{color: 'gray'}}>Please add items to cart</Text>
            </View>
          ) : null
        ) : guestCartItems.length === 0 ? (
          <View
            style={{
              padding: 20,
              width: '100%',
              backgroundColor: '#fff',
              top: 10,
              bottom: 10,
            }}>
            <Text style={{color: 'gray'}}>Please add items to cart</Text>
          </View>
        ) : null}

        {user
          ? cartItems.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      top: 5,
                      height: 0.15 * SIZES.height,
                      width: SIZES.width,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#F4F4F4',
                    }}>
                    <View style={{flex: 0.4}}>
                      <Image
                        style={{
                          height: '100%',
                          width: '60%',
                          resizeMode: 'stretch',
                          borderRadius: 1,
                        }}
                        source={item.img}
                      />
                    </View>
                    <View style={{flex: 0.6}}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: fonts.BOLD,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            fontFamily: fonts.SEMIBOLD,
                          }}>
                          {item.weight}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          justifyContent: 'space-between',
                          top: 15,
                          alignItems: 'center',
                        }}>
                        <FontAwesome name="rupee" size={14} color="black">
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 16,
                              fontFamily: fonts.SEMIBOLD,
                            }}>
                            {' '}
                            {item.mrp * item.inCart}
                          </Text>
                        </FontAwesome>
                        {quantity > 0 ? (
                          <View
                            style={{
                              marginLeft: 20,
                              alignItems: 'center',
                              height: 30,
                              width: 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (item.inCart > 0) {
                                    guestDecreaseProducts(index);
                                  }
                                }}
                                style={{
                                  backgroundColor: '#35CBC4',
                                  paddingHorizontal: 5,
                                  borderRadius: 5,
                                  elevation: 5,
                                  marginRight: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  name="minus"
                                  size={20}
                                  color="#fff"
                                />
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
                                <Text style={{fontSize: 16, color: '#000'}}>
                                  {item.inCart}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  guestIncreaseProducts(index);
                                }}
                                style={{
                                  backgroundColor: '#35CBC4',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  borderRadius: 5,
                                  elevation: 5,
                                  marginRight: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  style={{}}
                                  name="plus"
                                  size={20}
                                  color="#fff"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              addToCart(item);
                            }}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              bottom: 15,
                              alignSelf: 'center',
                              height: 30,
                              width: 80,
                              elevation: 2,
                              backgroundColor: '#fff',
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: '#2E9E07',
                                fontSize: 18,
                                fontWeight: 'bold',
                              }}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          : guestCartItems.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      top: 5,
                      height: 0.15 * SIZES.height,
                      width: SIZES.width,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#F4F4F4',
                    }}>
                    <View style={{flex: 0.4}}>
                      <Image
                        style={{
                          height: '100%',
                          width: '60%',
                          resizeMode: 'stretch',
                          borderRadius: 1,
                        }}
                        source={item.img}
                      />
                    </View>
                    <View style={{flex: 0.6}}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '400',
                            fontFamily: fonts.BOLD,
                          }}>
                          {item.title}
                        </Text>
                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            fontFamily: fonts.SEMIBOLD,
                          }}>
                          {item.weight}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#fff',
                          justifyContent: 'space-between',
                          top: 15,
                          alignItems: 'center',
                        }}>
                        <FontAwesome name="rupee" size={14} color="black">
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 16,
                              fontFamily: fonts.SEMIBOLD,
                            }}>
                            {' '}
                            {item.mrp * item.inCart}
                          </Text>
                        </FontAwesome>
                        {quantity > 0 ? (
                          <View
                            style={{
                              marginLeft: 20,
                              alignItems: 'center',
                              height: 30,
                              width: 100,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  if (item.inCart > 0) {
                                    decreaseProducts(index);
                                  }
                                }}
                                style={{
                                  backgroundColor: '#35CBC4',
                                  paddingHorizontal: 5,
                                  borderRadius: 5,
                                  elevation: 5,
                                  marginRight: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  name="minus"
                                  size={20}
                                  color="#fff"
                                />
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
                                <Text style={{fontSize: 16, color: '#000'}}>
                                  {item.inCart}
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => {
                                  increaseProducts(index);
                                }}
                                style={{
                                  backgroundColor: '#35CBC4',
                                  paddingHorizontal: 10,
                                  paddingVertical: 5,
                                  borderRadius: 5,
                                  elevation: 5,
                                  marginRight: 10,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <AntDesign
                                  style={{}}
                                  name="plus"
                                  size={20}
                                  color="#fff"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              addToCart(item);
                            }}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              bottom: 15,
                              alignSelf: 'center',
                              height: 30,
                              width: 80,
                              elevation: 2,
                              backgroundColor: '#fff',
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: '#2E9E07',
                                fontSize: 18,
                                fontWeight: 'bold',
                              }}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}

        <View
          style={{
            marginTop: 15,
            paddingVertical: 10,
            width: SIZES.width,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              borderRadius: 1,
            }}
            source={require('../../assests/extras/offerc.png')}
          />
          <TouchableOpacity
            onPress={() => {
              setCookingInstructionsBottomSheet(true);
            }}
            style={{flex: 1, paddingLeft: 20, flexDirection: 'row'}}>
            <Text style={{fontSize: 15, fontFamily: fonts.BOLD, top: -3}}>
              Apply Coupon
            </Text>
          </TouchableOpacity>
          <EvilIcons name="chevron-right" size={50} />
        </View>
        <View
          style={{
            marginTop: 12,
            width: SIZES.width,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              paddingBottom: 5,
              fontFamily: fonts.BOLD,
            }}>
            Bill Details
          </Text>
          <View style={{flex: 1, paddingVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  paddingBottom: 2,
                  fontFamily: fonts.SEMIBOLD,
                }}>
                Item Total
              </Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 15, fontFamily: fonts.SEMIBOLD}}>
                  {' '}
                  {total}.00
                </Text>
              </FontAwesome>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
              }}>
              <Text style={{fontSize: 14, fontFamily: fonts.SEMIBOLD}}>
                Delivery Charges
              </Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 15, fontFamily: fonts.SEMIBOLD}}>
                  {' '}
                  0.00
                </Text>
              </FontAwesome>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
              }}>
              <Text style={{fontSize: 14, fontFamily: fonts.SEMIBOLD}}>
                Coupon Discount
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#85CDBA'}}>- </Text>
                <FontAwesome name="rupee" size={14} color="#85CDBA">
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: fonts.SEMIBOLD,
                      color: '#85CDBA',
                    }}>
                    {' '}
                    {couponValue}.00
                  </Text>
                </FontAwesome>
              </View>
            </View>
            {tip && isEnabled ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 2,
                }}>
                <Text style={{fontSize: 14}}>Tip to your valet</Text>
                <FontAwesome name="rupee" size={15}>
                  <Text style={{fontSize: 14, fontFamily: fonts.SEMIBOLD}}>
                    {' '}
                    {tip}.00
                  </Text>
                </FontAwesome>
              </View>
            ) : null}
            <View
              style={{
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#F4F4F4',
              }}>
              <Text style={{fontSize: 14, fontFamily: fonts.SEMIBOLD}}>
                Taxes
              </Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 15, fontFamily: fonts.SEMIBOLD}}>
                  {' '}
                  0.00
                </Text>
              </FontAwesome>
            </View>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <Text
                style={{fontSize: 18, color: '#000', fontFamily: fonts.BOLD}}>
                Grand Total
              </Text>
              <FontAwesome name="rupee" size={16} color="#000">
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    color: '#000',
                    fontFamily: fonts.BOLD,
                  }}>
                  {' '}
                  {total}.00
                </Text>
              </FontAwesome>
            </View>
          </View>
        </View>
        {/* <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: 'gray',
            }}>
            {companyName}
          </Text>
          <Text style={{fontSize: 14, fontStyle: 'italic', color: 'gray'}}>
            your almost there to get your product.
          </Text>
        </View> */}
      </ScrollView>
      <View
        style={{
          width: SIZES.width,
          flexDirection: 'row',
        }}>
        <View
          style={{
            padding: 5,
            flex: 0.5,
            backgroundColor: '#fff',
            paddingLeft: 20,
            justifyContent: 'center',
          }}>
          <FontAwesome name="rupee" size={15} color="#2E9E07">
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                color: '#2E9E07',
                fontFamily: fonts.SEMIBOLD,
              }}>
              {' '}
              {total}.00
            </Text>
          </FontAwesome>
          <Text
            style={{
              fontSize: 14,
              color: '#2E9E07',
              fontFamily: fonts.SEMIBOLD,
              top: -2,
            }}>
            View Detail Bill
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            user
              ? navigation.navigate('Payment', {total})
              : navigation.navigate('Login');
          }}
          style={{
            padding: 5,
            flex: 0.5,
            backgroundColor: '#2E9E07',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              fontFamily: fonts.BOLD,
              top: -2,
            }}>
            Proceed To Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CartScreen;
