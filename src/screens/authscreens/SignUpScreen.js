import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import DataContext from '../../context/DataContext';

const SignUpScreen = ({navigation}) => {
  const {companyName} = React.useContext(DataContext);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [check, setCheck] = useState(false);
  const [userID, setUserID] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [referalCode, setReferalCode] = useState(null);

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
    let data = {
      userID,
      email,
      phoneNumber,
      referalCode,
    };
    // axios.post('http://192.168.0.123:3000/ala/api/registration', data).then((res) => { console.log(JSON.stringify(res)) })
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
            height: '30%',
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
                placeholder="User ID"
                onChangeText={text => {
                  setUserID(text);
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
                placeholder="Have a referal code ? (Optional)"
                onChangeText={text => {
                  setReferalCode(text);
                }}
              />
            </View>
          </View>
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
