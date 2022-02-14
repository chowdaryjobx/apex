import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import DataContext from '../../context/DataContext';
import axios from 'axios';


function ResetPassword({ navigation }) {

    const { TokenIDN, api, url } = React.useContext(DataContext);


    const [phoneNumber, setPhoneNumber] = useState('');


    const [phoneNumberError, setPhoneNumberError] = useState(null);

    const [errMessage, setErrMessage] = useState(null);




    useEffect(() => {
        setErrMessage(null);
        if (phoneNumber !== '') {
            var regex = /^[6-9][0-9]{9}$/;
            if (!regex.test(phoneNumber)) {
                setPhoneNumberError("invalid mobile")

            }
            else {
                setPhoneNumberError(null)

            }

        }

    }, [phoneNumber])



    const Submit = () => {

        if (!phoneNumber || phoneNumberError) {
            setPhoneNumberError('Enter valid Phone Number');
        }
        else {
            const user = {
                UserMobile: phoneNumber,
                TokenIDN
            }
            resetPassword(user);
        }
    }



    const resetPassword = (user) => {
        axios.post(api + url.Forgot, user)
            .then((res) => {

                let data = res.data;
                // console.log(data);
                if (data[0].Status === 'Success') {
                    setErrMessage(null);
                    if (data[0].Response) {
                        navigation.navigate('Login', { user })
                    }
                }
                else if (data[0].Status === 'Failure') {
                    setErrMessage(data[0].Response);
                }

            })
            .catch((err) => setErrMessage(err.message))
    }






    return (
        <View style={styles.container}>
            <View style={{ height: '30%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', }}>
                <View style={{ paddingTop: 30, flex: 1, width: '100%', backgroundColor: 'transparent', marginTop: 100, alignItems: 'center' }}>


                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput 
                        placeholderTextColor="#000"
                        style={{ color: '#000' }}
                            keyboardType="number-pad" placeholder="Phone Number" onChangeText={(text) => {
                                setPhoneNumberError(null);
                                setPhoneNumber(text)
                            }} value={phoneNumber} />
                        </View>

                    </View>

                    {
                        phoneNumberError ? <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }} >{phoneNumberError}</Text>
                        </View> : null
                    }




                </View>
                {
                    errMessage ?
                        <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                            <Text style={{ color: 'red' }} >{errMessage}</Text>
                        </View>
                        : null
                }
                <View style={{ paddingTop: 30, flex: 0.3, width: '100%', alignItems: 'center', backgroundColor: '#fff' }} >
                    <TouchableOpacity onPress={() => { Submit() }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                        <Text>Got Password ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                            <Text style={{ color: "#26A36C" }} >Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: '25%', width: '100%', position: 'absolute', backgroundColor: 'transparent' }} >
                <View style={{ flex: 0.5 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeText} >Reset Password</Text>
                    <Text style={styles.headingText} >Please fill your details</Text>
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
        fontSize: 30,
        color: '#fff',
        paddingLeft: 20
    },
    headingText: {
        fontSize: 15,
        color: '#fff',
        paddingLeft: 20
    },

    inputContainer1: {
        backgroundColor: 'blue',
        flexDirection: 'row',
        height: 50,
        width: '70%',
        justifyContent: 'center',

        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff',
        marginBottom: 10

    },

})

export default ResetPassword;
