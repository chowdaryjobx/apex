import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import DataContext from '../../context/DataContext';

function SettingsScreen({ navigation }) {



    const [passwords, setPasswords] = useState(false);
    const [passwordType, setPasswordType] = useState(null);



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

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Settings</Text>
                    </View>



                </View>



            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff', alignItems: 'center' }} >
                <TouchableOpacity onPress={() => { navigation.navigate('ProfileEditing') }} style={{ height: '8%', width: '90%', backgroundColor: '#fff', elevation: 5, marginTop: 20, borderRadius: 10, flexDirection: 'row' }} >


                    <View style={{ height: '100%', width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <FontAwesome name="edit" size={20} />
                    </View>
                    <View style={{ height: '100%', width: '60%', justifyContent: 'center', }} >
                        <Text style={{ fontSize: 16 }}>Edit Profile</Text>
                    </View>
                    <View style={{ height: '100%', width: '20%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="chevron-right" size={30} />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setPasswords(!passwords) }} style={{ height: '8%', width: '90%', backgroundColor: '#fff', elevation: 5, marginTop: 10, borderRadius: 10, flexDirection: 'row' }} >


                    <View style={{ height: '100%', width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <FontAwesome name="unlock-alt" size={20} />
                    </View>
                    <View style={{ height: '100%', width: '60%', justifyContent: 'center', }} >
                        <Text style={{ fontSize: 16 }}>Passwords</Text>
                    </View>
                    <View style={{ height: '100%', width: '20%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="chevron-right" size={30} />
                    </View>

                </TouchableOpacity>
                {
                    passwords ?
                        <View style={{ height: '14%', width: '90%', elevation: 4, backgroundColor: '#fff', marginTop: -10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                            <TouchableOpacity onPress={() => { navigation.navigate('PasswordsScreen', { pwdType: 'Profile' }) }} style={{ flex: 1, flexDirection: 'row', }} >
                                <View style={{ height: '100%', width: '20%', }} ></View>
                                <View style={{ height: '100%', width: '80%', flexDirection: 'row' }} >
                                    <View style={{ height: '100%', width: '20%', justifyContent: 'flex-end', }} >
                                        <EvilIcons name="chevron-right" size={30} />
                                    </View>
                                    <View style={{ height: '100%', width: '80%', justifyContent: 'flex-end', }} >
                                        <Text>Login Password</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { navigation.navigate('PasswordsScreen', { pwdType: 'Txn' }) }} style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ height: '100%', width: '20%', }} ></View>
                                <View style={{ height: '100%', width: '80%', flexDirection: 'row' }} >
                                    <View style={{ height: '100%', width: '20%', justifyContent: 'center', }} >
                                        <EvilIcons name="chevron-right" size={30} />
                                    </View>
                                    <View style={{ height: '100%', width: '80%', justifyContent: 'center', }} >
                                        <Text>Transcation Password</Text>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        </View>

                        : null
                }
    
                <TouchableOpacity onPress={() => { navigation.navigate('BankDetails') }} style={{ height: '8%', width: '90%', backgroundColor: '#fff', elevation: 5, marginTop: 10, borderRadius: 10, flexDirection: 'row' }} >


                    <View style={{ height: '100%', width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <AntDesign name="plus" size={20} />
                    </View>
                    <View style={{ height: '100%', width: '60%', justifyContent: 'center', }} >
                        <Text style={{ fontSize: 16 }}>Add/Update Bank Details</Text>
                    </View>
                    <View style={{ height: '100%', width: '20%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="chevron-right" size={30} />
                    </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('PanCard') }} style={{ height: '8%', width: '90%', backgroundColor: '#fff', elevation: 5, marginTop: 10, borderRadius: 10, flexDirection: 'row' }} >


                    <View style={{ height: '100%', width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <AntDesign name="plus" size={20} />
                    </View>
                    <View style={{ height: '100%', width: '60%', justifyContent: 'center', }} >
                        <Text style={{ fontSize: 16 }}>Add/Update PAN</Text>
                    </View>
                    <View style={{ height: '100%', width: '20%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="chevron-right" size={30} />
                    </View>

                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <MaterialCommunityIcons name="account" size={15} color="black" />
                    <TouchableOpacity onPress={() => { navigation.navigate('ProfileEditing') }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Edit Profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <Entypo name="key" size={15} color="black" />
                    <TouchableOpacity onPress={() => { setPasswords(!passwords) }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Passwords</Text>
                    </TouchableOpacity>
                </View>
                {
                    passwords ?
                        <View style={{ marginLeft: 20 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }} >
                                <View style={{ height: 7, width: 7, borderRadius: 5, borderWidth: 1, borderColor: '#7c7c7c', backgroundColor: '#7c7c7c' }} ></View>
                                <TouchableOpacity onPress={() => { navigation.navigate('PasswordsScreen', { pwdType: 'Profile' }) }} style={{ paddingLeft: 10 }} >
                                    <Text style={{ fontSize: 14, color: '#7c7c7c' }} >Login Password</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }} >
                                <View style={{ height: 7, width: 7, borderRadius: 5, borderWidth: 1, borderColor: '#7c7c7c', backgroundColor: '#7c7c7c' }} ></View>
                                <TouchableOpacity onPress={() => { navigation.navigate('PasswordsScreen', { pwdType: 'Txn' }) }} style={{ paddingLeft: 10 }} >
                                    <Text style={{ fontSize: 14, color: '#7c7c7c' }} >Transaction Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View> : null}

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <FontAwesome name="bank" size={14} color="black" />
                    <TouchableOpacity onPress={() => { navigation.navigate('BankDetails') }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Add/Update Bank Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <AntDesign name="idcard" size={15} color="black" />
                    <TouchableOpacity onPress={() => { navigation.navigate('PanCard') }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Add/Update PAN  </Text>
                    </TouchableOpacity>
                </View> */}



            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default SettingsScreen
