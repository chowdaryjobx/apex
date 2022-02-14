import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../../constants';

import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';

function NetworkError({navigation}) {
  const {companyName} = React.useContext(DataContext);
  const [isNetworkConnected, setIsNetworkConnected] = useState(null);
  const [Pagerefreshing, setPagerefreshing] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onpagerefresh = () => {
    setPagerefreshing(true);
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        navigation.goBack();
      }
    });
    setPagerefreshing(false);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      refreshControl={
        <RefreshControl
          refreshing={Pagerefreshing}
          onRefresh={onpagerefresh}></RefreshControl>
      }>
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 0.08 * SIZES.height,
          width: SIZES.width,
        }}>
        <View
          style={{
            paddingVertical: 13,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Text style={{color: COLORS.white, fontSize: 18}}>
              {companyName}
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="access-point-network-off"
            size={100}
            color="#b5b5b5"
          />
          <Text style={{fontSize: 18, color: '#b5b5b5', marginTop: 30}}>
            Check your network connection
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onpagerefresh();
          }}
          style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              padding: 5,
              paddingHorizontal: 40,
              borderRadius: 10,
              elvation: 5,
              backgroundColor: '#16ABB1',
            }}>
            <Text style={{fontSize: 16, color: '#fff'}}>Refresh</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default NetworkError;
