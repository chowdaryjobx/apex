import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DataContext from '../../context/DataContext';

const Tab = createMaterialTopTabNavigator();

const data = [
  {
    id: 1,
    name: 'Jhonson',
    team: 'a',
  },
  {
    id: 2,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 3,
    name: 'Jhonson',
    team: 'a',
  },
  {
    id: 4,
    name: 'Jhonson',
    team: 'b',
  },
  {
    id: 5,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 6,
    name: 'Jhonson',
    team: 'a',
  },
  {
    id: 7,
    name: 'Jhonson',
    team: 'b',
  },
  {
    id: 8,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 9,
    name: 'Jhonson',
    team: 'a',
  },
  {
    id: 10,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 11,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 12,
    name: 'Jhonson',
    team: 'a',
  },
  {
    id: 13,
    name: 'Jhonson',
    team: null,
  },
  {
    id: 14,
    name: 'Jhonson',
    team: 'b',
  },
  {
    id: 15,
    name: 'Jhonson',
    team: 'b',
  },
];

function MyGroup({navigation}) {
  const {
    user,
    cartItems,
    userData,
    productStatus,
    companyName,
    url,
    api,
    products,
    addToCart,
    brands,
    font_desc,
    fonts,
  } = React.useContext(DataContext);

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
              My Group
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          height: '92%',
          width: '100%',
          backgroundColor: '#fff',
        }}>
        <MyTabs />
      </View>
    </View>
  );
}

export default MyGroup;

function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item, index) => {
        if (item.team === null) {
          return (
            <View
              key={index}
              style={{
                padding: 10,
                paddingVertical: 30,
                backgroundColor: 'lightblue',
              }}>
              <Text>HomeScreen - {item.id}</Text>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}
function SettingsScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item, index) => {
        if (item.team === 'a') {
          return (
            <View
              key={index}
              style={{
                padding: 10,
                paddingVertical: 30,
                backgroundColor: 'lightblue',
              }}>
              <Text>HomeScreen - {item.id}</Text>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}
function Settings() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data.map((item, index) => {
        if (item.team === 'b') {
          return (
            <View
              key={index}
              style={{
                padding: 10,
                paddingVertical: 30,
                backgroundColor: 'lightblue',
              }}>
              <Text>HomeScreen - {item.id}</Text>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UnSet" component={HomeScreen} />
      <Tab.Screen name="Alpha" component={SettingsScreen} />
      <Tab.Screen name="Beta" component={Settings} />
    </Tab.Navigator>
  );
}
