import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Carousal() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    ' https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Deals_1x._SY304_CB430401028_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432774351_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/September/DashboardCards/Fuji_Desktop_Dash_Kindle_1x._SY304_CB639752818_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg',
    'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Laptops_379x304_1X_en_US._SY304_CB418608471_.jpg',
  ];

  function onchange(nativeEvent) {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != activeImage) {
        setActiveImage(slide);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {images.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.wrap}
              source={{uri: e}}
            />
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={activeImage == index ? styles.dotActive : styles.dot}>
              ●
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    backgroundColor: 'lightblue',
  },
  wrapDot: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    margin: 3,
    color: '#fff',
  },
  dotActive: {
    margin: 3,
    color: '#ccc',
  },
});

export default Carousal;
