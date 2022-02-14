import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import DataContext from '../../context/DataContext';

function BankToBankTransferConfirmScreen({ navigation }) {


    const { authUser, user, userData, logOut, api, url,companyName } = React.useContext(DataContext);
    const [transcationPassword, setTranscationPassword] = useState(null);
    const [showPwd, setShowPwd] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isNetworkConnected, setIsNetworkConnected] = useState(null);






    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                if (state.isConnected) {
                    setIsNetworkConnected(state.isConnected);
                }

            } else {
                setIsNetworkConnected(false);
            }
        });
        if (isNetworkConnected) {

        } else {
            unsubscribe();
        }
    });



    if (isNetworkConnected === false) {
        navigation.navigate('NetworkError')
    }



    if (!user) {
        navigation.navigate('Login');
    }

    return (
        <View style={{ flex: 1, }} >
            {/*================ Header  ================= */}

            <LinearGradient
                colors={['#35CBC4', '#16ABB1']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                }} >
                <View style={{
                    paddingVertical: 13,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}  >
                    <View>
                        <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Payment Details</Text>
                    </View>



                </View>



            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ margin: 20, padding: 10, paddingBottom: 20, elevation: 10, backgroundColor: '#fff', borderRadius: 10 }} >



                <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontSize: 18, marginTop: 10, color: 'orange' }} >Confirm Details</Text>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 30, }} >
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Id : </Text>
                        </View>
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16 }} >9985959242</Text>
                        </View>


                    </View>



                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Name : </Text>
                        </View>
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16 }} >{companyName}</Text>
                        </View>


                    </View>



                </View>
                <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Amount To Transfer :</Text>
                        </View>
                        <View style={{ flex: 1 }} >
                            <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 0 }} >
                                <Text> 1000</Text>
                            </FontAwesome>
                        </View>
                    </View>
                </View>


                <View style={{ paddingHorizontal: 0, paddingTop: 10, alignSelf: 'center', marginTop: 30 }} >
                    <Text style={{ fontSize: 16, alignSelf: 'center', color: '#7c7c7c' }} >Transcation Password </Text>
                    <View>

                    </View>
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        height: 40,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        elevation: 5,
                        backgroundColor: '#fff',
                    }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="lock" size={20} />
                        </View>

                        <View style={{ flex: 1, width: '70%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                            <TextInput
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                value={transcationPassword}
                                secureTextEntry={!showPwd}
                                onChangeText={(text) => { setTranscationPassword(text) }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <Ionicons name={showPwd ? "eye-outline" : "eye-off-outline"} size={20} onPress={() => { setShowPwd(!showPwd) }} />
                        </View>


                    </View>

                </View>
                <TouchableOpacity onPress={() => { confirm() }}>
                    <LinearGradient
                        colors={['#35CBC4', '#16ABB1']}
                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                        style={{
                            paddingHorizontal: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            width: 200,
                            borderRadius: 15,
                            alignSelf: 'center',
                            marginTop: 30
                        }} >


                        <View style={{ paddingLeft: 0 }} >
                            <Text style={{ fontSize: 18, color: '#fff' }} >Confirm</Text>
                        </View>


                    </LinearGradient>
                </TouchableOpacity>

                {
                    errorMessage ?
                        <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                            <Text style={{ color: 'red' }} >{errorMessage}</Text>
                        </View>
                        : null
                }

            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default BankToBankTransferConfirmScreen

