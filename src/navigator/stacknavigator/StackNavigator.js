import {
  LoginScreen,
  SignUpScreen,
  ResetPassword,
  SplashScreen,
  OtpScreen,
  ProductScreen,
  CartScreen,
  AddressScreen,
  ProfileScreen,
  PaymentScreen,
  PreviousOrdersScreen,
  FavouriteOrdersScreen,
  AddressBookScreen,
  ProfileEditingScreen,
  PaymentSuccessfulScreen,
  OrderSummaryScreen,
  MenuScreen,
  SettingsScreen,
  PasswordsScreen,
  HomeScreen,
  MyOrders,
  OrderDetails,
  ProductDescription,
  Carousal,
  IdActivationPage,
  IdConfirmationScreen,
  WalletReportScreen,
  WalletsScreen,
  BankDetailsScreen,
  PanCardScreen,
  BusinessScreen,
  BusinessMenu,
  DailySalesScreen,
  TeamAtAGlanceScreen,
  TeamBusinessScreen,
  TeamMemberDataScreen,
  PayoutScreen,
  PaymentInformationScreen,
  PaymentInformationLogScreen,
  DetailPaymentInformationScreen,
  SuccessPaymentScreen,
  FundsTransferScreen,
  BankToBankTransferScreen,
  BankToBankTransferConfirmScreen,
  CeilingUpgradationScreen,
  // MyBusinessScreen,
  Footer,
  NetworkError,
  PayoutTimeErrorScreen,
  MyGroup,
  MyEarnings,
} from '../../screens';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../tabnavigator/TabNavigator';

const Stack = createNativeStackNavigator();

export const AuthScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AppScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="PreviousOrders" component={PreviousOrdersScreen} />
        <Stack.Screen
          name="FavouriteOrders"
          component={FavouriteOrdersScreen}
        />
        <Stack.Screen name="AddressBook" component={AddressBookScreen} />
        <Stack.Screen name="ProfileEditing" component={ProfileEditingScreen} />
        <Stack.Screen name="Success" component={PaymentSuccessfulScreen} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PasswordsScreen" component={PasswordsScreen} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />

        <Stack.Screen
          name="ProductDescription"
          component={ProductDescription}
        />
        <Stack.Screen name="Carousal" component={Carousal} />

        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

        <Stack.Screen name="IdActivationPage" component={IdActivationPage} />
        <Stack.Screen name="IdConfirmation" component={IdConfirmationScreen} />
        <Stack.Screen name="WalletReport" component={WalletReportScreen} />
        <Stack.Screen name="Wallets" component={WalletsScreen} />
        <Stack.Screen name="BankDetails" component={BankDetailsScreen} />
        <Stack.Screen name="PanCard" component={PanCardScreen} />
        <Stack.Screen name="BusinessScreen" component={BusinessScreen} />
        <Stack.Screen name="BusinessMenu" component={BusinessMenu} />
        <Stack.Screen name="DailySales" component={DailySalesScreen} />
        <Stack.Screen name="AtAGlance" component={TeamAtAGlanceScreen} />
        <Stack.Screen name="TeamBusiness" component={TeamBusinessScreen} />
        <Stack.Screen name="TeamMemberData" component={TeamMemberDataScreen} />
        <Stack.Screen name="Payout" component={PayoutScreen} />
        <Stack.Screen name="MyEarnings" component={MyEarnings} />
        {/* <Stack.Screen name="MyBusinessScreen" component={MyBusinessScreen} /> */}

        <Stack.Screen name="PaymentInfo" component={PaymentInformationScreen} />
        <Stack.Screen
          name="PaymentInfoLog"
          component={PaymentInformationLogScreen}
        />
        <Stack.Screen
          name="DetailPaymentInformation"
          component={DetailPaymentInformationScreen}
        />
        <Stack.Screen
          name="SuccessPaymentScreen"
          component={SuccessPaymentScreen}
        />
        <Stack.Screen name="FundsTransfer" component={FundsTransferScreen} />
        <Stack.Screen
          name="BankToBankTransfer"
          component={BankToBankTransferScreen}
        />
        <Stack.Screen
          name="BankToBankTransferConfirm"
          component={BankToBankTransferConfirmScreen}
        />
        <Stack.Screen
          name="CeilingUpgradation"
          component={CeilingUpgradationScreen}
        />
        <Stack.Screen name="Footer" component={Footer} />

        <Stack.Screen name="NetworkError" component={NetworkError} />
        <Stack.Screen
          name="PayoutTimeError"
          component={PayoutTimeErrorScreen}
        />
        <Stack.Screen name="MyGroup" component={MyGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
