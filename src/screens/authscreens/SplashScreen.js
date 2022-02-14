import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';


function SplashScreen({ navigation }) {

    return (


        <View style={styles.container}>
            {/* <View style={{ flex: 1 }} > */}
            <View style={{ height: '35%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <View style={{ height: '65%', width: '100%' }}>
                <View style={{ height: '30%', width: '100%', alignItems: 'center', justifyContent: 'center' }} >

                    <View style={{ height: '90%', backgroundColor: 'white', borderRadius: 100 }} >
                        <Image source={require('../../assests/extras/arafahlogo1.png')} resizeMode="stretch" style={{}} />
                    </View>
                </View>
                <View style={{ height: '35%', width: '100%', justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, }} >We’re glad that you’re here!</Text>
                    <Text style={{ fontSize: 18, }} >We provide you the fresh and</Text>
                    <Text style={{ fontSize: 18, }} >pesticide free natural food for </Text>
                    <Text style={{ fontSize: 18, }} >healthy living</Text>
                </View>
                <View style={{ height: '35%', width: '100%', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Login Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ marginTop: 10, width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Create Account</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ height: '35%', width: '100%', position: 'absolute', backgroundColor: 'transparent' }} >
               <View style={{flex:0.3}}>

               </View>
               <View style={{flex:1}}>
               <Text style={styles.welcomeText} >Welcome</Text>
                <Text style={styles.headingText} >Arafah Food Delivery </Text>
                <Text style={styles.headingText} >and dine In App</Text>
               </View>
             
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    welcomeText: {
        fontSize: 40,
        color: '#fff',
        paddingLeft:20
    },
    headingText: {
        fontSize: 20,
        color: '#fff',
        paddingLeft:20
    }
})

export default SplashScreen
