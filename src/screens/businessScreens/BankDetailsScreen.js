
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

import DataContext from '../../context/DataContext';

function BankDetailsScreen({ navigation }) {

    const { authUser, user, userData, logOut, url, api, TokenIDN } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }
            
    const [bankDetails, setBankDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [accountNo, setAccounNo] = useState(null);
    const [bankName, setBankName] = useState(null);
    const [branch, setBranch] = useState(null);
    const [ifscCode, setIfscCode] = useState(null);
    const [payeeName, setPayeeName] = useState(null);
    const [txnPwd, setTxnPwd] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
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

        if (bankDetails) {
            setAccounNo(bankDetails.AccountNo);
            setBankName(bankDetails.BankName);
            setBranch(bankDetails.Branch);
            setIfscCode(bankDetails.IFSCCode);
            setPayeeName(bankDetails.PayeeName);
        }
    }, [bankDetails])

    useEffect(() => {
        let data = {
            InputType: "GET",
            TokenID: user.TokenId
        }
        axios.post(api + url.BankDetails, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setBankDetails(res.data[0].BankInfo[0])
                }
                else if (res.data[0].Status === 'Failure') {
                    if (res.data[0].Response === "Server is busy, please try again later") {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        setErrorMessage(res.data[0].Response);
                    }

                }
            })
            .catch((err) => { setErrorMessage(err.message) })
    }, [])


    const submit = () => {
        if (!txnPwd || txnPwd === '') {
            setErrorMessage("Please Enter Transaction Password");
        }
        else if (payeeName === null || payeeName === '' || payeeName === 'N.A.' || accountNo === null || accountNo === '' || accountNo === ' N.A.' || bankName === null || bankName === '' || bankName === 'N.A.' || branch === null || branch === '' || branch === 'N.A.' || ifscCode === null || ifscCode === '' || ifscCode === 'N.A.') {
            setErrorMessage("Please Enter all fields");
        }
        else {
            let data = {
                InputType: 'UPDATE',
                PayeeName: payeeName,
                AccountNo: accountNo,
                BankName: bankName,
                Branch: branch,
                IFSCCode: ifscCode,
                TransactionPassword: txnPwd,
                TokenID: user.TokenId
            }

            axios.post(api + url.BankDetails, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setSuccessMessage(res.data[0].Response);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        if (res.data[0].Response === "Server is busy, please try again later") {
                            navigation.navigate('PayoutTimeError');
                        }
                        else {
                            setSuccessMessage(null);
                            setErrorMessage(res.data[0].Response);
                        }
                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }
    }

    if (bankDetails) {
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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Bank Details</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}


                {/* ==================  Body  ======================= */}

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center', paddingVertical: 20 }} >

                    <View style={{
                        paddingHorizontal: 0,
                        width: '100%',
                        borderRadius: 10,
                        // elevation: 5,
                        // backgroundColor: '#fff',
                        flexDirection: 'row'
                    }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Add/Update Bank Details</Text>
                    </View>

                    <View style={{
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        marginTop: 20,
                        width: '100%',
                        borderRadius: 10,
                        elevation: 5,
                        backgroundColor: '#fff',
                        paddingBottom: 30
                    }} >

                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Payee Name</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        value={payeeName === 'N.A.' ? '' : payeeName} onChangeText={(text) => { setPayeeName(text) }} />

                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Account No</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        value={accountNo === 'N.A.' ? '' : accountNo} onChangeText={(text) => { setAccounNo(text) }} />

                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Bank Name</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        value={bankName === 'N.A.' ? '' : bankName} onChangeText={(text) => { setBankName(text) }} />

                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Branch Name</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        value={branch === 'N.A.' ? '' : branch} onChangeText={(text) => { setBranch(text) }} />

                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >IFSC Code </Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        value={ifscCode === 'N.A.' ? '' : ifscCode} onChangeText={(text) => { setIfscCode(text) }} />

                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Transaction Password  </Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1,
                                flexDirection: 'row'
                            }} >
                                <View style={{ height: '100%', width: '90%' }} >
                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        secureTextEntry={!showPassword}

                                        value={txnPwd} onChangeText={(text) => { setTxnPwd(text) }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        onPress={() => { setShowPassword(!showPassword) }} />
                                </View>
                            </View>
                        </View>

                        {
                            errorMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'red' }} >{errorMessage}</Text>
                                </View> : null
                        }
                        {
                            successMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'green',
                                    justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'green' }} >{successMessage}</Text>
                                </View> : null
                        }





                        <LinearGradient
                            colors={['#35CBC4', '#16ABB1']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                                borderRadius: 50,
                                alignSelf: 'center'
                            }} >
                            <View style={{
                                paddingVertical: 13,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}  >

                                <TouchableOpacity
                                    onPress={() => { submit() }}
                                    style={{ alignItems: 'center', }} >

                                    <Text style={{ color: COLORS.white, fontSize: 18 }} >Save</Text>
                                </TouchableOpacity>
                            </View>


                        </LinearGradient>

                    </View>
                </ScrollView>
                {/* ====================  End Of Body ===================== */}
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading....</Text>
            </View>
        )
    }
}

export default BankDetailsScreen













