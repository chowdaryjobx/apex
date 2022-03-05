import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DataContext from '../../context/DataContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function MyEarnings({navigation}) {
  const {user, fonts} = React.useContext(DataContext);
  const {width, height} = Dimensions.get('screen');
  const WIDTH = width;
  const HEIGHT = height;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          height: '8%',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
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
              My Earnings
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <View
            onPress={() => {
              //   navigation.navigate('ProfileEditing');
            }}
            style={{
              height: (WIDTH * 15) / 100,
              width: (WIDTH * 90) / 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              elevation: 8,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                fontSize: 16,
                top: -3,
                color: '#8F8F8F',
              }}>
              Total Earnings :
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome name="rupee" size={20} color="green" />
              <Text
                style={{
                  fontFamily: fonts.BOLD,
                  fontSize: 18,
                  top: -3,
                  color: 'green',
                }}>
                {''} 300000
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          width: '100%',
          justifyContent: 'space-evenly',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileEditing');
          }}
          style={{
            height: (WIDTH * 35) / 100,
            width: (WIDTH * 28) / 100,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{height: '40%', width: '50%'}}
            resizeMode="contain"
            source={require('../../assests/icons/teamsales.png')}
          />
          <Text
            style={{
              fontFamily: fonts.BOLD,
              fontSize: 12,
              top: 5,
              color: '#8F8F8F',
            }}>
            Team Sales
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <FontAwesome name="rupee" size={14} color="#16ABB1" />
            <Text
              style={{
                fontFamily: fonts.BOLD,
                fontSize: 14,
                top: -2,
                color: '#16ABB1',
              }}>
              {''} 100000
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileEditing');
          }}
          style={{
            height: (WIDTH * 35) / 100,
            width: (WIDTH * 28) / 100,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{height: '40%', width: '50%'}}
            resizeMode="contain"
            source={require('../../assests/icons/refer.png')}
          />
          <Text
            style={{
              fontFamily: fonts.BOLD,
              fontSize: 12,
              top: 5,
              color: '#8F8F8F',
            }}>
            Referal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <FontAwesome name="rupee" size={14} color="#16ABB1" />
            <Text
              style={{
                fontFamily: fonts.BOLD,
                fontSize: 14,
                top: -2,
                color: '#16ABB1',
              }}>
              {''} 100000
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileEditing');
          }}
          style={{
            height: (WIDTH * 35) / 100,
            width: (WIDTH * 28) / 100,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 8,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            style={{height: '40%', width: '70%'}}
            resizeMode="contain"
            source={require('../../assests/icons/franchise.png')}
          />
          <Text
            style={{
              fontFamily: fonts.BOLD,
              fontSize: 12,
              top: 5,
              color: '#8F8F8F',
            }}>
            Franchise
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <FontAwesome name="rupee" size={14} color="#16ABB1" />
            <Text
              style={{
                fontFamily: fonts.BOLD,
                fontSize: 14,
                top: -2,
                color: '#16ABB1',
              }}>
              {''} 100000
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Payout');
        }}
        style={{
          height: '8%',
          width: '90%',
          backgroundColor: '#fff',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 10,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 8,
          flexDirection: 'row',
        }}>
        <Text style={{fontFamily: fonts.BOLD, top: 0, fontSize: 16}}>
          Bank Transfers :{' '}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome name="rupee" size={20} color="green" style={{top: 3}} />
          <Text
            style={{
              fontFamily: fonts.BOLD,
              top: 0,
              fontSize: 20,
              color: 'green',
            }}>
            {''} 1000000
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default MyEarnings;
