import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

import DataContext from '../../context/DataContext';

const ProfileScreen = ({navigation}) => {
  const {authUser, user, userData, logOut, fontfamily} = React.useContext(
    DataContext,
  );


  const [btn,setBtn]=useState(false);
  const [img,setimg]=useState(require('../../assests/icons/menimage.jpg'))
  let size = 15;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: 10,
          borderBottomWidth: 1,
          borderColor: '#e5e5e5',
          paddingBottom: 40,
        }}>
        <View style={{}}>
          <AntDesign
            name="arrowleft"
            size={20}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileEditing')}
              style={{height: 160, width: 130, top: 20, borderRadius: 10}}>
              {btn ? <LinearGradient
                colors={['#00F28E', '#009FFE']}
                start={{x: 0, y: 0.4}}
                end={{x: 1, y: 0.5}}
                style={{
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}>
                <FontAwesome5
                  name="user-edit"
                  size={50}
                  color="#fff"
                  style={{left: 10}}
                />
              </LinearGradient> : 
              <Image style={{height: '100%', width: '100%',borderRadius:10}} source={img}  />
              }
            </TouchableOpacity>
            <View style={{left: 20, justifyContent: 'center', top: 15}}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#19BABD',
                  fontFamily: fontfamily,
                }}>
                Ramesh
              </Text>
              <Text style={{fontFamily: fontfamily, top: 5}}>
                +91 999855998
              </Text>
              <Text style={{fontFamily: fontfamily, color: '#ccc', top: 5}}>
                Ramesh@gmail.com
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignSelf: 'flex-start', top: 40}}>
          <Entypo
            name="chevron-right"
            size={30}
            color="orange"
            onPress={() => {
              setBtn(!btn)
            }}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          top: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#e5e5e5',
          paddingBottom: 30,
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../assests/icons/boss.png')}
          />
          <Text style={{fontFamily: fontfamily, fontSize: 12, top: 5}}>
            Profile
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 30, width: 30}}
            source={require('../../assests/icons/order.png')}
          />
          <Text style={{fontFamily: fontfamily, fontSize: 12, top: 5}}>
            My Orders
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons name="favorite" size={30} color="#E85858" />
          <Text style={{fontFamily: fontfamily, fontSize: 12, top: 5}}>
            Favourites
          </Text>
        </View>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{height: 30, width: 30}}
            source={require('../../assests/icons/wallet.png')}
          />
          <Text style={{fontFamily: fontfamily, fontSize: 12, top: 5}}>
            My Wallet
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 30}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assests/icons/megaphone.png')}
            />
          </View>
          <Text style={{left: 10}}>Refer & Earn</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assests/icons/compliant.png')}
            />
          </View>
          <Text style={{left: 10}}>Privacy Policy</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assests/icons/terms-and-conditions.png')}
            />
          </View>
          <Text style={{left: 10}}>Terms & Conditions</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assests/icons/call.png')}
            />
          </View>
          <Text style={{left: 10}}>Contact Us</Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          top: 20,
        }}>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: '#e5e5e5',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            paddingTop: 10,
          }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assests/icons/logout.png')}
            />
          </View>
          <Text style={{left: 10}}>Logout</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 10,
    flex: 0.15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
  },
  headerContent1: {
    paddingLeft: 10,
    paddingTop: 10,
    flex: 0.7,
  },
  headerContent2: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePic: {
    height: 100,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '400',
  },
  normalText: {
    fontSize: 14,
  },
  bodyContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
    flex: 0.7,
  },
  bodyRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyText: {
    paddingLeft: 10,
  },
  footerContainer: {
    flex: 0.35,
  },
  footerText: {
    paddingLeft: 35,
  },
});

export default ProfileScreen;
