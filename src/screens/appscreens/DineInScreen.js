import React, { useState } from 'react'
import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import DatePicker from 'react-native-datepicker';

import { COLORS, SIZES } from '../../constants';
import DataContext from '../../context/DataContext';



function DineInScreen({ navigation }) {


    const { user, userData } = React.useContext(DataContext);
    const [switching, setSwitching] = useState({ button1: true, button2: false });
    const [refresh, setRefresh] = useState(false);
    const [selectedTables, setSelectedTables] = useState(false);
    const [date, setDate] = useState('');

    const [acData, setAcData] = useState([
        {
            id: 1,
            status: 'available',

        },
        {
            id: 2,
            status: 'available',

        },
        {
            id: 3,
            status: 'available',

        },
        {
            id: 4,
            status: 'occupied',

        },
        {
            id: 5,
            status: 'available',

        },
        {
            id: 6,
            status: 'available',

        },
        {
            id: 7,
            status: 'occupied',

        },
        {
            id: 8,
            status: 'occupied',

        },
        {
            id: 9,
            status: 'available',

        },
        {
            id: 10,
            status: 'occupied',

        },
        {
            id: 11,
            status: 'available',

        },
        {
            id: 12,
            status: 'occupied',

        },
        {
            id: 13,
            status: 'available',

        },
        {
            id: 14,
            status: 'occupied',

        },
        {
            id: 15,
            status: 'available',

        },
        {
            id: 16,
            status: 'available',

        },
        {
            id: 17,
            status: 'available',

        },
        {
            id: 18,
            status: 'occupied',

        },
        {
            id: 19,
            status: 'occupied',

        },
        {
            id: 20,
            status: 'occupied',

        },
        {
            id: 21,
            status: 'available',

        },
        {
            id: 22,
            status: 'available',

        },
        {
            id: 23,
            status: 'available',

        },
        {
            id: 24,
            status: 'occupied',

        },
        {
            id: 25,
            status: 'available',

        },
        {
            id: 26,
            status: 'available',

        },
        {
            id: 27,
            status: 'available',

        },
        {
            id: 28,
            status: 'occupied',

        },
        {
            id: 29,
            status: 'available',

        },
        {
            id: 30,
            status: 'occupied',

        },


    ]);


    const [nonAcData, setNonAcData] = useState([
        {
            id: 1,
            status: 'available',

        },
        {
            id: 2,
            status: 'available',

        },
        {
            id: 3,
            status: 'available',

        },
        {
            id: 4,
            status: 'available',

        },
        {
            id: 5,
            status: 'available',

        },
        {
            id: 6,
            status: 'available',

        },
        {
            id: 7,
            status: 'available',

        },
        {
            id: 8,
            status: 'available',

        },
        {
            id: 9,
            status: 'available',

        },
        {
            id: 10,
            status: 'available',

        },
        {
            id: 11,
            status: 'available',

        },
        {
            id: 12,
            status: 'occupied',

        },
        {
            id: 13,
            status: 'available',

        },
        {
            id: 14,
            status: 'available',

        },
        {
            id: 15,
            status: 'available',

        },
        {
            id: 16,
            status: 'available',

        },
        {
            id: 17,
            status: 'available',

        },
        {
            id: 18,
            status: 'available',

        },
        {
            id: 19,
            status: 'available',

        },
        {
            id: 20,
            status: 'available',

        },
        {
            id: 21,
            status: 'available',

        },
        {
            id: 22,
            status: 'available',

        },
        {
            id: 23,
            status: 'available',

        },
        {
            id: 24,
            status: 'available',

        },
        {
            id: 25,
            status: 'available',

        },
        {
            id: 26,
            status: 'available',

        },
        {
            id: 27,
            status: 'available',

        },
        {
            id: 28,
            status: 'available',

        },
        {
            id: 29,
            status: 'available',

        },
        {
            id: 30,
            status: 'available',

        },


    ]);


    function upDateAcTable(index, value) {
        if (value == "selected") {
            let item = { id: index + 1, status: "available" }
            acData.splice(index, 1, item);
            setRefresh(!refresh);
        }
        else if (value == "available") {
            let item = { id: index + 1, status: "selected" }
            acData.splice(index, 1, item);
            setRefresh(!refresh);
        }

    }

    function upDateNonAcTable(index, value) {
        if (value == "selected") {
            let item = { id: index + 1, status: "available" }
            nonAcData.splice(index, 1, item);
            setRefresh(!refresh);
        }
        else if (value == "available") {
            let item = { id: index + 1, status: "selected" }
            nonAcData.splice(index, 1, item);
            setRefresh(!refresh);
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: '#ccc' }} >
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" animated={true} />



            <View style={styles.headerContainer} >
                <AntDesign name="arrowleft" size={30} onPress={() => navigation.goBack()} />
                <View style={styles.header}>
                    <Text style={{ fontSize: 18, fontWeight: '500' }} >Arafah DineIn  </Text>
                    <Image source={require('../../assests/extras/dineincolor.png')} style={{ height: 15, width: 40 }} />
                </View>



            </View>


            <View style={{ flex: 1, }} >
                <View style={{ top: 5, flex: 0.06, backgroundColor: '#fff', flexDirection: 'row' }} >
                    <TouchableOpacity onPress={() => { setSwitching({ button1: true, button2: false }) }}
                        style={{ backgroundColor: switching.button1 ? '#2E9E07' : '#fff', flex: 1, justifyContent: 'center', alignItems: 'center', }} >
                        <Text style={{ fontSize: 14, color: switching.button1 ? '#fff' : 'black' }} >AC</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setSwitching({ button1: false, button2: true }) }}
                        style={{ flex: 1, backgroundColor: switching.button2 ? '#2E9E07' : '#fff', justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 14, color: switching.button1 ? 'black' : '#fff' }}  >NON AC</Text>
                    </TouchableOpacity>
                </View>
                {
                    switching.button1 ?
                        <View style={{ top: 10, flex: 0.9, backgroundColor: '#fff', padding: 20 }} >
                            <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, }} >
                                <Text style={{ top: -10, fontSize: 16, fontWeight: '500' }} >Select a Table in AC</Text>
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ width: 0.5 * SIZES.width, flexDirection: 'row', justifyContent: 'space-around', }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.boxAvailable} >
                                                <Text style={styles.boxText} >15</Text>
                                            </View>
                                            <Text style={styles.boxText} >Available</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.boxOccupied} >
                                                <Text style={styles.boxText} >15</Text>
                                            </View>
                                            <Text style={styles.boxText} >Occupied</Text>
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                            <View style={styles.boxSelected} >
                                                <Text style={styles.boxText} >15</Text>
                                            </View>
                                            <Text style={styles.boxText} >Selected</Text>
                                        </View>

                                    </View>
                                    <View style={{ width: 0.5 * SIZES.width, flexDirection: 'row', justifyContent: 'space-around', }} >
                                        {/* <DatePicker
                                            date={date}
                                            // placeholder='Se'
                                            onDateChange={(d)=>{setDate(d)}}
                                            format='DD-M-YYYY'
                                            style={{ borderColor: 'green' }}
                                        /> */}
                                    </View>
                                </View>


                            </View>
                            <View style={styles.flatListContainerStyle} >
                                <View style={{ backgroundColor: '#fff' }} >
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        numColumns={6}
                                        keyExtractor={(item, index) => index}
                                        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
                                        data={acData} renderItem={({ item, index }) => {
                                            if (item.status == "available") {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        let value = item.status;
                                                        upDateAcTable(index, value)
                                                    }} style={styles.boxAvailable} >
                                                    <Text style={styles.boxText}>{item.id}</Text>
                                                </TouchableOpacity>
                                            }
                                            else if (item.status == "selected") {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        let value = item.status;
                                                        upDateAcTable(index, value)
                                                    }}
                                                    style={styles.boxSelected} >
                                                    <Text style={styles.boxText} >{item.id}</Text>
                                                </TouchableOpacity>
                                            }
                                            else if (item.status == "occupied") {
                                                return <View style={styles.boxOccupied} >
                                                    <Text style={styles.boxText} >{item.id}</Text>
                                                </View>
                                            }
                                        }} />
                                </View>
                                <View style={{}} >
                                    <View style={{}} >
                                        <Text style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }} >Selected Table NO's :{acData.map((item) => {
                                            if (item.status == 'selected') {
                                                return <Text>{item.id > 1 ? ',' : null}{item.id}</Text>
                                            }
                                        })}</Text>
                                    </View>
                                    {
                                        true ? <TouchableOpacity
                                            onPress={() => { user ? navigation.navigate('Payment', { total: 200 }) : navigation.navigate('Login') }}
                                            style={{ justifyContent: 'center', alignItems: 'center', top: 50 }}>
                                            <LinearGradient
                                                colors={['#62B742', '#23A26F']}
                                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                                                style={{ height: 50, width: 0.6 * SIZES.width, backgroundColor: '#959595', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={{ fontSize: 16, color: '#fff' }} >Book Table</Text>
                                            </LinearGradient>

                                        </TouchableOpacity> : <TouchableOpacity
                                            onPress={() => { user ? alert("please selsect table to book") : navigation.navigate('Login') }}
                                            style={{ justifyContent: 'center', alignItems: 'center', top: 50 }} >
                                            <View

                                                style={{ height: 50, width: 0.6 * SIZES.width, backgroundColor: '#959595', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={{ fontSize: 16, color: '#fff' }} >Book Table1</Text>
                                            </View>

                                        </TouchableOpacity>}
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ top: 10, flex: 0.9, backgroundColor: '#fff', padding: 20 }} >
                            <View style={{ backgroundColor: '#fff', borderBottomWidth: 1 }} >
                                <Text style={{ top: -10, fontSize: 16, fontWeight: '500' }} >Select a Table in Non AC</Text>
                                <View style={{ width: 0.5 * SIZES.width, flexDirection: 'row', justifyContent: 'space-around' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <View style={styles.boxAvailable} >
                                            <Text style={styles.boxText} >15</Text>
                                        </View>
                                        <Text style={styles.boxText} >Available</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <View style={styles.boxOccupied} >
                                            <Text style={styles.boxText} >15</Text>
                                        </View>
                                        <Text style={styles.boxText} >Occupied</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                        <View style={styles.boxSelected} >
                                            <Text style={styles.boxText} >15</Text>
                                        </View>
                                        <Text style={styles.boxText} >Selected</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.flatListContainerStyle} >
                                <View style={{ backgroundColor: '#fff' }} >
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        numColumns={6}
                                        keyExtractor={(item, index) => index}
                                        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 20 }}
                                        data={nonAcData} renderItem={({ item, index }) => {
                                            if (item.status == "available") {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        let value = item.status;
                                                        upDateNonAcTable(index, value)
                                                    }} style={styles.boxAvailable} >
                                                    <Text style={styles.boxText}>{item.id}</Text>
                                                </TouchableOpacity>
                                            }
                                            else if (item.status == "selected") {
                                                return <TouchableOpacity
                                                    key={index}
                                                    onPress={() => {
                                                        let value = item.status;
                                                        upDateNonAcTable(index, value)
                                                    }}
                                                    style={styles.boxSelected} >
                                                    <Text style={styles.boxText} >{item.id}</Text>
                                                </TouchableOpacity>
                                            }
                                            else if (item.status == "occupied") {
                                                return <View style={styles.boxOccupied} >
                                                    <Text style={styles.boxText} >{item.id}</Text>
                                                </View>
                                            }
                                        }} />
                                </View>
                                <View style={{}} >
                                    <View style={{}} >
                                        <Text style={{ fontSize: 16, marginHorizontal: 10, marginTop: 10 }} >Selected Table NO's :{nonAcData.map((item) => {
                                            if (item.status == 'selected') {
                                                return <Text>{item.id > 1 ? ',' : null}{item.id}</Text>
                                            }
                                        })}</Text>
                                    </View>
                                    {
                                        true ? <TouchableOpacity
                                            onPress={() => { user ? navigation.navigate('Payment', { total: 210 }) : navigation.navigate('Login') }}
                                            style={{ justifyContent: 'center', alignItems: 'center', top: 50 }} >
                                            <LinearGradient
                                                colors={['#62B742', '#23A26F']}
                                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                                                style={{ height: 50, width: 0.6 * SIZES.width, backgroundColor: '#959595', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={{ fontSize: 16, color: '#fff' }} >Book Table</Text>
                                            </LinearGradient>

                                        </TouchableOpacity> : <TouchableOpacity
                                            onPress={() => { user ? alert("please select table to book") : navigation.navigate('Login') }}
                                            style={{ justifyContent: 'center', alignItems: 'center', top: 50 }} >
                                            <View

                                                style={{ height: 50, width: 0.6 * SIZES.width, backgroundColor: '#959595', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={{ fontSize: 16, color: '#fff' }} >Book Table1</Text>
                                            </View>

                                        </TouchableOpacity>}
                                </View>
                            </View>
                        </View>
                }
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    text: { fontSize: 30 },
    boxAvailable: {
        height: 25, width: 25, borderWidth: 2, borderColor: '#2E9E07', borderRadius: 4, justifyContent: 'center', alignItems: 'center'
    },
    boxOccupied: {
        height: 25, width: 25, borderWidth: 2, borderColor: '#D3D3D3', borderRadius: 4, backgroundColor: '#D3D3D3', justifyContent: 'center', alignItems: 'center'
    },
    boxSelected: {
        height: 25, width: 25, borderWidth: 2, borderColor: '#2E9E07', borderRadius: 4, backgroundColor: '#2E9E07', justifyContent: 'center', alignItems: 'center'
    },
    boxText: {
        fontSize: 10,
    },
    flatListContainerStyle: { flex: 1, backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 10, top: 10 },
    headerContainer: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingLeft: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
    header: {
        height: 0.07 * SIZES.height,
        width: 0.8 * SIZES.width,
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
    }

})






export default DineInScreen
