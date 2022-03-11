import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataContext from '../../context/DataContext';

const LoginScreen = ({navigation}) => {
  const {
    user,
    Err,
    TokenIDN,
    api,
    url,
    authUser,
    currentAppVersion,
  } = React.useContext(DataContext);

  const {height, width} = Dimensions.get('window');
  const SIZES = {height, width};

  const [userId, setUserId] = useState(9393910169);
  const [password, setPassword] = useState('alamarket');
  const [isLoading, setIsLoading] = useState(null);
  const [passwordShown, setPasswordShown] = useState(true);
  const [userIdError, setUserIdError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  console.log(errorMessage);
  const storeData = async user => {
    try {
      await AsyncStorage.setItem('LOGGEDUSER', JSON.stringify(user));
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('LOGGEDUSER');
      if (value !== null) {
        let data = JSON.parse(value);
        authUser(data);
        // navigation.goBack();
        navigation.navigate('Home');
      } else {
        setErrorMessage('No data found');
      }
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const submit = () => {
    // if (userId !== null) {
    //   var regex = /^[6-9][0-9]{9}$/;
    //   if (!regex.test(userId)) {
    //     setUserIdError('Invalid mobile');
    //     return;
    //   } else {
    //     setUserIdError(null);
    //   }
    // }

    if (userId === null) {
      setUserIdError('Enter Valid Mobile Number');
    } else if (password === null || password === '') {
      setPasswordError('Enter Valid Password');
    } else {
      setIsLoading(true);
      let user = {
        UserMobile: userId,
        Password: password,
        TokenIDN,
      };
      axios
        .post(api + url.Login, user)
        .then(res => {
          let data = res.data;
          if (data[0].Status === 'Success') {
            console.log('data' + data);
            setErrorMessage(null);
            setIsLoading(false);
            let user = {
              TokenId: data[0].Response,
            };
            storeData(user).then(() => {
              getData();
              setIsLoading(false);
            });
          } else if (data[0].Status === 'Failure') {
            setIsLoading(false);
            setErrorMessage(data[0].Response);
          }
        })
        .catch(err => {
          setIsLoading(false);
          setErrorMessage(err.message);
        });
    }
  };

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
            height: '40%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 130,
              width: 130,
              borderRadius: 130 / 2,
              backgroundColor: '#fff',
            }}>
            <Image
              source={require('../../assests/extras/ala_logo.png')}
              style={{height: 130, width: 130}}
            />
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              height: 50,
              width: '80%',
              marginTop: 0,
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
                style={{color: '#000'}}
                placeholder="User ID"
                value={userId.toString()}
                onChangeText={text => {
                  setUserId(text);
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
              <MaterialCommunityIcons name="lock" color="black" size={25} />
            </View>
            <View
              style={{
                flex: 1,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
              }}>
              <TextInput
                style={{color: '#000'}}
                secureTextEntry={passwordShown}
                placeholder="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                }}
              />
            </View>
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
                name={passwordShown ? 'eye-off' : 'eye'}
                color="black"
                size={25}
                onPress={() => {
                  setPasswordShown(!passwordShown);
                }}
              />
            </View>
          </View>
          {isLoading ? (
            <ActivityIndicator
              style={{marginTop: 10}}
              size="large"
              color="#fff"
              animating={isLoading}
            />
          ) : null}
          <TouchableOpacity
            onPress={() => submit()}
            style={{
              marginTop: 50,
              height: 50,
              width: '60%',
              backgroundColor: '#000',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <TouchableOpacity
              onPress={() => {
                submit();
              }}> */}
            <Text style={{color: '#fff', fontSize: 20}}>Login</Text>
            {/* </TouchableOpacity> */}
          </TouchableOpacity>

          <View style={{marginLeft: 0, flexDirection: 'row', marginTop: 20}}>
            <Text style={{fontSize: 16}}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{fontSize: 16, color: '#fff'}}>Signup </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;
