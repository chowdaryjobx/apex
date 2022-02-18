import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
} from 'react-native';
import {BottomSheet} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS, SIZES} from '../../constants';
import DataContext from '../../context/DataContext';

function CartScreen({navigation}) {
  const {
    user,
    userData,
    increaseProducts,
    decreaseProducts,
    removeProduct,
    cartItems,
    deliverableAddresses,
    companyName,
  } = React.useContext(DataContext);

  const [tip, setTip] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [
    cookingInstructionsBottomSheet,
    setCookingInstructionsBottomSheet,
  ] = useState(false);
  const [cookingInstructions, setCookingInstructions] = useState('');

  let total = 0;
  let quantity = cartItems.length;
  cartItems.map(item => {
    total += item.inCart * item.mrp;
  });

  if (tip !== null) {
    {
      total += tip;
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#ccc'}}>
      <BottomSheet
        isVisible={cookingInstructionsBottomSheet}
        containerStyle={{}}>
        <View style={{height: 300, backgroundColor: '#fff', padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'green'}}>
                Instruct your Chef{' '}
              </Text>
              <Text style={{fontSize: 14, color: '#ccc'}}>
                Ask your chef in your own way.{' '}
              </Text>
            </View>
            <View>
              <EvilIcons
                name="chevron-down"
                size={40}
                style={{}}
                onPress={() => {
                  setCookingInstructionsBottomSheet(
                    !cookingInstructionsBottomSheet,
                  );
                }}
              />
            </View>
          </View>
          <View>
            <TextInput
              placeholderTextColor="#000"
              style={{color: '#000'}}
              value={cookingInstructions}
              onChangeText={text => {
                setCookingInstructions(text);
              }}
              placeholder="Ex: Add some spicy chilly."
              multiline
              numberOfLines={4}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                top: 10,
                borderRadius: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => {}}
              style={{
                height: 50,
                width: '60%',
                top: 30,
                borderWidth: 1,
                borderColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                alignSelf: 'center',
              }}>
              <Text style={{color: 'green', fontSize: 16}}>Submit</Text>
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
          borderBottomColor: '#ccc',
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
          <Text style={{fontSize: 16, fontWeight: '500'}}>{companyName}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>{cartItems.length} items, To Pay :</Text>
            <FontAwesome
              name="rupee"
              size={14}
              color="black"
              style={{marginLeft: 10}}>
              <Text style={{color: 'black', fontSize: 15}}> {total}</Text>
            </FontAwesome>
          </View>
        </View>
      </View>

      <ScrollView style={{flex: 1}}>
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#ccc',
            top: 3,
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
              <Text style={{fontSize: 12, color: '#35CBC4'}}>
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
                borderColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
              }}>
              <Text style={{fontSize: 12, color: '#fff'}}>Add New ADDRESS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {cartItems.length == 0 ? (
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

        {cartItems.map((item, index) => {
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
                  borderBottomColor: '#ccc',
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
                    <Text style={{fontSize: 16, fontWeight: '400'}}>
                      {item.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      top: 15,
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="rupee" size={14} color="black">
                      <Text style={{color: 'black', fontSize: 14}}>
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
                          elevation: 5,
                          backgroundColor: '#fff',
                          borderRadius: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <AntDesign
                          name="minus"
                          size={20}
                          onPress={() => {
                            if (item.inCart > 0) {
                              decreaseProducts(index);
                            }
                          }}
                        />
                        <Text
                          style={{
                            color: '#2E9E07',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {item.inCart}
                        </Text>
                        <AntDesign
                          name="plus"
                          size={20}
                          onPress={() => increaseProducts(index)}
                        />
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
              {/* <TouchableOpacity
                onPress={() => {
                  setCookingInstructionsBottomSheet(
                    !cookingInstructionsBottomSheet,
                  );
                }}
                style={{
                  height: 0.05 * SIZES.height,
                  width: SIZES.width,
                  paddingHorizontal: 20,
                  backgroundColor: '#F0F3F4',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SimpleLineIcons name="note" size={14} />

                <Text style={{fontSize: 14}}>
                  {' '}
                  Add cooking instructions(optional)
                </Text>
              </TouchableOpacity> */}
            </View>
          );
        })}
        <View
          style={{
            margintop: 10,
            height: 0.05 * SIZES.height,
            width: SIZES.width,
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            style={{
              height: 20,
              width: 20,
              resizeMode: 'stretch',
              borderRadius: 1,
            }}
            source={require('../../assests/extras/offerc.png')}
          />
          <View style={{flex: 1, paddingLeft: 20, flexDirection: 'row'}}>
            <Text style={{fontSize: 14}}>APPLY COUPON</Text>
          </View>
          <EvilIcons name="chevron-right" size={25} />
        </View>
        {/* <View style={{
                    top: 10,
                    height: 0.06 * SIZES.height,
                    width: SIZES.width,
                    backgroundColor: '#fff',
                }} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ color: '#fff', fontSize: 14 }} >Delivery</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 14 }} >Take away</Text>
                        </View>
                    </View>
                </View> */}
        {/* <View style={{
                    top: 15,
                    width: SIZES.width,
                    paddingHorizontal: 20,
                    paddingVertical: 20,
                    backgroundColor: '#fff',
                    justifyContent: 'space-between'
                }} >
                    <View style={{}} >
                        <Text style={{ fontSize: 16, fontWeight: '500' }} >Please tip your valet</Text>
                    </View>
                    <View style={{ paddingVertical: 10 }} >
                        <Text style={{ color: 'gray' }} >Support your valet and make their day! 100% of your tip will be transfered to valet</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={() => { setIsEnabled(true); setTip(10) }} style={{
                            justifyContent: 'center', alignItems: 'center',
                            borderColor: '#ccc',
                            borderRadius: 5,
                            height: 35,
                            // width: 80,
                            elevation: 5,
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            paddingHorizontal: 20
                        }} >
                            <FontAwesome name="rupee" size={13} color="black" >
                                <Text style={{ color: 'black', fontSize: 15 }} > 10</Text>
                            </FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsEnabled(true); setTip(20) }} style={{
                            justifyContent: 'center', alignItems: 'center',
                            borderColor: '#ccc',
                            borderRadius: 5,
                            height: 35,
                            elevation: 5,
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            paddingHorizontal: 20
                        }} >
                            <FontAwesome name="rupee" size={13} color="black" >
                                <Text style={{ color: 'black', fontSize: 15 }} > 20</Text>
                            </FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setIsEnabled(true); setTip(50) }} style={{
                            justifyContent: 'center', alignItems: 'center',
                            borderColor: '#ccc',
                            borderRadius: 5,
                            height: 35,
                            // width: 80,
                            elevation: 5,
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            paddingHorizontal: 20
                        }} >
                            <FontAwesome name="rupee" size={13} color="black" >
                                <Text style={{ color: 'black', fontSize: 15 }} > 50</Text>
                            </FontAwesome>
                        </TouchableOpacity>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            borderColor: '#ccc',
                            borderRadius: 5,
                            height: 35,
                            // width: 80,
                            elevation: 5,
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            paddingHorizontal: 20
                        }} >
                            <Text style={{ color: 'black', fontSize: 15 }} > Other</Text>
                        </View>
                    </View>
                    <View style={{ top: 10, alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => {
                                setTip(null);
                                setIsEnabled(!isEnabled)
                            }}
                            value={isEnabled}
                        />
                        {tip && isEnabled ? <Text style={{ left: 10, color: 'green' }} >Thanks for tipping your valet with  <FontAwesome name="rupee" size={12} color="green" /> {tip}</Text> : null}
                    </View>
                </View> */}
        <View
          style={{
            top: 20,
            width: SIZES.width,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 16, fontWeight: '400', paddingBottom: 5}}>
            Bill Details
          </Text>
          <View style={{flex: 1, paddingVertical: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
              }}>
              <Text style={{fontSize: 14, paddingBottom: 2}}>Item Total</Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 14}}> {total}.00</Text>
              </FontAwesome>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 2,
              }}>
              <Text style={{fontSize: 14}}>Delivery Charges</Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 14}}> 0.00</Text>
              </FontAwesome>
            </View>
            {tip && isEnabled ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 2,
                }}>
                <Text style={{fontSize: 14}}>Tip to your valet</Text>
                <FontAwesome name="rupee" size={14}>
                  <Text style={{fontSize: 14}}> {tip}.00</Text>
                </FontAwesome>
              </View>
            ) : null}
            <View
              style={{
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderColor: '#ccc',
              }}>
              <Text style={{fontSize: 14}}>Taxes</Text>
              <FontAwesome name="rupee" size={14}>
                <Text style={{fontSize: 14}}> 0.00</Text>
              </FontAwesome>
            </View>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>Grand Total</Text>
              <FontAwesome name="rupee" size={16} color="#000">
                <Text style={{color: 'black', fontSize: 18, color: '#000'}}>
                  {' '}
                  {total}.00
                </Text>
              </FontAwesome>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
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
        </View>
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
          <FontAwesome name="rupee" size={14} color="#2E9E07">
            <Text style={{color: 'black', fontSize: 16, color: '#2E9E07'}}>
              {' '}
              {total}.00
            </Text>
          </FontAwesome>
          <Text style={{fontSize: 14, color: '#2E9E07'}}>View Detail Bill</Text>
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
          <Text style={{fontSize: 16, color: '#fff'}}>Proceed To Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CartScreen;
