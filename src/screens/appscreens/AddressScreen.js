import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AddressScreen({navigation, route}) {
  let ShippingSno = null;
  let type = null;
  if (route.params != undefined) {
    ShippingSno = route.params.ShippingSno;
    type = route.params.type;
  }

  const {user, url, api, fonts, TokenIDN} = React.useContext(DataContext);

  const [name, setName] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [houseNumber, setHouseNumber] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [district, setDistrict] = useState(null);
  const [state, setState] = useState(null);
  const [pincode, setPincode] = useState(null);

  const [address, setAddress] = useState(null);

  const [states, setStates] = useState(null);
  const [districts, setDistricts] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user && address) {
      setName(address.Name);
      setMobileNumber(address.Mobile);
      setHouseNumber(address.HouseNo);
      setLandmark(address.LandMark);
      setStreet(address.Street);
      setCity(address.City);
      setDistrict(address.District);
      setState(address.StateName);
      setPincode(address.Pincode);
    }
  }, [address]);

  useEffect(() => {
    if (user && ShippingSno) {
      axios
        .post(api + url.ShippingAddress, {
          InputType: 'GET',
          TokenID: user.TokenId,
          ShippingSno: ShippingSno,
        })
        .then(res => {
          if (res.data[0].Status === 'Success') {
            setAddress(res.data[0]);
            setErrorMessage(null);
          } else if (res.data[0].Status === 'Failure') {
            setErrorMessage(res.data[0].Response);
            setErrorMessage(res.data[0].Response + ShippingSno);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, [ShippingSno]);

  useEffect(() => {
    axios
      .post(api + url.States, {TokenIDN})
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setStates(res.data[0].States);
          setErrorMessage(null);
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }, []);

  useEffect(() => {
    if (state) {
      axios
        .post(api + url.Districts, {TokenIDN, Statename: state})
        .then(res => {
          if (res.data[0].Status === 'Success') {
            setDistricts(res.data[0].Districts);
            setErrorMessage(null);
          } else if (res.data[0].Status === 'Failure') {
            setErrorMessage(res.data[0].Response);
          }
        })
        .catch(err => {
          setErrorMessage(err.message);
        });
    }
  }, [state]);

  function submit() {
    if (name == null || name == '' || name == undefined) {
      setErrorMessage('Enter Customer Name');
      return;
    } else if (
      mobileNumber == null ||
      mobileNumber == '' ||
      mobileNumber == undefined ||
      mobileNumber.length != 10
    ) {
      setErrorMessage('Enter Mobile Number');
      return;
    } else if (
      houseNumber == null ||
      houseNumber == '' ||
      houseNumber == undefined
    ) {
      setErrorMessage('Enter House/Plot No.');
      return;
    } else if (city == null || city == '' || city == undefined) {
      setErrorMessage('Enter City');
      return;
    } else if (district == null || district == '' || district == undefined) {
      setErrorMessage('Enter District');
      return;
    } else if (state == null || state == '' || state == undefined) {
      setErrorMessage('Select State');
      return;
    } else if (
      pincode == null ||
      pincode == '' ||
      pincode == undefined ||
      pincode.length != 6
    ) {
      setErrorMessage('Enter Pincode');
      return;
    }

    setErrorMessage(null);

    let params = null;

    if (type === 'update') {
      params = {
        InputType: 'UPDATE',
        TokenID: user.TokenId,
        ShippingSno: ShippingSno,
        Name: name,
        HouseNo: houseNumber,
        Street: street,
        LandMark: landmark,
        City: city,
        StateName: state,
        District: district,
        Pincode: pincode,
        Mobile: mobileNumber,
      };
    }
    if (type === 'add') {
      params = {
        InputType: 'ADD',
        TokenID: user.TokenId,

        Name: name,
        HouseNo: houseNumber,
        Street: street,
        LandMark: landmark,
        City: city,
        StateName: state,
        District: district,
        Pincode: pincode,
        Mobile: mobileNumber,
      };
    }

    axios
      .post(api + url.ShippingAddress, params)
      .then(res => {
        if (res.data[0].Status === 'Success') {
          setErrorMessage(null);
          setSuccessMessage(res.data[0].Response);
        } else if (res.data[0].Status === 'Failure') {
          setErrorMessage(res.data[0].Response);
        }
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
  }

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
              Delivery Address
            </Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView style={{flex: 1, padding: 20}}>
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          {errorMessage ? (
            <View style={{padding: 20, borderColor: '#ccc'}}>
              <View
                style={{
                  borderColor: 'red',
                  fontFamily: fonts.BOLD,
                  fontSize: 18,
                  borderWidth: 1,
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'red'}}>{errorMessage} </Text>
              </View>
            </View>
          ) : null}

          {successMessage ? (
            <View style={{padding: 20, borderColor: '#ccc'}}>
              <View
                style={{
                  borderColor: 'green',
                  fontFamily: fonts.BOLD,
                  fontSize: 18,
                  borderWidth: 1,
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'green'}}>{successMessage} </Text>
              </View>
            </View>
          ) : null}

          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              Name <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              value={name}
              onChangeText={text => {
                setName(text);
              }}
              placeholder="Enter Customer Name"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              Mobile Number <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              value={mobileNumber}
              onChangeText={text => {
                setMobileNumber(text);
              }}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              House No. <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              value={houseNumber}
              onChangeText={text => {
                setHouseNumber(text);
              }}
              placeholder="Enter House No."
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              Landmark
            </Text>
            <TextInput
              value={landmark}
              onChangeText={text => {
                setLandmark(text);
              }}
              placeholder="EnterLandmark"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              Street
            </Text>
            <TextInput
              value={street}
              onChangeText={text => {
                setStreet(text);
              }}
              placeholder="Enter Street"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              City <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              value={city}
              onChangeText={text => {
                setCity(text);
              }}
              placeholder="Enter City"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              State <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
              }}>
              <Picker
                dropdownIconColor="#000"
                mode="dropdown"
                selectedValue={state}
                style={{flex: 1}}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                <Picker.Item
                  style={{backgroundColor: '#fff', color: '#000'}}
                  label="--Select State--"
                  value={0}
                  key={0}
                />
                {states
                  ? states.map((item, index) => {
                      return (
                        <Picker.Item
                          style={{backgroundColor: '#fff', color: '#000'}}
                          label={item.StateName}
                          value={item.StateName}
                          key={index + 1}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>
          </View>
          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              District <Text style={{color: 'red'}}>*</Text>
            </Text>
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginBottom: 10,
              }}>
              <Picker
                dropdownIconColor="#000"
                mode="dropdown"
                selectedValue={district}
                style={{flex: 1}}
                onValueChange={(itemValue, itemIndex) =>
                  setDistrict(itemValue)
                }>
                <Picker.Item
                  style={{backgroundColor: '#fff', color: '#000'}}
                  label="--Select District--"
                  value={0}
                  key={0}
                />
                {districts
                  ? districts.map((item, index) => {
                      return (
                        <Picker.Item
                          style={{backgroundColor: '#fff', color: '#000'}}
                          label={item.DistrictName}
                          value={item.DistrictName}
                          key={index + 1}
                        />
                      );
                    })
                  : null}
              </Picker>
            </View>
          </View>

          <View
            style={{borderBottomWidth: 1, padding: 20, borderColor: '#ccc'}}>
            <Text style={{color: '#000', fontFamily: fonts.BOLD, fontSize: 18}}>
              Pincode <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              onChangeText={text => {
                setPincode(text);
              }}
              value={pincode}
              placeholder="Enter Pincode"
              placeholderTextColor="#b5b5b5"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop: 10,
                color: '#000',
              }}
            />
          </View>
        </View>
      </ScrollView>
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
        <TouchableOpacity
          onPress={() => {
            submit();
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: '#fff',
                top: -2,
                fontSize: 18,
              }}>
              {type === 'add'
                ? 'Add Addresss'
                : type === 'update'
                ? 'Update Address'
                : null}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

export default AddressScreen;
