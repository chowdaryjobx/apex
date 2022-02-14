import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

function Footer({navigation}) {
  return (
    <View
      style={{
        elevation: 10,
        height: '8%',
        width: '100%',
        backgroundColor: '#fff', // '#1F5DAB',
        flexDirection: 'row',
      }}>
      <View style={{height: '100%', width: '85%', backgroundColor: 'green'}}>
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
              marginLeft: 15,
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
              <FontAwesome name="rupee" size={12} />
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
            <Image
              style={{height: 20, width: 30}}
              resizeMode="stretch"
              source={require('../../assests/tabscreenimages/mybank1.png')}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="rupee" size={12} />
              <Text> {wallet ? wallet.MyBank : null}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
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
                <Text style={{fontSize: 30, color: '#000'}}>A</Text>
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
                      {business ? business.ATeamCount : null}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{fontSize: 12}}>
                      {business ? business.ATeamBusiness : null} BV
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
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
                <Text style={{fontSize: 30, color: '#000'}}>B</Text>
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
                      {business ? business.ATeamBusiness : null} BV
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Payout');
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
            <Image
              style={{height: '80%', width: '80%'}}
              resizeMode="stretch"
              source={require('../../assests/tabscreenimages/withdraw.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              alert('Coordinate');
            }}
            style={{
              paddingLeft: 10,
              height: '85%',
              width: 70,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginLeft: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              style={{height: '80%', width: '80%'}}
              resizeMode="stretch"
              source={require('../../assests/tabscreenimages/bulb.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View
        style={{
          height: '100%',
          width: '15%',
          justifyContent: 'center',
          alignItems: 'center',
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
}

export default Footer;
