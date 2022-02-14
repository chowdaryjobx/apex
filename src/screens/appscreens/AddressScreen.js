import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import MapView from 'react-native-maps';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AddressScreen() {


  const { isChangeAddress, setIsChangeAddress } = useState(true);

  const [value, setValue] = useState(false);

  if (value) {
    return (
      <View style={{ flex: 1 }} >
        <View style={{ flex: 0.4, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }} >
          <Text>Maps Screen1</Text>
        </View>
        <View style={{ flex: 0.6, backgroundColor: '#FFF', elevation: 15, paddingHorizontal: 20, paddingVertical: 20 }} >

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
            <Text>SELECT DELIVERY LOCATION</Text>
            <MaterialCommunityIcons name="crosshairs-gps" size={30} style={{ right: 10 }} color="#F25816" />
          </View>


          <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }} >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <EvilIcons name="location" size={30} color="#F25816" />
              <Text style={{ fontSize: 16, fontWeight: '500' }} >Vadapalani</Text>
            </View>


          </View>
          <View style={{ flex: 1, top: 10, paddingHorizontal: 10, justifyContent: 'space-between' }} >
            <ScrollView style={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} >
              <View style={{ paddingHorizontal: 0, }} >
                <Text style={{ fontSize: 14, fontWeight: '3 00' }} >
                  Vallalar Street, Ngo Colony,
                </Text>
                <Text style={{ fontSize: 14, fontWeight: '300' }} >
                  Vadapalani, Chennai, Tamilnadu
                </Text>
              </View>
              <View >
                <TextInput
                  placeholderTextColor="#000"
                  placeholder="Hose / Flat no. / Block No."
                  style={{ borderBottomWidth: 1, borderRadius: 5, color: '#000' }} />
                <TextInput
                  placeholderTextColor="#000"
                  placeholder="Apartment / Road / Area (optional)"
                  style={{ borderBottomWidth: 1, borderRadius: 5, color: '#000' }} />

                <Text
                  style={{ paddingVertical: 10, }} >Directions to reach (Optional)</Text>
                <TextInput multiline={true}
                  placeholderTextColor="#000"
                  style={{ color: '#000' }}
                  numberOfLines={4} style={{ top: 5, borderWidth: 1, borderRadius: 5, paddingBottom: 20 }} />
              </View>
              <View style={{ height: 50, width: '100%' }} ></View>
            </ScrollView>


            <TouchableOpacity onPress={() => setValue(!value)} style={{ marginBottom: 5, borderRadius: 5, backgroundColor: '#F25816', padding: 12, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ fontSize: 16, fontWeight: '300', color: '#fff' }} >
                Save and Proceed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )


  }
  else {
    return (<View style={{ flex: 1 }} >
      <View style={{ flex: 0.7, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }} >
        <Text>Maps Screen</Text>
      </View>
      <View style={{ flex: 0.3, backgroundColor: '#FFF', elevation: 15, paddingHorizontal: 20, paddingVertical: 20 }} >
        <Text>SELECT DELIVERY LOCATION</Text>
        <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <EvilIcons name="location" size={30} color="#F25816" />
            <Text style={{ fontSize: 16, fontWeight: '500' }} >Vadapalani</Text>
          </View>

          <TouchableOpacity onPress={() => setValue(!value)} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 0, paddingHorizontal: 15, borderWidth: 1, borderColor: '#F25816', borderRadius: 5 }} >
            <Text style={{ fontSize: 12, color: '#F25816' }} >Change</Text>
          </TouchableOpacity>

        </View>
        <View style={{ flex: 1, top: 10, paddingHorizontal: 0, justifyContent: 'space-between' }} >

          <View style={{ paddingHorizontal: 10, }} >
            <Text style={{ fontSize: 14, fontWeight: '300' }} >
              Vallalar Street, Ngo Colony,
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '300' }} >
              Vadapalani, Chennai, Tamilnadu
            </Text>
          </View>

          <View style={{ marginBottom: 5, borderRadius: 5, backgroundColor: '#F25816', padding: 12, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={{ fontSize: 16, fontWeight: '300', color: '#fff' }} >
              Confirm Location
            </Text>
          </View>
        </View>
      </View>

    </View>)
  }






}

export default AddressScreen
