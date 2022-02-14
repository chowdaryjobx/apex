import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DataContext from '../../context/DataContext';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES, COLORS } from '../../constants';
// import CheckBox from '@react-native-community/checkbox';
// import notifee, { AndroidColor, AndroidStyle } from '@notifee/react-native';
import RBSheet from "react-native-raw-bottom-sheet";




const PaymentScreen = ({ navigation, route }) => {
    const rbsheet1 = useRef();
    const [totalBill, setTotalBill] = useState(route.params.total);


    const { user, userData, userCards, addCard, userUpis, addUpi, productState, emptyCart,companyName } = React.useContext(DataContext);

    const [walletCheckBox, setWalletCheckBox] = useState(false);
    const [rewardPointCheckBox, setRewardPointCheckBox] = useState(false);

    const [cardsBottomSheet, setCardsBottomSheet] = useState(false);
    const [upiBottomSheet, setUpiBottomSheet] = useState(false);




    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiraryYear, setExpiraryYear] = useState('');
    const [expiraryMonth, setExpiraryMonth] = useState('');
    const [cvv, setCvv] = useState('');
    const [nickName, setNickName] = useState('');
    const [bankName, setBankName] = useState('');



    useEffect(() => {
        if (userData.walletBalance > 0) {
            setWalletCheckBox(true);
        }
    }, [])




    const [upiTitle, setUpiTitle] = useState('');


    const cardData = {
        id: 2,
        cardName: nameOnCard,
        cardNumber: cardNumber,
        expiraryYear: expiraryYear,
        expiraryMonth: expiraryMonth,
        cvv: cvv,
        nickName: nickName,
        cardType: 'visa',
        bankName: bankName
    }

    const upiData = {
        title: upiTitle,
    }



    const submitCard = () => {
        addCard(cardData);
    }

    const submitUpi = () => {
        addUpi(upiData);
    }


    const makePayment = () => {
        if (1) {
            productState("Order placed")
            emptyCart();
            onDisplayNotification();
            navigation.navigate('Success');
        }
        else {
            rbsheet1.current.open()
        }
    }

    async function onDisplayNotification() {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: '123',
            name: 'arafah',
            sound: 'arafah_notification',
            vibration: true,
            vibrationPattern: [300, 500],
        });

        await notifee.displayNotification({
            title: 'Food Status',
            body: 'Order Placed Successfully',
            // android: {
            //     channelId: '123',
            //     smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
            // },
            android: {
                channelId,
                smallIcon: 'ic_launcher',
                style: { type: AndroidStyle.BIGPICTURE, picture: 'https://my-cdn.com/user/123/upload/456.png' },
                showTimestamp: true,
                showChronometer: true,
            },
        });
    }

    return (

        <View style={{ flex: 1 }} >
            <RBSheet
                closeOnDragDown={true}
                closeOnPressMask={false}
                ref={rbsheet1}
                height={300}
                openDuration={250}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}

            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                    <Text style={{ color: 'red' }} >Order Failed</Text>
                </View>

            </RBSheet>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >

                {/* ===============  Bottom Sheet  ==================== */}
                <BottomSheet
                    isVisible={cardsBottomSheet}
                    containerStyle={{}}
                >
                    <View style={{ padding: 20, backgroundColor: '#fff', height: 500 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <Text style={{ color: '#3e6caa', fontSize: 16 }}  >Card Details</Text>
                            <EvilIcons name="chevron-down" size={40} onPress={() => { setCardsBottomSheet(!cardsBottomSheet) }} />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View >
                                <Text style={{ fontWeight: '300' }} >We accept Credit and Debit cards from Visa, MasterCard, Rupay, Maestro</Text>
                            </View>
                            <View style={{ top: 10 }} >
                                <Text style={{ fontWeight: '400' }} >Name on Card</Text>

                                <TextInput
                               placeholderTextColor="#000"
                               style={{ color: '#000' }}
                                    onChangeText={(name) => { setNameOnCard(name) }}
                                    value={nameOnCard}
                                    placeholder="Name on Card" style={{ borderBottomWidth: 1 }} />
                            </View>
                            <View style={{ top: 20 }} >
                                <Text style={{ fontWeight: '400' }} >Card Number</Text>
                                <TextInput
                           placeholderTextColor="#000"
                           style={{ color: '#000' }}
                                    onChangeText={(name) => { setCardNumber(name) }}
                                    value={cardNumber}
                                    placeholder="Enter Card Number" style={{ borderBottomWidth: 1 }} />
                            </View>
                            <Text style={{ top: 30, fontWeight: 'bold' }} >Expirary Date</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                <View style={{ flex: 0.3, marginTop: 40 }} >
                                    <Text style={{ fontWeight: '400' }} >Year</Text>
                                    <TextInput
                                   placeholderTextColor="#000"
                                   style={{ color: '#000' }}
                                        onChangeText={(year) => { setExpiraryYear(year) }}
                                        value={expiraryYear}
                                        placeholder="Year(yyyy)" style={{ borderBottomWidth: 1 }} />
                                </View>
                                <View style={{ flex: 0.23, top: 40, left: 20 }} >
                                    <Text style={{ fontWeight: '400' }} >Month</Text>
                                    <TextInput
                                    placeholderTextColor="#000"
                                    style={{ color: '#000' }}
                                        onChangeText={(month) => { setExpiraryMonth(month) }}
                                        value={expiraryMonth}
                                        placeholder="Month(MM)" style={{ borderBottomWidth: 1 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.2, top: 10 }} >
                                <Text style={{ fontWeight: '400' }} >Cvv</Text>
                                <TextInput
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                    onChangeText={(cvv) => { setCvv(cvv) }}
                                    value={cvv}
                                    placeholder="CVV" style={{ borderBottomWidth: 1 }} />
                            </View>
                            <Text style={{ fontWeight: 'bold', paddingTop: 20 }} >Nickname for card</Text>
                            <View style={{ paddingVertical: 20, flexDirection: 'row', justifyContent: 'flex-start', borderBottomWidth: 1, borderColor: '#ccc' }} >

                                <TouchableOpacity onPress={() => setNickName('personal')} style={{ backgroundColor: '#3e6caa', borderColor: '#3e6caa', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: '#fff' }} >Personal</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setNickName('business') }} style={{ marginLeft: 10, borderColor: '#3e6caa', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: '#3e6caa' }} >Business</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setNickName('others') }} style={{ marginLeft: 10, borderborderColor: '#3e6caa', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: '#3e6caa' }} >Other</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.2, top: 10 }} >
                                <Text style={{ fontWeight: '400' }} >Select Bank</Text>
                                <TextInput
                              placeholderTextColor="#000"
                              style={{ color: '#000' }}
                                    onChangeText={(bank) => { setBankName(bank) }}
                                    value={bankName}
                                    placeholder="Bank Name" style={{ borderBottomWidth: 1 }} />
                            </View>
                            <View style={{ top: 20 }} >
                                <Text style={{ color: 'gray' }} >
                                    We will save this card for your convenience if required, you can remove the card in the 'payments' section in the 'Profile' menu. we do not store cvv.
                                </Text>
                            </View>
                            <View style={{ padding: 50 }} ></View>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => { submitCard() }}
                            style={{ borderColor: '#3e6caa', borderWidth: 1, height: 50, width: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#3e6caa' }} >Add Card</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>



                <BottomSheet
                    isVisible={upiBottomSheet}
                    containerStyle={{}}
                >
                    <View style={{ padding: 20, backgroundColor: '#fff', height: 500 }} >
                        <View style={{ alignSelf: 'flex-end', }} >

                            <EvilIcons name="chevron-down" size={40} onPress={() => { setUpiBottomSheet(!upiBottomSheet) }} />
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View  >
                                <Text style={{ fontWeight: '300' }} >We accept Gpay,  Phonepe, Bharathpay, Mobikwik Amazonpay and Paytm</Text>
                            </View>
                            <View style={{ top: 10 }} >
                                <Text style={{ fontWeight: '400' }} >UPI Id</Text>
                                <TextInput
                            placeholderTextColor="#000"
                            style={{ color: '#000' }}
                                    onChangeText={(upi) => { setUpiTitle(upi) }}
                                    placeholder="Enter Upi Title" style={{ borderBottomWidth: 1 }} />
                            </View>

                            <View style={{ top: 20 }} >
                                <Text style={{ color: 'gray' }} >
                                    We will save this upi for your convenience if required, you can remove the upi in the 'payments' section in the 'Profile' menu.
                                </Text>

                            </View>
                            <View style={{ padding: 50 }} ></View>
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => submitUpi()}
                            style={{ borderColor: '#2E9E07', borderWidth: 1, height: 50, width: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#2E9E07' }} >Add UPI</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>

                {/* ==============  End of Bottom Sheet  ================ */}


                <View style={styles.header}>
                    <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                    <View style={{ left: 20 }} >
                        <Text style={styles.headingText} >Select Payment Method</Text>
                    </View>
                </View>
                <View style={styles.cardsHeading} >
                    <Text style={styles.headingText} >Amount to be paid: <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} /> {totalBill}</Text>
                </View>
                <View style={styles.cardsHeading} >
                    <Text style={styles.headingText} >Wallets</Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.cardRow} >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <Image source={require('../../assests/extras/arafahlogo.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 12, left: 20 }} >{companyName}   <FontAwesome name="rupee" size={12} color="black" style={{ marginLeft: 10 }} />  {userData.walletBalance} </Text>
                        </View>
                        <EvilIcons name="chevron-right" size={25} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}  >
                        {/* <CheckBox
                            disabled={false}
                            value={rewardPointCheckBox}
                            onValueChange={(newValue) => setRewardPointCheckBox(!rewardPointCheckBox)}
                        /> */}
                        <Text style={{ fontSize: 10 }} >Reward Points</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        {/* <CheckBox
                            disabled={false}
                            value={walletCheckBox}
                            onValueChange={(newValue) => setWalletCheckBox(!walletCheckBox)}
                        /> */}
                        <Text style={{ fontSize: 10 }}  >Wallet Balance</Text>
                    </View>
                    <View style={styles.cardRow} >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <Image source={require('../../assests/payments/paytm.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 12, left: 20 }} >Paytm</Text>
                        </View>

                        <EvilIcons name="chevron-right" size={25} />
                    </View>
                    <View style={styles.cardRow} >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <Image source={require('../../assests/payments/freecharge.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 12, left: 20 }} >Freecharge</Text>
                        </View>
                        <EvilIcons name="chevron-right" size={25} />
                    </View>
                </View>
                <View style={styles.cardsHeading} >
                    <Text style={styles.headingText} >Pay On Delivery</Text>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.cardRow} >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <FontAwesome name="money" size={20} />
                            <Text style={{ fontSize: 12, left: 20 }} >Cash on Delivery</Text>
                        </View>
                        <EvilIcons name="chevron-right" size={25} />
                    </View>
                </View>

                <View style={styles.body} >
                    <View style={styles.cardsHeading} >
                        <Text style={styles.headingText} >CREDIT / DEBIT Cards</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardRow} >
                            <TouchableOpacity
                                onPress={() => { setCardsBottomSheet(!cardsBottomSheet) }}
                                style={{ left: 10, paddingLeft: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', elevation: 5, height: 50, borderRadius: 25, flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', }} >
                                <EvilIcons name="plus" size={30} color="#2E9E07" />
                                <View style={{ left: 10 }} >
                                    <Text style={{ fontSize: 12 }} >ADD NEW CARDS</Text>
                                    <Text style={{ fontSize: 10, color: 'gray' }} >Save and pay through cards</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cardsHeading} >
                        <Text style={styles.headingText} >YOUR CARDS</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.cardRow} >
                            {userCards.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { }}
                                        style={styles.card} >
                                        <View style={{ flex: 0.2, borderRadius: 5, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10 }}  >
                                            <Text style={{ fontSize: 14, color: '#fff' }} >{item.bankName}</Text>
                                        </View>
                                        <View style={{ flex: 0.1, borderRadius: 5, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10 }}  >
                                        </View>
                                        <View style={{ flex: 0.4, borderRadius: 5, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}  >
                                            <Text style={{ fontSize: 14, color: '#fff' }} >XXXX XXXX XXXX 3456</Text>
                                            <Text style={{ fontSize: 10, paddingLeft: 55, color: '#fff' }} >Month/Year</Text>
                                            <View style={{ flexDirection: 'row' }} >
                                                <Text style={{ fontSize: 10, color: '#fff' }} >Valid till</Text>
                                                <Text style={{ fontSize: 12, paddingLeft: 15, color: '#fff' }} >XX/XX</Text></View>
                                        </View>
                                        <View style={{ flex: 0.3, flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 10 }}  >
                                            <Text style={{ fontSize: 14, color: '#fff', paddingRight: 10 }} >{item.bankName}</Text>
                                            <Image
                                                source={item.cardType === 'masterCard' ? require('../../assests/cards/mastercardlogo.png') : item.cardType === 'visa' ? require('../../assests/cards/visalogo.png') : item.cardType === 'paypal' ? require('../../assests/cards/paypallogo.png') : null}
                                                style={{ height: 20, width: 30, }} />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.cardsHeading} >
                        <Text style={styles.headingText} >UPI</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardRow} >
                            <TouchableOpacity
                                onPress={() => { setUpiBottomSheet(!upiBottomSheet) }}
                                style={{ left: 10, paddingLeft: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff', elevation: 5, height: 50, borderRadius: 25, flex: 0.7, flexDirection: 'row', justifyContent: 'flex-start', }} >
                                <EvilIcons name="plus" size={30} color="#2E9E07" />
                                <View style={{ left: 10 }} >
                                    <Text style={{ fontSize: 12 }} >ADD NEW UPI</Text>
                                    <Text style={{ fontSize: 10, color: 'gray' }} >you need to have a registered upi id</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cardsHeading} >
                        <Text style={styles.headingText} >YOUR UPI's</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.cardRow} >
                            {userUpis.map((item, index) => {
                                return (
                                    <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <TouchableOpacity
                                            onPress={() => { }}
                                            style={styles.upiCard} >
                                            <Text style={{ color: '#fff', }} >{item.title}</Text>
                                        </TouchableOpacity>
                                        <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>{item.title}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.cardsHeading} >
                        <Text style={styles.headingText} >Netbanking</Text>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardRow} >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }} >
                                <Image source={require('../../assests/payments/netbanking.png')} style={{ height: 20, width: 20 }} />
                                <Text style={{ fontSize: 12, left: 20 }} >Netbanking</Text>
                            </View>
                            <EvilIcons name="chevron-right" size={25} />
                        </View>
                    </View>
                </View>


            </ScrollView>
            <TouchableOpacity onPress={() => { makePayment() }}>
                <LinearGradient
                    colors={['#61B743', '#23A772']}
                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                    style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.06 * SIZES.height,
                        width: SIZES.width,
                    }} >
                    <Text style={{ color: '#fff' }} >Place order</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    header: {
        paddingBottom: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    headingText: {
        fontSize: 16
    },
    normalText: {
        fontSize: 14
    },
    body: {

    },
    cardsHeading: {

        paddingVertical: 10
    },
    cardBody: {
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    cardRow: {
        paddingVertical: 10,
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    card: {
        marginLeft: 10,
        elevation: 5,
        shadowColor: '#ccc',
        height: 125, width: 200,
        backgroundColor: '#3e6caa',
        borderRadius: 5
    },
    upiCard: {
        marginLeft: 20,
        elevation: 5,
        shadowColor: '#ccc',
        height: 75,
        width: 75,
        backgroundColor: '#3e6caa',
        borderRadius: 75 / 2,
        justifyContent: 'center',
        alignItems: 'center',

    }
})



export default PaymentScreen