import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Platform, RefreshControl } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";


function WalletReportScreen({ navigation, route }) {

    const { type } = route.params;

    const { user, api, url,companyName } = React.useContext(DataContext);
    
    if (!user) {
        navigation.navigate('Login');
    }
 
    const [walletReport, setWalletReport] = useState(null);
    const [walletRecords, setWalletRecords] = useState(null);

    const [fromDate, setFromDate] = useState('1/1/1925');
    const [fromDate1, setFromDate1] = useState('1/1/1925');

    const [toDate, setToDate] = useState('1/1/1925');
    const [toDate1, setToDate1] = useState('1/1/1925');

    const [errorMessage, setErrorMessage] = useState(null);
    const [PageIndex, setPageIndex] = useState(null);
    const [TotalPgCount, setTotalPgCount] = useState(1);
    const [Goinputtxt, setGoinputtxt] = useState(1);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

    const [state, setState] = useState({
        date: new Date(),
        mode: 'date',
        show: false
    });

    const [state1, setState1] = useState({
        date: new Date(),
        mode: 'date',
        show: false
    });


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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || state.date;
        setState({ ...state, date: currentDate, show: false });

        let date = new Date(currentDate);
        setFromDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        setFromDate1((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
    };

    const showPicker = currentMode => {
        setState({ ...state, show: true });
    };

    const onChange1 = (event, selectedDate1) => {
        const currentDate1 = selectedDate1 || state1.date;
        setState1({ ...state1, date: currentDate1, show: false });

        let date = new Date(currentDate1);
        setToDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        setToDate1((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
    };

    const showPicker1 = currentMode => {
        setState1({ ...state1, show: true });
    };

    useEffect(() => {
        if (type) {
            let pgi = parseInt(1);
            setPageIndex(pgi);
            setGoinputtxt(pgi);
            filldata(type, fromDate1, toDate1, pgi, user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }, [])

    function filldata(WalType, FrmDt, TDt, PGIndex, TokID) {
        let data = {
            WalletType: WalType,
            FromDate: FrmDt,
            ToDate: TDt,
            PageIndex: PGIndex,
            TokenID: TokID
        }

        axios.post(api + url.Wallet, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setWalletRecords(res.data[0].WalletRecords);
                    setWalletReport(res.data[0]);
                    setTotalPgCount(res.data[0].TotalPages);
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

    const Submit = () => {

        if (type) {

            let pgi = parseInt(1);
            setPageIndex(pgi);
            setGoinputtxt(pgi);
            filldata(type, fromDate1, toDate1, pgi, user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

    const CalendarClr = () => {

      

        if (type) {

            setFromDate('1/1/1925');
            setFromDate1('1/1/1925');
            setToDate('1/1/1925');
            setToDate1('1/1/1925');

            let pgi = parseInt(1);
            setPageIndex(pgi);
            setGoinputtxt(pgi);
            filldata(type, '1/1/1925', '1/1/1925', pgi, user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

    const onpagerefresh = () => {
        if (type) {
            setPagerefreshing(true);
            filldata(type, fromDate1, toDate1, PageIndex, user.TokenId);
            setPagerefreshing(false);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

    function PrvClking(PgiValue) {
        if (type) {
            PgiValue = parseInt(PgiValue);
            setPageIndex((PgiValue - 1));
            setGoinputtxt((PgiValue - 1));
            filldata(type, fromDate1, toDate1, (PgiValue - 1), user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

    function NxtClking(PgiValue) {
        if (type) {
            PgiValue = parseInt(PgiValue);
            setPageIndex((PgiValue + 1));
            setGoinputtxt((PgiValue + 1));
            filldata(type, fromDate1, toDate1, (PgiValue + 1), user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

    function GoClking(PgiValue) {
        if (type) {

            PgiValue = parseInt(PgiValue);

            if (PgiValue >= TotalPgCount) {
                PgiValue = TotalPgCount;
            }
            else if (PgiValue <= 0) {
                PgiValue = 1;
            }

            setPageIndex(PgiValue);
            setGoinputtxt(PgiValue);
            filldata(type, fromDate1, toDate1, PgiValue, user.TokenId);
        }
        else {
            navigation.navigate('Wallets');
        }
    }

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

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >{companyName} Wallet</Text>
                    </View>
                </View>
            </LinearGradient>
            {/*================End Of Header  ================= */}



            {/* ==================  Body  ======================= */}
            {walletReport ?
                <View style={{ flex: 1, }} >
                    <View
                        style={{ height: '12%', width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10 }} >
                        <Text style={{ fontSize: 12, color: '#7c7c7c' }} >{type === 'COMMISSION' ? 'Commission Wallet Balance' : type === 'PURCHASE' ? 'Purchase Wallet Balance' : type === 'REWARD' ? 'Reward Points Balance' : type === 'MYBANK' ? 'My Bank Balance' : null}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5 }} >
                            <FontAwesome name="rupee" size={30} color="black" style={{ paddingTop: 10 }} />
                            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }} > {walletReport.WalletBalance}</Text>
                        </View>
                    </View>
                    <View style={{ height: '20%', width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10 }} >
                        <View style={{ flexDirection: 'row', }} >
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 0.7, height: 40, width: 150, marginRight: 5, justifyContent: 'center', paddingLeft: 10, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                    <Text>{fromDate === '1/1/1925' ? 'From Date' : fromDate}</Text>
                                </View>
                                <View style={{ flex: 0.3, height: 40, marginRight: 5, justifyContent: 'center', paddingLeft: 5 }} >
                                    <Fontisto size={25} name="date" onPress={showPicker} />
                                    {state.show &&
                                        (<DateTimePicker
                                            testID="dateTimePicker"
                                            timeZoneOffsetInMinutes={0}
                                            value={state.date}
                                            mode={state.mode}
                                            display="default"
                                            onChange={onChange}
                                        />)
                                    }
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 0.7, height: 40, width: 150, marginRight: 5, justifyContent: 'center', paddingLeft: 10, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                    <Text>{toDate === '1/1/1925' ? 'To Date' : toDate}</Text>
                                </View>
                                <View style={{ flex: 0.3, height: 40, marginRight: 5, justifyContent: 'center', paddingLeft: 5 }} >
                                    <Fontisto size={25} name="date" onPress={showPicker1} />
                                    {state1.show &&
                                        (<DateTimePicker
                                            testID="dateTimePicker1"
                                            timeZoneOffsetInMinutes={0}
                                            value={state1.date}
                                            mode={state1.mode}
                                            display="default"
                                            onChange={onChange1}
                                        />)
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{
                            paddingVertical: 13,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}  >
                            <TouchableOpacity
                                onPress={() => { Submit() }}
                                style={{ alignItems: 'center', marginTop: 20, padding: 12, backgroundColor: '#16ABB1', width: '30%', borderRadius: 5, alignSelf: 'center' }} >
                                <Text style={{ color: '#fff' }}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { CalendarClr() }}
                                style={{ alignItems: 'center', marginTop: 20, padding: 12, backgroundColor: '#16ABB1', width: '30%', borderRadius: 5, alignSelf: 'center' }}
                            >
                                <Text style={{ color: '#fff' }}>Clear</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView refreshControl={<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                        <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 }} >
                            {
                                walletRecords.length !== 0 ?
                                    walletRecords.map((item, index) =>
                                        <View key={index} style={{ width: '100%', borderRadius: 10, elevation: 5, backgroundColor: '#fff', paddingRight: 20, marginTop: 20, paddingVertical: 16, borderLeftWidth: 3, borderLeftColor: item.TransactionType === 'DR' ? '#fd6a6a' : item.TransactionType === 'CR' ? '#1aca82' : null }} >
                                            <View style={{ paddingLeft: 20, }} >
                                                <Text style={{ fontSize: 12 }} >{item.Description}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }} >
                                                    <View style={{ flexDirection: 'row' }} >
                                                        <FontAwesome name="rupee" size={20} color="black" style={{ paddingTop: 10 }} >
                                                            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} > {item.Amount}</Text>
                                                        </FontAwesome>
                                                        <Text style={{
                                                            fontSize: 12,
                                                            alignSelf: 'flex-end',
                                                            paddingLeft: 10,
                                                            color: item.TransactionType === 'DR' ? '#fd6a6a' : item.TransactionType === 'CR' ? '#1aca82' : null
                                                        }}
                                                        >{item.TransactionType === 'DR' ? '- Debit' : item.TransactionType === 'CR' ? '+ Credit' : null}</Text>
                                                    </View>
                                                    <Text style={{ alignSelf: 'flex-end', color: '#7c7c7c', fontSize: 12 }} >{item.TransactionDate}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                    : <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }} >
                                        <Text style={{ color: 'red' }}>No Records Found</Text>
                                    </View>
                            }
                        </View>
                    </ScrollView>
                    {walletRecords.length !== 0 ?
                        <LinearGradient
                            colors={['#35CBC4', '#16ABB1']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{
                                paddingHorizontal: 20,
                                 height: 0.08 * SIZES.height,
                                width: SIZES.width,
                            }} >
                            <View style={{
                                paddingVertical: 13,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}  >
                                <TouchableOpacity style={{ alignSelf: 'center', padding: 10 }} onPress={() => { PageIndex > 1 ? PrvClking(PageIndex) : null }} >
                                    <Feather name="chevron-left" size={20} color="white" />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', }} >
                                    <View style={{ height: 40, width: 70, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }} >
                                        <TextInput value={Goinputtxt + ''} style={{ fontSize: 16 }} keyboardType="number-pad" onChangeText={(text) => { setGoinputtxt(text) }} />
                                    </View>
                                    <Text style={{ alignSelf: 'center', fontSize: 18, color: '#fff' }} >  / {TotalPgCount}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { GoClking(Goinputtxt) }} style={{ alignSelf: 'center' }}  >
                                    <Text style={{ fontSize: 18, color: '#fff' }} >Go</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignSelf: 'center', padding: 10 }} onPress={() => { TotalPgCount > PageIndex ? NxtClking(PageIndex) : null }} >
                                    <Feather name="chevron-right" size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </LinearGradient> : null
                    }
                </View>
                : null
            }
        </View>
    )
}

export default WalletReportScreen


