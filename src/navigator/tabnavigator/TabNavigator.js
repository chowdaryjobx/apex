import React from 'react';
import { Image } from 'react-native';
import { HomeScreen, SearchScreen, OffersScreen, DineInScreen } from '../../screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function TabNavigator() {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          size = focused ? 35 : size;
          iconName = "home";
        } else if (route.name === 'Search') {
          size = focused ? 35 : size;
          iconName = 'shopping-cart';
        } else if (route.name === 'Offers') {
          let path;
          focused ? path = require('../../assests/extras/offerc.png')
            :
            path = require('../../assests/extras/offer.png')
          return (
            <Image style={{
              height: focused ? 30 : 25,
              width: focused ? 30 : 25,
              resizeMode: 'stretch',
              borderRadius: 1,
            }}
              source={path}
            />
          )
        }
        else if (route.name === 'DineIn') {
          let path;
          focused ? path = require('../../assests/extras/dineincolor.png')
            :
            path = require('../../assests/extras/dinein.png')
          // if (focused) {
          return (
            <Image style={{
              height: focused ? 30 : 25,
              width: focused ? 35 : 30,
              resizeMode: 'stretch',
              borderRadius: 1,
            }}
              source={path}
            />
          )
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#23A772',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })} >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="DineIn" component={DineInScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;