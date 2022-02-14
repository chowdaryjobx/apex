import React from 'react';
import { View, Text, Image } from 'react-native';

const PaymentSuccessfulScreen = ({ navigation }) => {


    setTimeout(() => { navigation.navigate('Home') }, 5000)


    return (
        <View style={{ flex: 1, }}  >

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#fff' }} >
                <Image source={require('../../assests/gif/success.gif')} style={{ height: 200, width: 200 }} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }} >
                <Text style={{ fontSize: 16, marginTop: 30 }} >Order Placed Successfully!</Text>
            </View>
        </View>
    )
}


export default PaymentSuccessfulScreen;