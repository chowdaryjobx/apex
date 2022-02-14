import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants'

import LinearGradient from 'react-native-linear-gradient';


function PayoutTimeErrorScreen({ navigation }) {

    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

    const onpagerefresh = () => {
        // setPagerefreshing(true);

        // setPagerefreshing(false);
    }





    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}
        // refreshControl={<RefreshControl refreshing={Pagerefreshing}
        //     onRefresh={onpagerefresh}></RefreshControl>}
        >
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >{companyName}</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                {/* <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} >
                    <MaterialCommunityIcons name="access-point-network-off" size={100} color="#b5b5b5" /> */}
                <Text style={{ fontSize: 18, color: '#b5b5b5', marginTop: 30 }} >Server is busy, please try again later</Text>

                {/* </View> */}
                {/* <TouchableOpacity onPress={() => { onpagerefresh() }} style={{ flex: 1, justifyContent: 'center' }} >
                    <View style={{ padding: 5, paddingHorizontal: 40, borderRadius: 10, elvation: 5, backgroundColor: '#23A26F' }}>
                        <Text style={{ fontSize: 16, color: '#fff' }} >Refresh</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    )
}

export default PayoutTimeErrorScreen



