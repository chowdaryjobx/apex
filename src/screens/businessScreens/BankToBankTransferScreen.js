import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, RefreshControl, ScrollView } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import DataContext from '../../context/DataContext';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

import { COLORS, SIZES } from '../../constants'

function BankToBankTransferScreen({ navigation }) {



    const { user, api, url } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }

    const [userId, setUserId] = useState(null);
    const [bankBalance, setBankBalance] = useState(5000);
    const [transferAmount, setTransferAmount] = useState(null);

    const [userIdError, setUseridError] = useState(null);
    const [transferAmountError, setTransferAmountError] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

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


    useEffect(() => {
        filldata();
    }, [user])

    function filldata() {


    }


    const submit = () => {

        if (userId == null || userId === undefined || userId == '' || userId == ' ' || userId.length !== 10) {
            setUseridError("Enter user Id")
            return
        }
        else {
            setUseridError(null)
        }

        if (transferAmount == null || transferAmount == undefined || transferAmount == '') {
            setTransferAmountError("Enter amount")
            return
        } else {
            setTransferAmountError(null)
        }

        navigation.navigate('BankToBankTransferConfirm');


        console.log(bankBalance);
        console.log(userId);
        console.log(transferAmount);

    }

    const onpagerefresh = () => {
        setPagerefreshing(true);
        filldata();
        setPagerefreshing(false);
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >

            {/* =================   Header     ================== */}


            <LinearGradient
                colors={['#35CBC4', '#16ABB1']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                }} >

                <View>
                    <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                </View>
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontSize: 18, color: '#fff' }} >Bank To Bank Transfer</Text>
                </View>


            </LinearGradient>

            {/* ================= End of  Header     ================== */}

            {/* =================   Body     ================== */}
            <ScrollView refreshControl={<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <View style={{ margin: 30, padding: 10, elevation: 10, backgroundColor: '#fff', borderRadius: 10 }} >

                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }} >

                            <Text style={{ fontSize: 16 }} >Bank Balance  -</Text>
                            <View>
                                <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                    <Text>  {bankBalance ? bankBalance : null}</Text>
                                </FontAwesome>

                            </View>


                        </View>


                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#000' }} >User ID </Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                                <View style={{ flex: 1, width: '90%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        keyboardType="number-pad"

                                        onChangeText={(text) => { setUserId(text) }} />
                                </View>

                            </View>
                            {user ? <View style={{ paddingHorizontal: 0, paddingTop: 10, }} >
                                <Text style={{ fontSize: 14 }} >Name :  User</Text>
                            </View> : null}
                        </View>


                        {userIdError ? <View style={{
                            marginTop: 10,
                            height: 40,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            borderWidth: 1, borderColor: 'red',
                            alignSelf: 'center'
                        }} >
                            <Text style={{ color: 'red' }} >{userIdError}</Text>

                        </View> : null}



                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#000' }} >Amount</Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                                <View style={{ flex: 1, width: '90%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        keyboardType="number-pad"

                                        onChangeText={(text) => { setTransferAmount(text) }} />
                                </View>

                            </View>

                        </View>
                        {transferAmountError ? <View style={{
                            marginTop: 20,
                            height: 40,
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            borderWidth: 1, borderColor: 'red',
                            alignSelf: 'center'
                        }} >
                            <Text style={{ color: 'red' }} >{transferAmountError}</Text>

                        </View> : null}

                        <TouchableOpacity onPress={() => { submit() }}>
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
                                    marginTop: 20
                                }} >


                                <View style={{ paddingLeft: 0 }} >
                                    <Text style={{ fontSize: 18, color: '#fff' }} >Submit</Text>
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



                </View>
            </ScrollView>


            {/* =================  End of Body  ================== */}


        </View>
    )

}

export default BankToBankTransferScreen


