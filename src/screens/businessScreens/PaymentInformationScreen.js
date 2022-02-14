import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import { Picker } from '@react-native-picker/picker';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

import LinearGradient from 'react-native-linear-gradient';

import NetInfo from "@react-native-community/netinfo";
import DataContext from '../../context/DataContext';
import axios from 'axios';

function PaymentInformationScreen({ navigation }) {



    const { user, api, url } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }



    const [natureOfTransfer, setNatureOfTransfer] = useState(null);
    const [banks, setBanks] = useState(null);


    const [selectedNatureOfTransfer, setSelectedNatureOfTransfer] = useState(null);
    const [selectedTransferTo, setSelectedTransferTo] = useState(null);

    const [bankName, setBankName] = useState(null);
    const [amount, setAmount] = useState(null);
    const [depositedBy, setDepositedBy] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [remarks, setRemarks] = useState('N.A.');
    const [depositedDate, setDepositedDate] = useState(null);
    const [depositedDate1, setDepositedDate1] = useState(null);
    const [depositedTime, setDepositedTime] = useState(null);



    const [natureOfTransferError, setNatureOfTransferError] = useState(null);
    const [bankNameError, setBankNameError] = useState(null);
    const [amountError, setAmountError] = useState(null);
    const [depositedByError, setDepositedByError] = useState(null);
    const [contactNumberError, setContactNumberError] = useState(null);
    const [depositedDateError, setDepositedDateError] = useState(null);
    const [depositedTimeError, setDepositedTimeError] = useState(null);
    const [transferToError, setTransferToError] = useState(null);


    const [state, setState] = useState({
        date: new Date(),
        mode: 'date',
        show: false
    });
    const [statetime, setStatetime] = useState({
        date: new Date(),
        mode: 'time',
        show: false
    });




    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    
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
        setDepositedDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        setDepositedDate1((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear())
    };

    const showPicker = currentMode => {
        setState({ ...state, show: true });
    };

    const onTimeChange = (event, selectedDateTime) => {
        const currentDateTime = selectedDateTime || statetime.date;
        setStatetime({ ...statetime, date: currentDateTime, show: false });

        let time = new Date(currentDateTime);
        if (time.getHours() > 12) {
            setDepositedTime(time.getHours() - 12 + ' : ' + time.getMinutes() + '  PM')
        }
        else if (time.getHours() === 12) {
            setDepositedTime(time.getHours() + ' : ' + time.getMinutes() + '  PM')
        }
        else {
            setDepositedTime(time.getHours() + ' : ' + time.getMinutes() + '  AM')
        }
    };

    const showPickerTime = currentMode => {
        setStatetime({ ...statetime, show: true });
    };


    useEffect(() => {
        axios.post(api + url.PaymentInfo, { InputType: 'GET', TokenID: user.TokenId })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setContactNumber(res.data[0].Mobile);
                    setDepositedBy(res.data[0].Name);
                    setBanks(res.data[0].ToBankName);
                    setErrorMessage(null);
                    setNatureOfTransfer(res.data[0].NatureofTransfers);
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


        if (bankName === null || bankName === '') {
            setBankNameError("please Enter Bank Name");
        }
        else if (amount === null || amount === '') {
            setAmountError("Please enter amount");
        }
        else if (depositedBy === null || depositedBy === '') {
            setDepositedByError("Please enter value");
        }
        else if (contactNumber === null || contactNumber === '') {
            setContactNumberError("Please enter Contact Number");
        }
        else if (depositedDate === null || depositedDate === '') {
            setDepositedDateError("Please select date");
        }
        else if (depositedTime === null || depositedTime === '') {
            setDepositedTimeError("Please select time");
        }


        let data = {
            InputType: "UPDATE",
            ToBank: selectedTransferTo,
            NatureofTransfer: selectedNatureOfTransfer,
            FromBank: bankName,
            Amount: amount,
            DepositDate: depositedDate1,
            DepositTime: depositedTime,
            DepositedBy: depositedBy,
            ContactNo: contactNumber,
            Remarks: remarks,
            TokenID: user.TokenId
        }


        if (user) {
            axios.post(api + url.PaymentInfo, data)
                .then((res) => {

                    if (res.data[0].Status === 'Success') {
                        navigation.navigate('SuccessPaymentScreen');
                        setErrorMessage(null);
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
        else {
            setErrorMessage("user not found");
        }


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
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Add Payment Request</Text>
                    </View>
                </View>

            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}
            <ScrollView contentContainerStyle={{}} >

                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <View style={{ margin: 30, padding: 10, elevation: 10, backgroundColor: '#fff', borderRadius: 10 }} >
                        <View style={{}} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Transfer From</Text>
                        </View>


                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Nature Of Transfer </Text>
                            <View>

                            </View>
                            <View style={{
                               paddingHorizontal: 20,
                               width: '80%',
                               borderRadius: 10,
                               elevation: 5,
                               backgroundColor: '#fff',
                               paddingVertical: 0,
                               flex: 1,
                               flexDirection: 'row',
                               padding: 10,
                               height: 55,
                               alignItems: 'center',
                               justifyContent: 'space-between',
                            }} >

                                <View style={{ flex: 1, justifyContent: 'center' }} >

                                    <Picker
                                    dropdownIconColor= '#000'
                                        mode="dropdown"
                                        selectedValue={selectedNatureOfTransfer}

                                        onValueChange={(itemValue, itemIndex) => { setSelectedNatureOfTransfer(itemValue) }}
                                    >
                                        <Picker.Item
                                            label="-- Nature of transfer --"
                                            value={0}
                                            key={0}
                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                            
                                            />
                                        {
                                            natureOfTransfer ?
                                                natureOfTransfer.map((item, index) => {
                                                    return (
                                                        <Picker.Item
                                                            label={item.NatureofTransfer}
                                                            value={item.NatureofTransfer}
                                                            key={index + 1}
                                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                                            />
                                                    )
                                                })
                                                : null
                                        }

                                    </Picker>
                                </View>
                            </View>

                        </View>
                        {natureOfTransferError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{natureOfTransferError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Bank Name</Text>
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
                                        value={bankName}

                                        onChangeText={(text) => { setBankName(text) }} />
                                </View>

                            </View>

                        </View>
                        {bankNameError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{bankNameError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Amount</Text>
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
                                        keyboardType='numeric'
                                        value={amount}

                                        onChangeText={(text) => { setAmount(text) }} />
                                </View>

                            </View>

                        </View>
                        {amountError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{amountError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Deposited By</Text>
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
                                        value={depositedBy}
                                        onChangeText={(text) => { setDepositedBy(text) }} />
                                </View>

                            </View>

                        </View>
                        {depositedByError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{depositedByError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Contact Number</Text>
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

                                        onChangeText={(text) => { setContactNumber(text) }} />
                                </View>

                            </View>

                        </View>
                        {contactNumberError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{contactNumberError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Remarks/Reference No (Optional)</Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 100,
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
                                        multiline={true}
                                        numberOfLines={5}

                                        value={remarks === 'N.A.' ? '' : remarks}
                                        onChangeText={(text) => { setRemarks(text) }} />
                                </View>

                            </View>

                        </View>
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Deposited Date</Text>
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
                                <View style={{ flex: 1, width: '70%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', }} >
                                    <Text>{depositedDate ? depositedDate : null}</Text>
                                </View>


                                <TouchableOpacity onPress={showPicker} style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', }} >
                                    <AntDesign name="calendar" size={20} onPress={showPicker} />
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

                                </TouchableOpacity>
                            </View>

                        </View>
                        {depositedDateError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{depositedDateError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Deposited Time</Text>
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
                                <View style={{ flex: 1, width: '70%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', }} >
                                    <Text>{depositedTime ? depositedTime : null}</Text>
                                </View>

                                <TouchableOpacity onPress={showPickerTime} style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', }} >
                                    <AntDesign name="calendar" size={20} onPress={showPickerTime} />
                                    {statetime.show &&
                                        (<DateTimePicker
                                            testID="dateTimePicker1"
                                            value={statetime.date}
                                            mode={statetime.mode}
                                            is24Hour={false}
                                            display="default"
                                            onChange={onTimeChange}
                                        />)
                                    }
                                </TouchableOpacity>
                            </View>

                        </View>
                        {depositedTimeError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{depositedTimeError}</Text>
                            </View> : null}
                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Transfer To </Text>
                            <View>

                            </View>


                            <View style={{
                                     paddingHorizontal: 20,
                                     width: '80%',
                                     borderRadius: 10,
                                     elevation: 5,
                                     backgroundColor: '#fff',
                                     paddingVertical: 0,
                                     flex: 1,
                                     flexDirection: 'row',
                                     padding: 10,
                                     height: 55,
                                     alignItems: 'center',
                                     justifyContent: 'space-between',
                            }} >

                                <View style={{ flex: 1, justifyContent: 'center' }} >

                                    <Picker
                                    dropdownIconColor= '#000'
                                        mode="dropdown"
                                        selectedValue={selectedTransferTo}
                                        style={{}}
                                        onValueChange={(itemValue, itemIndex) => { setSelectedTransferTo(itemValue) }}
                                    >
                                        <Picker.Item
                                            label="-- Bank Name   --"
                                            value={0}
                                            key={0}
                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                            />
                                        {
                                            banks ?
                                                banks.map((item, index) => {
                                                    return (
                                                        <Picker.Item
                                                            label={item.BankName}
                                                            value={item.BankName}
                                                            key={index + 1}
                                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                                            />
                                                    )
                                                })
                                                : null
                                        }

                                    </Picker>
                                </View>
                            </View>

                        </View>
                        {transferToError ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{transferToError}</Text>
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
                        {errorMessage ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'red' }} >{errorMessage}</Text>
                            </View> : null}
                        {successMessage ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'green', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                <Text style={{ color: 'green' }} >{successMessage}</Text>
                            </View>
                            : null}

                    </View>



                </View>
            </ScrollView>

            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default PaymentInformationScreen



