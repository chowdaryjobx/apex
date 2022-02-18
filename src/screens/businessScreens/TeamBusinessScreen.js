
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";


import DataContext from '../../context/DataContext';

import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

function TeamBusinessScreen({ navigation, route }) {

    const { TeamData } = route.params;


    const { authUser, user, userData, logOut, api, url,companyName } = React.useContext(DataContext);
    if (!user) {
        navigation.navigate('Login');
    }
    const [businessTeamData, setBusinessTeamData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [PageIndex, setPageIndex] = useState(null);
    const [TotalPgCount,setTotalPgCount] = useState(1);
    const [Goinputtxt,setGoinputtxt] = useState(1);
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
        if (TeamData) {

            let pgi = TeamData.pageIndex;
            pgi = parseInt(pgi);
            setPageIndex(pgi);
            setGoinputtxt(pgi);
            filldata(TeamData.type,TeamData.ReportNo,pgi,user.TokenId)
        }
    }, [])

    function filldata(TeamType,RptNo,PGIndex,TokID)
    {
        axios.post(api + url.TeamWiseReport, { Team: TeamType, ReportNo: RptNo, PageIndex: PGIndex, TokenID: TokID })
        .then((res) => {

            if (res.data[0].Status === 'Success') {
                setErrorMessage(null);
                setTableData(res.data[0].Team);
                setBusinessTeamData(res.data[0])
                setTotalPgCount(res.data[0].TotalPages);
            }
            else if (res.data[0].Status === 'Failure') {
                if (res.data[0].Response === "Server is busy, please try again later") {
                    navigation.navigate('PayoutTimeError');
                }
                else {
                    setErrorMessage(res.data.Response)
                }
               

            }
        })
        .catch((err) => { setErrorMessage(err.message) })
    }

    const onpagerefresh = () => {
        setPagerefreshing(true);
        filldata(TeamData.type,TeamData.ReportNo,PageIndex,user.TokenId)
        setPagerefreshing(false);
    }

    function PrvClking(PgiValue)
    {
        PgiValue = parseInt(PgiValue);
        setPageIndex((PgiValue - 1));
        setGoinputtxt((PgiValue - 1));
        filldata(TeamData.type,TeamData.ReportNo,(PgiValue - 1),user.TokenId)
    }

    function NxtClking(PgiValue)
    {
        PgiValue = parseInt(PgiValue);
        setPageIndex((PgiValue + 1));
        setGoinputtxt((PgiValue + 1));
        filldata(TeamData.type,TeamData.ReportNo,(PgiValue + 1),user.TokenId)
    }

    function GoClking(PgiValue)
    {
        PgiValue = parseInt(PgiValue);

        if (PgiValue >= TotalPgCount)
        {
            PgiValue = TotalPgCount;
        }
        else if (PgiValue <= 0)
        {
            PgiValue = 1;
        }

        setPageIndex(PgiValue);
        setGoinputtxt(PgiValue);
        filldata(TeamData.type,TeamData.ReportNo,PgiValue,user.TokenId)
    }
    
    if (businessTeamData) {
        return (
            <View style={{ flex: 1,backgroundColor:'#fff' }} >
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
                <ScrollView refreshControl = {<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30 }}>

                    <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }} >{businessTeamData.Heading} {businessTeamData.TeamBusiness + '/' + businessTeamData.TeamCount}</Text>
                    <View style={{ width: '100%', elevation: 10, backgroundColor: '#fff', borderRadius: 10, marginTop: 20, marginBottom: 10 }} >
                        <View key={0} style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Name</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Level</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >A Team</Text>
                            <MaterialCommunityIcons name="beta" size={20} />
                            {/* <Text style={{ flex: 1, alignSelf: 'flex-start' }} >B Team</Text> */}
                        </View>
                        {tableData.length !== 0 ?
                            tableData.map((item, index) => 
                                    <View key={index + 1} style={{ width: '100%', padding: 10, paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('TeamMemberData', { TeamMemberData: item.DownlineTokenID }) }} style={{ flex: 1, alignSelf: 'flex-start' }}  >
                                            <Text >{item.Name}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.Level}</Text>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.ATeam}</Text>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.BTeam}</Text>
                                    </View>
                            ) : <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                <Text style={{ fontSize: 16, color: "red" }} >No Records Found</Text>
                            </View>
                        }
                    </View>                   
                </View>
                </ScrollView>
                
                {tableData.length !== 0 ?
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
                      justifyContent:'space-between'
                    }}  >
                        <TouchableOpacity style={{alignSelf:'center', padding: 10}} onPress={() => { PageIndex > 1 ? PrvClking(PageIndex) : null }} >
                            <Feather name="chevron-left" size={20} color="white"  />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', }} >
                            <View style={{height:40,width:70,borderWidth:1,borderColor:'#fff',justifyContent:'center',alignItems:'center',paddingLeft:10}} >
                                <TextInput value={Goinputtxt+''} style={{fontSize:16}} keyboardType="number-pad" onChangeText={(text) => { setGoinputtxt(text) }} />
                            </View>
                      <Text style={{alignSelf:'center',fontSize:18,color:'#fff'}} >  / {TotalPgCount}</Text>
                        </View>
                  
                            <TouchableOpacity  onPress={()=> {GoClking(Goinputtxt)} } style={{alignSelf:'center'}}  >
                                <Text style={{fontSize:18,color:'#fff'}} >Go</Text>
                            </TouchableOpacity>

                        <TouchableOpacity style={{alignSelf:'center', padding: 10}} onPress={() => {  TotalPgCount > PageIndex ? NxtClking(PageIndex) : null }} >
                            <Feather name="chevron-right" size={20} color="white" />
                        </TouchableOpacity>

                    </View>



                </LinearGradient> : null
    }

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

export default TeamBusinessScreen





