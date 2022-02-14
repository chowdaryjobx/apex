import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native';
import DataContext from '../../context/DataContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FavouriteOrdersScreen({navigation}) {
    const { cartItems } = React.useContext(DataContext);

    return (
        <View style={{ flex: 1, backgroundColor: '#e5e5e5' }} >

            <View style={{ flex: 0.07, backgroundColor: '#fff',justifyContent:"center",paddingHorizontal:10 }}>
                <AntDesign name="arrowleft" size={20} onPress={()=>{navigation.goBack()}} />
            </View>
            <ScrollView style={{ flex: 0.93, padding: 10 }}>


                <Text style={{ fontSize: 16 }} >Your Favourites Orders</Text>

                <View style={{ marginTop: 10, width: '100%', backgroundColor: '#fff', elevation: 5, borderRadius: 5 }} >
                    <View style={{ borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }} >
                        <View style={{ flexDirection: 'row' }} >
                            <View>
                                <Image source={cartItems[0].path} style={{ height: 50, width: 50, borderRadius: 5 }} />
                            </View>
                            <View style={{ justifyContent: 'center', paddingLeft: 10 }} >
                                <Text style={{ fontSize: 16 }} >{cartItems[0].title}</Text>
                                <Text style={{ fontSize: 14 }} >sub title</Text>
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', }} >
                            <Text style={{ fontWeight: '500' }} >  <FontAwesome name="rupee" size={14} />125.00</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: '#ccc', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }} >

                        <View style={{ padding: 10 }} >
                            <Text style={{ color: 'gray', fontSize: 16 }} >ITEMS</Text>
                            <Text style={{ fontSize: 14 }} >1 * {cartItems[0].title}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }} >
                            <Text style={{ color: 'gray', fontSize: 16 }} >ORDERED ON</Text>
                            <Text style={{ fontSize: 14 }} >3rd NOV 2021 at 4:00 pm</Text>
                        </View>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' }} >

                        <View style={{ paddingHorizontal: 10, }} >
                            <Text style={{ color: 'gray', fontSize: 14 }} >Delivered</Text>

                        </View>
                        <View style={{}} >
                            <Text style={{ color: 'gray', fontSize: 14, color: '#F25816' }} >repeat order</Text>

                        </View>
                    </View>
                </View>
                
          
        




            </ScrollView>
        </View>
    )
}


