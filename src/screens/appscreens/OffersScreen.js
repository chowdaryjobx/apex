import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import notifee, { AndroidColor } from '@notifee/react-native';

import { OffersData, dishesData, toppicksforyou, dishes } from '../../data/data';
import { FlatList } from 'react-native-gesture-handler';
import DataContext from '../../context/DataContext';

function OffersScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const { user, cartItems, userData } = React.useContext(DataContext);


    let total = 0;
    cartItems.map((item) => {
        total += item.quantity * item.price
    })

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
            title: 'Awwwww! You made it',
            body: 'Now your in Arafah, oder your craving bite.',
            android: {
                channelId: '123',
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.

            },
        });
    }

    return (
        <View style={{ flex: 1, }} >
            {/*================ Header  ================= */}

            <LinearGradient
                colors={['#61B743', '#23A772']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                    // backgroundColor: COLORS.primary
                }} >
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 13

                }}  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                        <MaterialCommunityIcons name="map-marker-outline" size={20} color="#fff" />
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                    </View>

                    {user ? <Text style={{ bottom: 5, fontSize: 14, paddingLeft: 20, color: '#fff' }} >{userData.address}</Text>
                        : null}

                </View>
                <TouchableOpacity onPress={() => {
                    user ? navigation.navigate('Profile') : navigation.navigate('Login')
                }} >
                    <View style={{
                        height: 0.065 * SIZES.height,
                        width: 0.065 * SIZES.height,
                        borderRadius: 0.065 * SIZES.height / 2,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} >
                        {user ? <Image source={{ uri: userData.profilePic }} style={{ height: 0.065 * SIZES.height, width: 0.065 * SIZES.height, borderRadius: 0.065 * SIZES.height }} />
                            :
                            <MaterialCommunityIcons name="account" size={20} />
                        }
                    </View>
                </TouchableOpacity>

            </LinearGradient>
            {/*================End Of Header  ================= */}

            <ScrollView showsVerticalScrollIndicator={false} >

                <View style={{ height: 0.01 * SIZES.height, width: SIZES.width, backgroundColor: '#fff' }} >

                </View>
                <View style={{ elevation: 5, height: 0.31 * SIZES.height, width: SIZES.width, backgroundColor: '#D7FFB7' }} >
                    <View >
                        <Text style={{ top: 10, paddingLeft: 20, fontSize: 16, fontWeight: '500' }} >Offers for you</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ height: 0.35 * SIZES.height, top: 15 }} >

                            {
                                OffersData.map((item, i) => {

                                    return (
                                        <TouchableOpacity onPress={() => { onDisplayNotification() }} key={i} style={{
                                            height: 0.22 * SIZES.height,
                                            width: 0.17 * SIZES.height,
                                            backgroundColor: '#D7FFB7',
                                            top: 10,
                                            borderRadius: 3,
                                            marginLeft: 30,
                                            elevation: 10
                                        }}>
                                            <Image

                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    resizeMode: 'stretch',
                                                    borderRadius: 1,
                                                }}
                                                source={item.path}
                                                onLoadEnd={() => { setIsLoading(false) }}

                                            />
                                            {isLoading ? <ActivityIndicator /> : null}
                                        </TouchableOpacity>
                                    )
                                })
                            }




                        </ScrollView>
                        
                    </View>
                </View>

                <View style={{ paddingVertical: 20,paddingHorizontal:10 }} >
                            <Text style={{ fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', color: 'gray' }} >Arafah</Text>
                            <Text style={{ fontSize: 14, fontStyle: 'italic', color: 'gray' }} >Craving offers will hit you soon</Text>
                        </View>
            </ScrollView>




        </View>
    )
}

export default OffersScreen
