import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomeScreen, SearchScreen, OffersScreen, DineInScreen } from '../../screens';
import TabNavigator from '../tabnavigator/TabNavigator';


export default function DrawerNavigator() {

  const Drawer = createDrawerNavigator();


  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} >
      <Drawer.Screen name="Tab" component={TabNavigator} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Offers" component={OffersScreen} />
      <Drawer.Screen name="DineIn" component={DineInScreen} />
    </Drawer.Navigator>
  );
}