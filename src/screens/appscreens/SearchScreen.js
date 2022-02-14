import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, FlatList, Text, TouchableOpacity, StatusBar, ScrollView, Switch } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS, SIZES } from '../../constants';
import { recentlySearched, dishes } from '../../data/data';
import DataContext from '../../context/DataContext';

function SearchScreen({ navigation }) {


    const { addToCart, increaseProducts, decreaseProducts, removeProduct, cartItems } = React.useContext(DataContext);

    let total = 0;
    cartItems.map((item) => {
        total += item.quantity * item.price
    })

    const [isEnabled, setIsEnabled] = useState(false);
    const [searchProduct, setSearchedProduct] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dishes.map((item) => {
            if (item.title == search) {
                if (searchProduct.length == 0) {
                    setSearchedProduct([...searchProduct, item]);
                }
                else {
                    searchProduct.map((dish) => {
                        if (dish.id != item.id) {
                            setSearchedProduct([...searchProduct, item]);
                        }
                    })
                }


            }
        })
    }, [search])



    useEffect(() => {
        if (search == '') {
            setSearchedProduct([]);
        }
    }, [search])


    let vegIcon = <View style={{ borderRadius: 2, height: 20, width: 20, borderWidth: 2, borderColor: '#00923F', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ height: 12, width: 12, backgroundColor: '#00923F', borderRadius: 15 / 2 }} >

        </View>
    </View>;

    let nonVegIcon = <View style={{ borderRadius: 2, height: 20, width: 20, borderWidth: 2, borderColor: '#DA251E', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ height: 12, width: 12, backgroundColor: '#DA251E', borderRadius: 15 / 2 }} >

        </View>
    </View>;


    return (
        <View style={{ flex: 1 }} >
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" animated={true} />
            <View style={{ height: 0.08 * SIZES.height, paddingLeft: 10, flexDirection: 'row', marginTop: 0, justifyContent: 'flex-start', alignItems: 'center' }} >
                <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                <View style={{
                    left:20,
                    height: 0.055 * SIZES.height,
                    width: 0.8 * SIZES.width,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    elevation: 5,
                    flexDirection: 'row'
                }}>
                    <View style={{ height: '100%', width: '15%', justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="search" size={30} />
                    </View>
                    <View style={{ height: '100%', width: '85%', justifyContent: 'center', }} >
                        <TextInput 
                    placeholderTextColor="#000"
                    style={{ color: '#000' }}
                        placeholder="Search here"
                            // value={search}
                            value={search}
                            onChangeText={(text) => { setSearch(text) }}
                            style={{ flex: 1, }} />
                    </View>
                </View>
            </View>
            {search == '' ?
                <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                        <Text style={{ fontSize: 16, }} >Recently Searched</Text>
                        <TouchableOpacity onPress={() => setSearch('')} >
                            <Text style={{ fontSize: 16, color: 'red' }} >Clear</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            numColumns={2}
                            data={recentlySearched}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => setSearch(item.title)} style={{
                                        flexDirection: 'row',
                                        height: 30,
                                        top: 10,
                                        margin: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 5
                                    }} >
                                        <Entypo name="back-in-time" size={15} style={{ paddingHorizontal: 5 }} />
                                        <Text style={{ fontSize: 12, paddingHorizontal: 5 }} >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                </View>
                :
                <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 }} >
                    <View style={{ height: 0.05 * SIZES.height, width: SIZES.width, borderBottomWidth: 1, backgroundColor: '#fff', borderColor: '#ccc' }} >
                        <View>
                            <Switch />
                        </View>

                    </View>
                    {searchProduct.map((item, i) => {

                        let quantity;
                        let ind;

                        cartItems.map((dish, index) => {
                            if (dish.id == item.id) {
                                ind = index;
                                quantity = dish.quantity;
                            }
                        })

                        return (
                            <View
                                key={i}
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 1,
                                    borderColor: '#ccc',

                                    flexDirection: 'row',
                                    paddingVertical: 10
                                }} >
                                <View style={{ flex: 0.7 }} >
                                    <View style={{ height: '14%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                        {item.type == 'veg' ? vegIcon : nonVegIcon}
                                        <Image source={require('../../assests/extras/Star.png')} style={{ left: 10 }} />
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FE7A00', left: 5 }} >  BESTSELLER</Text>
                                    </View>
                                    <View style={{ height: '16%', top: 5 }} >
                                        <Text style={{ fontSize: 16, fontWeight: '800' }} >{item.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', height: '22%', alignItems: 'center', top: 5 }} >
                                        <FontAwesome name="rupee" size={14} />
                                        <Text style={{ fontSize: 14 }} > {item.price}</Text>
                                    </View>
                                    <View style={{ height: '55%', paddingVertical: 10 }} >
                                        <Text>{item.description}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 0.3,
                                    height: '70%',
                                    width: '30%',
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    borderRadius: 5
                                }} >
                                    <Image style={{
                                        height: '100%',
                                        width: '100%',
                                        resizeMode: 'stretch',
                                        borderRadius: 1,
                                    }}
                                        source={item.path}
                                    />
                                    {quantity > 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 15, alignSelf: 'center', height: 30, width: 80, elevation: 2, backgroundColor: '#fff', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around' }} >
                                        <AntDesign name="minus" size={20} onPress={() => {
                                            if (quantity > 1) {
                                                decreaseProducts(ind)
                                            }
                                            else {
                                                removeProduct(ind);
                                                setSearch('');
                                                setSearchedProduct([]);
                                            }
                                        }} />
                                        <Text style={{ color: '#2E9E07', fontSize: 18, fontWeight: 'bold' }} >{quantity}</Text>
                                        <AntDesign name="plus" size={20} onPress={() => increaseProducts(ind)} />
                                    </View> :
                                        <TouchableOpacity onPress={() => { addToCart(item) }} style={{ justifyContent: 'center', alignItems: 'center', bottom: 15, alignSelf: 'center', height: 30, width: 80, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                            <Text style={{ color: '#2E9E07', fontSize: 18, fontWeight: 'bold' }} >Add</Text>
                                        </TouchableOpacity>
                                    }

                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            }

            {
                cartItems.length > 0 ? <TouchableOpacity onPress={() => { navigation.navigate('Cart') }} style={{
                    height: 0.055 * SIZES.height,
                    width: SIZES.width,
                    backgroundColor: '#2E9E07',
                    elevation: 5,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'

                    }} >
                        <Text style={{ fontSize: 14, color: '#fff' }} >{cartItems.length} items    |   </Text>

                        <FontAwesome name="rupee" size={14} color="#fff" >
                            <Text style={{fontSize:14}} >  {total}</Text>
                        </FontAwesome>

                    </View>
                    <View style={{

                        flexDirection: 'row',
                        alignItems: 'center'

                    }} >
                        <Text style={{ fontSize: 14, color: '#fff' }} >View Cart  </Text>

                        <EvilIcons name="cart" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>

                    :
                    null
            }


        </View>
    )
}

export default SearchScreen
