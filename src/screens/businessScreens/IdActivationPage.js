import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, RefreshControl, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { COLORS, SIZES } from '../../constants';


function IdActivationPage({ navigation }) {

    const [isNetworkConnected, setIsNetworkConnected] = useState(null);

    const { user, api, url } = React.useContext(DataContext);


    if (isNetworkConnected === false) {
        navigation.navigate('NetworkError')
    }
    if (!user) {
        navigation.navigate('Login');
    }

    const [userId, setUserId] = useState(null);
    const [upgradeIdUserDetails, setUpgradeIdUserDeatils] = useState(null);
    const [activationTypes, setActivationTypes] = useState(null);
    const [selectedActivationType, setSelectedActivationType] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

    useEffect(() => {
        filldata();
    }, [user])

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


    function filldata() {
        setErrorMessage(null);
        setUpgradeIdUserDeatils(null);

        if (user) {
            let data = {
                TokenID: user.TokenId
            }
            axios.post(api + url.IDActivationTypes, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        if (res.data[0].Types.length == 1) {
                            setSelectedActivationType(res.data[0].Types[0].TypeNo);
                        }
                        setActivationTypes(res.data[0].Types);

                        //    ==========  this axios is called after the success of Id activationTypes =========

                        axios.post(api + url.CommissionAndMyBankBalance, data)
                            .then((res) => {

                                if (res.data[0].Status === 'Success') {
                                    setWalletBalance(res.data[0].Response);
                                }
                                else if (res.data[0].Status === 'Failure') {
                                    if (res.data[0].Response === "Server is busy, please try again later") {
                                        navigation.navigate('PayoutTimeError');
                                    }
                                    else {
                                        if (res.data[0].Response === "Server is busy, please try again later") {
                                            navigation.navigate('PayoutTimeError');
                                        }
                                        else {
                                            setWalletBalance(null);
                                            setErrorMessage(res.data[0].Response);
                                        }

                                    }

                                }
                            })
                            .catch((err) => {
                                setWalletBalance(null);
                                setErrorMessage(err.message);
                            })

                        //    ==========  end =========


                    }
                    else if (res.data[0].Status === 'Failure') {
                        setWalletBalance(null);
                        setActivationTypes(null);
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => {
                    setWalletBalance(null);
                    setActivationTypes(null);
                    setErrorMessage(err.message);
                })
        }
    }

    function GetSponName(SponID) {
        setErrorMessage(null);
        setUpgradeIdUserDeatils(null);

        if (SponID !== null && SponID.length == 10) {

            setUserId(SponID);

            let data = {
                InputType: 'GET',
                TokenID: user.TokenId,
                UpgradeID: SponID
            }

            axios.post(api + url.IDActivation, data)
                .then((res) => {
                    let data = res.data;
                    if (data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setUpgradeIdUserDeatils(data[0].Response);
                    }
                    else if (data[0].Status === 'Failure') {
                        if (res.data[0].Response === "Server is busy, please try again later") {
                            navigation.navigate('PayoutTimeError');
                        }
                        else {
                            setErrorMessage(data[0].Response);
                        }

                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }
    }


    const submit = () => {

        if (!upgradeIdUserDetails) {
            setErrorMessage("Please Enter valid user Id");
            return
        }
        if (activationTypes[0].TypeNo < 1) {
            setErrorMessage("Please Enter valid activation");
        }

        let data = {
            InputType: "RECHECK",
            TokenID: user.TokenId,
            UpgradeID: userId,
            TypeNo: selectedActivationType
        }

        axios.post(api + url.IDActivation, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    let confirmData = {
                        InputType: "ACTIVATION",
                        TokenID: user.TokenId,
                        UpgradeID: userId,
                        TypeNo: selectedActivationType,
                        Name: upgradeIdUserDetails,
                        WalletBalance: walletBalance,
                        ActivationType: activationTypes.map((item) => {
                            if (item.TypeNo === selectedActivationType) {
                                return "" + item.TypeName + "-" + item.Cost
                            }
                        })
                    }
                    navigation.navigate('IdConfirmation', { data: confirmData });
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



    }

    const onpagerefresh = () => {
        setPagerefreshing(true);
        filldata();
        GetSponName(userId);
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
                    <Text style={{ fontSize: 18, color: '#fff' }} >ID Activation</Text>
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

                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User ID </Text>
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

                                        onChangeText={(text) => { GetSponName(text) }} />
                                </View>

                            </View>
                            {
                                upgradeIdUserDetails ?
                                    <View style={{ flexDirection: 'row', }} >
                                        <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: '300', color: '#7c7c7c' }} >Name  :   </Text>
                                        <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: '300', color: '#000' }} >{upgradeIdUserDetails}</Text>
                                    </View>

                                    : null
                            }
                        </View>
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16 }} >Activation Type </Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 0,
                                backgroundColor: '#fff',
                                borderWidth: 1
                            }} >
                                {
                                    activationTypes ?
                                        activationTypes.length === 1 ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                            <Text>{activationTypes[0].TypeName}  -  {activationTypes[0].Cost}</Text>
                                        </View>
                                            :
                                            <View style={{ flex: 1, justifyContent: 'center' }} >

                                                <Picker
                                                    mode="dropdown"
                                                    selectedValue={selectedActivationType}
                                                    style={{}}
                                                    onValueChange={(itemValue, itemIndex) => setSelectedActivationType(itemValue)}
                                                >
                                                    <Picker.Item
                                                        label="--Activation Type--"
                                                        value={0}
                                                        key={0} />

                                                    {activationTypes ? (

                                                        activationTypes.map((item, index) =>
                                                            <Picker.Item
                                                                label={item.TypeName + " - " + item.Cost}
                                                                value={item.TypeNo}
                                                                key={index + 1} />
                                                        )
                                                    )

                                                        : null
                                                    }


                                                </Picker>
                                            </View>

                                        : null
                                }




                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }} >

                            <Text style={{ fontSize: 16 }} >Wallet Balance  -</Text>
                            <View>
                                <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                    <Text>  {walletBalance ? walletBalance : null}</Text>
                                </FontAwesome>
                            </View>


                        </View>
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

export default IdActivationPage
