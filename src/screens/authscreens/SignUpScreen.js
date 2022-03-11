import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import DataContext from '../../context/DataContext';
import {fonts} from 'react-native-elements/dist/config';

const SignUpScreen = ({navigation}) => {
  const {companyName, fonts} = React.useContext(DataContext);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [check, setCheck] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [referalCode, setReferalCode] = useState(null);
  const [mentor, setMentorAvailable] = useState({
    available: false,
    notavailable: false,
  });

  const {height, width} = Dimensions.get('window');
  const SIZES = {height, width};
  const COLORS = {
    primary: '#19BABD',
    secondary: '#1F5DAB',
    blue: 'blue',
    white: '#ffff',
    black: '#000',
  };

  function submit() {
    if (userName === null || userName === undefined || userName === '') {
      alert('Enter User Name');
      return;
    }

    if (
      phoneNumber === null ||
      phoneNumber === undefined ||
      phoneNumber === ''
    ) {
      alert('Enter Mobile Number');
      return;
    }

    if (mentor.available === false && mentor.notavailable === false) {
      alert('Select Whether you have mentor or not');
    }

    if (mentor.available) {
      let data = {
        userName,
        email,
        phoneNumber,
        referalCode,
      };
      // axios.post('http://192.168.0.123:3000/ala/api/registration', data).then((res) => { console.log(JSON.stringify(res)) })
    }
  }

  function referalCheck() {
    axios.post(api + url.ReferralCheck);
  }

  function RadioSelected() {
    return (
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: '#000',
          }}></View>
      </View>
    );
  }

  function RadioUnSelected() {
    return (
      <View
        style={{
          height: 15,
          width: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: '#000',
          }}></View> */}
      </View>
    );
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#19BABD',
        // alignItems: 'center'
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          // backgroundColor: 'blue',
          // position: 'absolute',
          height: SIZES.height,
          width: SIZES.width,
        }}>
        <View
          style={{
            height: '20%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              left: '20%',
              // top: '-2%',
              marginTop: '-5%',
              height: 47,
              width: 47,
              borderRadius: 47 / 2,
              backgroundColor: '#FB6C2F',
            }}></View>
          <View
            style={{
              // left: '130%',
              // marginTop: '0%',
              marginRight: '-15%',
              marginTop: '-10%',
              height: 150,
              width: 150,
              borderRadius: 150 / 2,
              backgroundColor: '#009CF3',
            }}></View>
        </View>
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: 'transparent',
          }}></View>
        <View
          style={{
            flexDirection: 'column',
            height: '30%',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: '85%',
              height: 47,
              width: 47,
              borderRadius: 47 / 2,
              backgroundColor: '#C8FCFF',
            }}></View>
          <View
            style={{
              marginLeft: '-15%',
              marginTop: '10%',
              height: 150,
              width: 150,
              borderRadius: 150 / 2,
              backgroundColor: '#005B5F',
            }}></View>
        </View>
      </View>

      <View style={{height: '100%', width: '100%', position: 'absolute'}}>
        <View
          style={{
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 24}}>Lets get Started</Text>
          <Text style={{fontSize: 16}}>
            Create an Account to get all features
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              height: 50,
              width: '80%',
              backgroundColor: '#fff',
              borderRadius: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
              }}>
              <MaterialCommunityIcons name="account" color="black" size={25} />
            </View>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }}>
              <TextInput
                style={{fontFamily: fonts.SEMIBOLD, color: '#000'}}
                placeholderTextColor="#e5e5e5"
                placeholder="User Name"
                value={userName}
                onChangeText={text => {
                  setUserName(text);
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: '80%',
              marginTop: 20,
              backgroundColor: '#fff',
              borderRadius: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
              }}>
              <MaterialCommunityIcons name="email" color="black" size={25} />
            </View>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }}>
              <TextInput
                style={{fontFamily: fonts.SEMIBOLD, color: '#ccc'}}
                placeholder="Email Address"
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: '80%',
              marginTop: 20,
              backgroundColor: '#fff',
              borderRadius: 50,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
              }}>
              <MaterialCommunityIcons name="phone" color="black" size={25} />
            </View>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }}>
              <TextInput
                style={{fontFamily: fonts.SEMIBOLD, color: '#ccc'}}
                placeholder="Mobile Number"
                onChangeText={text => {
                  setPhoneNumber(text);
                }}
              />
            </View>
          </View>

          <View
            style={{
              height: 50,
              width: '80%',
              marginTop: 20,
              // flexDirection: 'row',
            }}>
            <Text style={{fontSize: 16, fontFamily: fonts.BOLD}}>
              Have Mentor Id
            </Text>
            <View style={{flexDirection: 'row', top: 10}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    setMentorAvailable({
                      available: true,
                      notavailable: false,
                    });
                  }}>
                  {mentor.available ? <RadioSelected /> : <RadioUnSelected />}
                  <Text style={{left: 10}}>Yes</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 50}}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    setMentorAvailable({
                      available: false,
                      notavailable: true,
                    });
                  }}>
                  {mentor.notavailable ? (
                    <RadioSelected />
                  ) : (
                    <RadioUnSelected />
                  )}
                  <Text style={{left: 10}}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {mentor.available ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'blue',
                width: '80%',
              }}>
              <View
                style={{
                  height: 50,
                  width: '100%',
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                  }}>
                  <MaterialCommunityIcons
                    name="account-arrow-right"
                    color="black"
                    size={25}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                  }}>
                  <TextInput
                    placeholder="Mentor ID ? (Optional)"
                    value={referalCode}
                    onChangeText={text => {
                      setReferalCode(text);
                    }}
                  />
                </View>
              </View>
              {/* <TouchableOpacity
                style={{
                  height: 50,
                  width: '25%',
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: '#009CF3',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.SEMIBOLD,
                    color: '#fff',
                  }}>
                  Verify
                </Text>
              </TouchableOpacity> */}
            </View>
          ) : null}
          <View style={{flexDirection: 'row', width: '80%', marginTop: 20}}>
            <View style={{justifyContent: 'flex-start'}}>
              <CheckBox
                checked={check}
                onPress={() => {
                  setCheck(!check);
                }}
              />
            </View>
            <View style={{marginLeft: 0}}>
              <Text style={{fontSize: 12}}>
                I Aggree to the {companyName} terms of Services and Privacy
                Policy
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              submit();
            }}
            style={{
              marginTop: 20,
              height: 50,
              width: '60%',
              backgroundColor: '#000',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 20}}>SignUp</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* End of absolute position */}
    </View>
  );
};

export default SignUpScreen;
