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
  Alert,
  RefreshControl,
} from 'react-native';
import {BottomSheet, CheckBox} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS, SIZES} from '../../constants';
import DataContext from '../../context/DataContext';
import axios from 'axios';

const HEIGHT = Dimensions.get('window').height;

function CartScreen({navigation}) {
  const {api, url, user, companyName, fonts} = React.useContext(DataContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [tip, setTip] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [
    cookingInstructionsBottomSheet,
    setCookingInstructionsBottomSheet,
  ] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [allAddresses, setAllAddresses] = useState(null);
  const [primary, setPrimary] = useState(null);
  const [primaryAddress, setPrimaryAddres] = useState(null);
  const [Pagerefreshing, setPagerefreshing] = React.useState(false);
  const [qty, setQty] = useState(0);
  const [cartItems, setCartItems] = useState(null);
  const [cartInfo, setCartInfo] = useState(null);

  let total = 0;
  let quantity = 0;

  if (couponValue) {
    total = total - couponValue;
  }

  const [couponValue, setCouponValue] = useState(null);
  const [couponCode, setCouponCode] = useState('NEWBEE');

  const [userCoupon, setUserCoupon] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Do whatever you want
    });
    unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .post(api + url.ShippingAddress, {
          InputType: 'VIEW',
          TokenID: user.TokenId,
        })
        .then(res => {
          if (res.data[0].Status === 'Success') {
            setAddresses(res.data[0]);
          } else if (res.data[0].Status === 'Failure') {
            setErrorMessage(res.data[0].Response);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .post(api + url.ShippingAddress, {
          InputType: 'View',
          TokenID: user.TokenId,
        })
        .then(res => {
          if (res.data[0].Status === 'Success') {
            setAllAddresses(res.data[0].Addresses);
          } else if (res.data[0].Status === 'Failure') {
            setErrorMessage(res.data[0].Response);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, [user, refresh]);

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user]);

  function getCartItems() {
    axios
      .post(api + url.ViewCart, {
        InputType: 'CART',
        TokenID: user.TokenId,
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setErrorMessage(null);
          setCartInfo(res.data[0]);
        } else if (res.data[0].Status === 'Failure') {
          console.log(res.data[0]);
        }
      })
      .catch(err => {
        err.message;
      });
  }

  function updatePrimaryAddress() {
    axios
      .post(api + url.ShippingAddress, {
        InputType: 'SET',
        TokenID: user.TokenId,
        ShippingSno: primary,
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setSuccessMessage(res.data[0].Response);
          setErrorMessage(null);
          setCookingInstructionsBottomSheet(false);
        } else if (res.data[0].Status === 'Failure') {
          setSuccessMessage(null);
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  function deleteAddress(value) {
    Alert.alert(
      'Shipping Address',
      'Are you sure you want to delete', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'OK',
          onPress: () => {
            axios
              .post(api + url.ShippingAddress, {
                InputType: 'DELETE',
                TokenID: user.TokenId,
                ShippingSno: value,
              })
              .then(res => {
                if (res.data[0].Status === 'Success') {
                  setSuccessMessage(res.data[0].Response);
                  setErrorMessage(null);
                  setRefresh(!refresh);
                  // setCookingInstructionsBottomSheet(false);
                } else if (res.data[0].Status === 'Failure') {
                  setSuccessMessage(null);
                  setErrorMessage(res.data[0].Response);
                }
              })
              .catch(err => {
                setErrorMessage(err.message);
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  useEffect(() => {
    getPrimaryAddress();
  }, [refresh]);

  function getPrimaryAddress() {
    axios
      .post(api + url.ShippingAddress, {
        InputType: 'PRIMARY',
        TokenID: user.TokenId,
      })
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setErrorMessage(null);
          setPrimaryAddres(res.data[0].PrimaryAddress);
        } else if (res.data[0].Status === 'Failure') {
          setSuccessMessage(null);
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  const onpagerefresh = () => {
    setPagerefreshing(true);
    setRefresh(!refresh);
    setPagerefreshing(false);
  };

  function addToCart(ProductNo, value) {
    let params = {
      InputType: value,
      TokenID: user.TokenId,
      ProductNo: ProductNo,
      Quantity: '1',
    };

    axios
      .post(api + url.CartItemsAddorMinus, params)
      .then(res => {
        if (res.data[0].Status === 'Success') {
          getCartItems();
          showToastWithGravity('Product  added to cart');
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

  function removeFromCart(ProductNo) {
    Alert.alert(
      'Remove From Cart',
      'Are you sure you want to Remove Item from cart', // <- this part is optional, you can pass an empty string
      [
        {
          text: 'OK',
          onPress: () => {
            let params = {
              InputType: 'REMOVE',
              TokenID: user.TokenId,
              CartItemSno: ProductNo,
            };

            axios
              .post(api + url.ViewCart, params)
              .then(res => {
                console.log(res.data[0]);
                if (res.data[0].Status === 'Success') {
                  getCartItems();
                  showToastWithGravity('Product  removed from cart');
                } else if (res.data[0].Status === 'Failure') {
                  setErrorMessage(res.data[0].Response);
                }
              })
              .catch(err => {
                setErrorMessage(err.message);
              });
          },
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <BottomSheet
        isVisible={cookingInstructionsBottomSheet}
        containerStyle={{}}>
        <View
          style={{
            height: HEIGHT,
            backgroundColor: '#F4F3F3',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: '8%',
              backgroundColor: '#fff',
              justifyContent: 'center',
              paddingLeft: 20,
            }}>
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
                Address Book
              </Text>
            </View>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={Pagerefreshing}
                onRefresh={onpagerefresh}
              />
            }
            contentContainerStyle={{padding: 20}}>
            {allAddresses
              ? allAddresses.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        height: 170,
                        borderRadius: 10,
                        width: '100%',
                        backgroundColor: '#fff',
                        elevation: 5,
                        marginTop: index > 0 ? 20 : 0,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          height: '100%',
                          width: '15%',
                        }}>
                        <CheckBox
                          checkedColor="#19BABD"
                          onPress={() => {
                            setPrimary(item.ShippingSno);
                          }}
                        />
                      </View>
                      <View
                        style={{
                          paddingTop: 10,
                          backgroundColor: '#fff',
                          height: '100%',
                          width: '85%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              height: 30,
                              width: '70%',
                            }}>
                            <Text
                              style={{
                                color: '#000',
                                fontFamily: fonts.BOLD,
                                fontSize: 16,
                              }}>
                              {item.Name}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <View style={{paddingRight: 20}}>
                              <AntDesign
                                name="delete"
                                size={20}
                                onPress={() => {
                                  deleteAddress(item.ShippingSno);
                                }}
                              />
                            </View>

                            <View style={{paddingRight: 10}}>
                              <FontAwesome
                                name="edit"
                                size={20}
                                onPress={() => {
                                  navigation.navigate('Address', {
                                    ShippingSno: item.ShippingSno,
                                    type: 'update',
                                  });
                                }}
                              />
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            // marginLeft: 50,
                          }}>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            {item.HouseNo}
                          </Text>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            , {item.LandMark}
                          </Text>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            , {item.Street},
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            // marginLeft: 50,
                          }}>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            {item.City}
                          </Text>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            , {item.District}
                          </Text>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            , {item.StateName}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            // marginLeft: 50,
                          }}>
                          <Text
                            style={{color: '#000', fontFamily: fonts.SEMIBOLD}}>
                            Pincode : {item.Pincode}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              : null}
          </ScrollView>
          <View
            style={{
              alignSelf: 'flex-end',
              height: '8%',
              width: '100%',
              backgroundColor: '#fff',
              flexDirection: 'row',
              elevation: 5,
            }}>
            {/* <View
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
            </View> */}
            <TouchableOpacity
              onPress={() => {
                updatePrimaryAddress();
                setRefresh(!refresh);
              }}
              style={{
                height: '100%',
                width: '100%',
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
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontFamily: fonts.MEDIUM}}>
              {user ? cartItems.length : null} items, To Pay :
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
          </View> */}
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
                user
                  ? setCookingInstructionsBottomSheet(true)
                  : navigation.navigate('MenuScreen');
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
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                user
                  ? navigation.navigate('Address', {type: 'add'})
                  : navigation.navigate('MenuScreen');
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
                paddingVertical: 10,
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
        {user && primaryAddress != null && primaryAddress.length > 0 ? (
          <View
            style={{
              marginTop: 5,
              paddingVertical: 10,
              width: SIZES.width,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
              borderBottomWidth: 1,
              borderColor: '#ccc',
            }}>
            <Text
              style={{fontFamily: fonts.BOLD, fontSize: 18, color: 'orange'}}>
              Shipping Address
            </Text>
            <Text style={{fontFamily: fonts.BOLD, fontSize: 16, marginTop: 10}}>
              {primaryAddress[0].Name}
            </Text>
            <Text
              style={{fontFamily: fonts.SEMIBOLD, fontSize: 14, marginTop: 5}}>
              {primaryAddress[0].HouseNo}, {primaryAddress[0].LandMark},{' '}
              {primaryAddress[0].City}, {primaryAddress[0].District},
            </Text>
            <Text style={{fontFamily: fonts.SEMIBOLD, fontSize: 14}}>
              {primaryAddress[0].StateName}, {primaryAddress[0].Pincode}
            </Text>
          </View>
        ) : null}

        {
          !user ? (
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

          // guestCartItems.length === 0 ? (
          //   <View
          //     style={{
          //       padding: 20,
          //       width: '100%',
          //       backgroundColor: '#fff',
          //       top: 10,
          //       bottom: 10,
          //     }}>
          //     <Text style={{color: 'gray'}}>Please add items to cart</Text>
          //   </View>
          // ) : null
        }

        {
          user && cartInfo && cartInfo.CartItems.length > 0
            ? cartInfo.CartItems.map((item, index) => {
                return (
                  <View key={index}>
                    <View
                      style={{
                        top: 5,
                        height: 150,
                        width: SIZES.width,
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: '#F4F4F4',
                        // backgroundColor:'blue',
                        // paddingBottom:10
                      }}>
                      <View style={{flex: 0.3}}>
                        <Image
                          style={{
                            height: '100%',
                            width: '60%',
                            resizeMode: 'stretch',
                            borderRadius: 1,
                          }}
                          source={{
                            uri: `data:image/jpeg;base64,${item.ProductImage}`,
                          }}
                        />
                      </View>
                      <View style={{flex: 0.7}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flex: 0.8}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '400',
                                fontFamily: fonts.BOLD,
                              }}>
                              {item.ProductName}
                            </Text>
                          </View>
                          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                            <Entypo
                              name="cross"
                              size={20}
                              onPress={() => {
                                removeFromCart(item.ProductNo);
                              }}
                            />
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: '400',
                              fontFamily: fonts.SEMIBOLD,
                            }}>
                            {item.Volume}
                          </Text>
                          <View style={{}}>
                            <FontAwesome name="rupee" size={14} color="black">
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 16,
                                  fontFamily: fonts.SEMIBOLD,
                                }}>
                                {' '}
                                {item.SubTotal}
                              </Text>
                            </FontAwesome>
                          </View>
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
                              {item.MRP}
                            </Text>
                          </FontAwesome>

                          {
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
                                    if (item.Quantity > 1) {
                                      addToCart(item.ProductNo, 'MINUS');
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
                                    {item.Quantity}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    addToCart(item.ProductNo, 'ADD');
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
                          }
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            : null
          // : guestCartItems.map((item, index) => {
          //     return (
          //       <View key={index}>
          //         <View
          //           style={{
          //             top: 5,
          //             height: 0.15 * SIZES.height,
          //             width: SIZES.width,
          //             paddingHorizontal: 30,
          //             paddingVertical: 10,
          //             backgroundColor: '#fff',
          //             flexDirection: 'row',
          //             borderBottomWidth: 1,
          //             borderBottomColor: '#F4F4F4',
          //           }}>
          //           <View style={{flex: 0.4}}>
          //             <Image
          //               style={{
          //                 height: '100%',
          //                 width: '60%',
          //                 resizeMode: 'stretch',
          //                 borderRadius: 1,
          //               }}
          //               source={item.img}
          //             />
          //           </View>
          //           <View style={{flex: 0.6}}>
          //             <View style={{}}>
          //               <Text
          //                 style={{
          //                   fontSize: 16,
          //                   fontWeight: '400',
          //                   fontFamily: fonts.BOLD,
          //                 }}>
          //                 {item.title}
          //               </Text>
          //             </View>
          //             <View style={{}}>
          //               <Text
          //                 style={{
          //                   fontSize: 14,
          //                   fontWeight: '400',
          //                   fontFamily: fonts.SEMIBOLD,
          //                 }}>
          //                 {item.weight}
          //               </Text>
          //             </View>
          //             <View
          //               style={{
          //                 flexDirection: 'row',
          //                 backgroundColor: '#fff',
          //                 justifyContent: 'space-between',
          //                 top: 15,
          //                 alignItems: 'center',
          //               }}>
          //               <FontAwesome name="rupee" size={14} color="black">
          //                 <Text
          //                   style={{
          //                     color: 'black',
          //                     fontSize: 16,
          //                     fontFamily: fonts.SEMIBOLD,
          //                   }}>
          //                   {' '}
          //                   {item.mrp * item.inCart}
          //                 </Text>
          //               </FontAwesome>
          //               {quantity > 0 ? (
          //                 <View
          //                   style={{
          //                     marginLeft: 20,
          //                     alignItems: 'center',
          //                     height: 30,
          //                     width: 100,
          //                   }}>
          //                   <View
          //                     style={{
          //                       flexDirection: 'row',
          //                     }}>
          //                     <TouchableOpacity
          //                       onPress={() => {
          //                         if (item.inCart > 0) {
          //                           decreaseProducts(index);
          //                         }
          //                       }}
          //                       style={{
          //                         backgroundColor: '#35CBC4',
          //                         paddingHorizontal: 5,
          //                         borderRadius: 5,
          //                         elevation: 5,
          //                         marginRight: 10,
          //                         justifyContent: 'center',
          //                         alignItems: 'center',
          //                       }}>
          //                       <AntDesign
          //                         name="minus"
          //                         size={20}
          //                         color="#fff"
          //                       />
          //                     </TouchableOpacity>
          //                     <View
          //                       style={{
          //                         backgroundColor: '#fff',
          //                         paddingHorizontal: 10,
          //                         borderRadius: 5,
          //                         elevation: 5,
          //                         marginRight: 10,
          //                         justifyContent: 'center',
          //                         alignItems: 'center',
          //                       }}>
          //                       <Text style={{fontSize: 16, color: '#000'}}>
          //                         {item.inCart}
          //                       </Text>
          //                     </View>
          //                     <TouchableOpacity
          //                       onPress={() => {
          //                         increaseProducts(index);
          //                       }}
          //                       style={{
          //                         backgroundColor: '#35CBC4',
          //                         paddingHorizontal: 10,
          //                         paddingVertical: 5,
          //                         borderRadius: 5,
          //                         elevation: 5,
          //                         marginRight: 10,
          //                         justifyContent: 'center',
          //                         alignItems: 'center',
          //                       }}>
          //                       <AntDesign
          //                         style={{}}
          //                         name="plus"
          //                         size={20}
          //                         color="#fff"
          //                       />
          //                     </TouchableOpacity>
          //                   </View>
          //                 </View>
          //               ) : (
          //                 <TouchableOpacity
          //                   onPress={() => {
          //                     addToCart(item);
          //                   }}
          //                   style={{
          //                     justifyContent: 'center',
          //                     alignItems: 'center',
          //                     bottom: 15,
          //                     alignSelf: 'center',
          //                     height: 30,
          //                     width: 80,
          //                     elevation: 2,
          //                     backgroundColor: '#fff',
          //                     borderRadius: 5,
          //                   }}>
          //                   <Text
          //                     style={{
          //                       color: '#2E9E07',
          //                       fontSize: 18,
          //                       fontWeight: 'bold',
          //                     }}>
          //                     Add
          //                   </Text>
          //                 </TouchableOpacity>
          //               )}
          //             </View>
          //           </View>
          //         </View>
          //       </View>
          //     );
          //   })
        }

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
                  {cartInfo !== null ? cartInfo.ItemsTotal : null}.00
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
                  {cartInfo !== null ? cartInfo.DeliveryCharges : null}.00
                </Text>
              </FontAwesome>
            </View>
            {/* <View
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
            </View> */}
            {/* {tip && isEnabled ? (
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
            ) : null} */}
            {/* <View
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
            </View> */}
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
                  {cartInfo !== null ? cartInfo.GrandTotal : null}
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
        {/* <View
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
        </View> */}
        <TouchableOpacity
          onPress={() => {
            user
              ? navigation.navigate('Payment', {total})
              : navigation.navigate('Login');
          }}
          style={{
            padding: 15,
            flex: 1,
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
