import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Button,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DataContext from '../../context/DataContext';

const status = [
  'Order Placed',
  'Arrived to E-Cart',
  'Order Delivered',
  //   'status 4',
  //   'status 5',
  //   'status 6',
  //   'status 7',
];
const activeColor = 'blue';

function OrderDetails({navigation, route}) {
  const [activeIndex, setActive] = useState(0);
  console.log(activeIndex);
  const setActiveIndex = val => {
    LayoutAnimation.easeInEaseOut();
    setActive(val);
  };
  const marginTop = (100 / (status.length - 1)) * activeIndex - 100 + '%';

  const Item = route.params.item;
  const {
    user,
    cartItems,
    userData,
    productStatus,
    companyName,
    url,
    api,
    products,
    addToCart,
    brands,
    font_desc,
    fonts,
  } = React.useContext(DataContext);

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#35CBC4', '#16ABB1']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0.25}}
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          height: '8%',
          width: '100%',
        }}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              // width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <AntDesign name="arrowleft" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: fonts.BOLD,
                color: '#fff',
                left: 15,
                fontSize: 18,
              }}>
              Order Details
            </Text>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{paddingBottom: 10}}>
        <View
          style={{
            backgroundColor: '#fff',
          }}>
          <View
            style={{padding: 20, borderBottomWidth: 1, borderColor: '#ccc'}}>
            <Text style={{fontFamily: fonts.BOLD}}>
              OrderID : {Item.orderno}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            height: 150,
            flexDirection: 'row',
          }}>
          <View
            style={{
              padding: 20,
              height: '100%',
              width: '40%',
              // backgroundColor: 'lightblue',
            }}>
            <Image
              resizeMode="contain"
              style={{height: '100%', width: '100%'}}
              source={{uri: Item.img}}
            />
          </View>
          <View
            style={{
              padding: 20,
              height: '100%',
              width: '60%',
              justifyContent: 'center',

              // backgroundColor: 'blue',
            }}>
            <Text style={{fontFamily: fonts.BOLD, fontSize: 15}}>
              {Item.title}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            alert('Product detail screen');
          }}
          style={{
            padding: 20,
            backgroundColor: '#fff',
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>View Details</Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Entypo name="chevron-small-right" size={25} />
          </View>
        </TouchableOpacity>
        <View
          style={{
            paddingVertical: 20,
            height: 300,
            width: '100%',
            backgroundColor: '#fff',
          }}>
          <View style={styles.statusContainer}>
            <View style={styles.line}>
              <View style={[styles.activeLine, {marginTop}]}></View>
              {/* <View style={[styles.activeLine, {marginTop}]} /> */}
            </View>
            {/* {status.map((status, index) => (
            <View style={[styles.dot]} key={index}>
              <View
                style={[
                  index <= activeIndex
                    ? {height: '100%', width: '100%'}
                    : {height: '40%', width: '40%'},
                  {backgroundColor: activeColor, borderRadius: 20},
                ]}
              />
            </View>
          ))} */}
            <View style={styles.labelContainer}>
              {status.map((status, index) => (
                <Text
                  key={index}
                  numberOfLines={1}
                  style={[
                    index >= 0 == 0 ? {top: 20} : {top: 0},
                    styles.label,
                    {fontFamily: fonts.BOLD},
                  ]}>
                  {status}
                </Text>
              ))}
            </View>
          </View>
          {/* <View style={styles.btns}>
            <Button
              title="prev"
              onPress={() => setActiveIndex(activeIndex - 1)}
              disabled={activeIndex <= 0}
            />
            <Button
              title="next"
              onPress={() => setActiveIndex(activeIndex + 1)}
              disabled={activeIndex >= status.length - 1}
            />
          </View> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  statusContainer: {
    // flexDirection: 'row',
    // paddingVertical: 20,
    alignItems: 'center',
    width: '30%',
    height: '100%',
    justifyContent: 'space-between',
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    //   left:5,
    alignItems: 'center',
    width: 5,
    height: '100%',
    backgroundColor: '#ccc',
    position: 'absolute',
    borderRadius: 5,
    overflow: 'hidden',
  },
  activeLine: {
    height: '100%',
    width: '100%',
    backgroundColor: activeColor,
    borderRadius: 5,
  },
  btns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  labelContainer: {
    height: '100%',
    position: 'absolute',
    left: 100,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
  },
  prop: {
    marginBottom: 20,
    width: 100,
    textAlign: 'center',
  },
});

export default OrderDetails;
