import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";


function BusinessScreen({ navigation }) {

    const { authUser, user, userData, logOut, api, url,companyName } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }

    const [wallets, setWallets] = useState(null);
    const [business, setBusiness] = useState(null);
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
    }, [])


    function filldata() {
        let data = { TokenID: user.TokenId }
        axios.post(api + url.MyBusiness, data)
            .then((res) => {
                if (res.data[0].Status == 'Success') {
                    setErrorMessage(null);
                    setBusiness(res.data[0]);
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
        setPagerefreshing(false);
    }

    if (business) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', }} >
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
                            <Text style={{ color: COLORS.white, fontSize: 18 }} >{companyName} </Text>
                        </View>
                    </View>
                </LinearGradient>
                {/*================End Of Header  ================= */}

                {/* =============  Body  ================ */}
                <ScrollView refreshControl={<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingBottom: 30 }} >

                        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }} >My Business</Text>

                        <View style={{ marginTop: 10, weight: '100%', backgroundColor: '#fff', borderRadius: 10, elevation: 5 }}  >
                            <TouchableOpacity onPress={() => { navigation.navigate('AtAGlance', { type: 'A' }) }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                    <Text style={{ color: '#7c7c7c' }} >A Team</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.ATeamBusiness + "/" + business.ATeamCount : null}</Text>
                                    </View>
                                </View>
                                <View>
                                    <EvilIcons name="chevron-right" size={40} color="#7c7c7c" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('AtAGlance', { type: 'B' }) }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                    <Text style={{ color: '#7c7c7c' }} >B Team</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >
                                        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.BTeamBusiness + '/' + business.BTeamCount : null}</Text>
                                    </View>
                                </View>
                                <View>
                                    <EvilIcons name="chevron-right" size={40} color="#000" />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('DailySales') }}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                    <Text style={{ color: '#7c7c7c' }} >Daily Sales</Text>
                                </View>
                                <View>
                                    <EvilIcons name="chevron-right" size={40} color="#000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {/* =============  End of Body  ================= */}
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading...</Text>
            </View>
        )

    }



}

export default BusinessScreen



