import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OtpScreen({ navigation, route }) {

    const { api, url, authUser } = React.useContext(DataContext);
    const { user } = route.params;


    const [otp, setOtp] = useState(null);
    const [timer, setTimer] = useState(60);


    const [otpErr, setOtpErr] = useState(null);
    const [errMessage, setErrMessage] = useState(null)






    setTimeout(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }

    }, 1000);


    useEffect(() => {
        setOtpErr(null);
        setErrMessage(null);
    }, [otp])

    const resendOtp = () => {

        let data = {
            Name: user.Name,
            Mobile: user.Mobile,
            Email: user.Email,

            TokenIDN: user.TokenIDN
        }

        axios.post(api + url.ResendOTP, data)
            .then((res) => {
                let data = res.data;
                if (data[0].Status === "Success") {
                    setTimer(60);
                    setErrMessage(null);
                }
                else if (data[0].Status === 'Failure') {
                    setTimer(60)
                    setErrMessage(data[0].Response)

                }
            })
            .catch((err) => { setErrMessage(err.message) })

    }


    const storeData = async (user) => {
        try {
            await AsyncStorage.setItem('LOGGEDUSER', JSON.stringify(user))
        } catch (e) {
            setErrMessage(e);
        }
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('LOGGEDUSER')
            if (value !== null) {
                let data = JSON.parse(value);
                // authUser(data);
                // navigation.navigate('Home');
                return data;
            }
            else {
                return null;
            }
        } catch (e) {
            setErrMessage(e.message)
        }
    }

    const registerUser = () => {


        let data = {
            Name: user.Name,
            Mobile: user.Mobile,
            Email: user.Email,
            Sponsor: user.Sponsor,
            Placement: user.Placement,
            Otp: otp,
            TokenIDN: user.TokenIDN
        }

        if (otp === null || otp.length !== 6) {
            setOtpErr("Enter valid Otp");
        } else {
            axios.post(api + url.Registration, data)
                .then((res) => {
                    let data = res.data;
                    if (data[0].Status === 'Success') {
                        setErrMessage(null);
                        let user = {
                            TokenId: data[0].TokenID,
                            // Name: data[0].Name,
                            // Mobile: data[0].Mobile,
                            // Email: data[0].Email
                        }
                        storeData(user).then(() => {

                            authUser(user);
                            navigation.navigate('Home');
                        })

                    }
                    else if (data[0].Status === 'Failure') {
                        setErrMessage(data[0].Response);
                    }
                })
                .catch((err) => { setErrMessage(err.message) })
        }


    }






    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }} >
            <View style={{ flex: 0.3, backgroundColor: '#fff' }} >
                <View style={{ flex: 0.2, }} >
                    <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                </View>
                <View style={{ flex: 0.8, backgroundColor: '#fff' }} >
                    <Image source={require('../../assests/extras/otpScreenImg.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                </View>
            </View>
            <View style={{ flex: 0.6, top: 10 }} >
                <Text style={{ fontSize: 22, alignSelf: 'center', paddingTop: 10 }} >Verification Code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center', paddingTop: 20 }} >We have sent you the verification code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center' }} >to your mobile number</Text>

                <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 40 }} >+91 {user.Mobile} <AntDesign name="edit" size={25} onPress={() => { navigation.navigate('SignUp') }} /> </Text>

                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    height: 50,
                    width: '60%',
                    elevation: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: 30
                }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                        <Text>OTP : </Text>
                    </View>
                    <View style={{ width: '70%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                        <TextInput
                            placeholderTextColor="#000"
                            style={{ color: '#000' }}
                            // placeholder="Enter Otp"
                            onChangeText={(text) => { setOtp(text) }}
                            value={otp}
                            maxLength={6}
                        />
                    </View>
                </View>

                {
                    otpErr ? <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'red' }} >{otpErr}</Text>
                    </View> : null
                }

                <View style={{ marginTop: 20, alignItems: 'center' }} >

                    {timer > 0 ?
                        <View>
                            <Text>You can request OTP in - {timer}</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => { resendOtp() }} >
                            <LinearGradient
                                colors={['#62B742', '#23A26F']}
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                                style={{ width: 0.4 * SIZES.width, height: 0.05 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 16, color: '#fff' }}  >Resend OTP</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }


                </View>
                {
                    errMessage ?
                        <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                            <Text style={{ color: 'red' }} >{errMessage}</Text>
                        </View>
                        : null
                }

                <View style={{ marginTop: 30, alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => registerUser()} >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OtpScreen
