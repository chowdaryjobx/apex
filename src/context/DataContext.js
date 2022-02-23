import React, {useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {data} from '../../assests/data/Data';
var pkg = require('../../package.json');

const DataContext = React.createContext();

export const AuthContext = ({children, navigation}) => {
  const liveapi = '';
  const api = 'http://testapi.arafahmarket.in/api/';

  let appVersion = pkg.version;
  const url = {
    ReferralCheck: 'ReferralCheck',
    GetOTP: 'GetOTP',
    Registration: 'Registration',
    Login: 'Login',
    ResendOTP: 'ResendOTP',
    Forgot: 'Forgot',
    IDActivation: 'IDActivation',
    IDActivationTypes: 'IDActivationTypes',
    CommissionAndMyBankBalance: 'CommissionAndMyBankBalance',
    GenerateOrUpdateTxnPwd: 'GenerateOrUpdateTxnPwd',
    ChangePassword: 'ChangePassword',
    Profile: 'Profile',
    States: 'States',
    Districts: 'Districts',
    Wallet: 'Wallet',
    AllWalletBalance: 'AllWalletBalance',
    BankDetails: 'BankDetails',
    Panno: 'Panno',
    MyBusiness: 'MyBusiness',
    DailySales: 'DailySales',
    TeamAtaGlance: 'TeamAtaGlance',
    TeamWiseReport: 'TeamWiseReport',
    TeamUserData: 'TeamUserData',
    WithdrawPayouts: 'WithdrawPayouts',
    PaymentInfo: 'PaymentInfo',
    PaymentInfoLog: 'PaymentInfoLog',
  };

  const [companyName, setCompanyName] = useState('Ala Market');
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);
  const [productStatus, setProductStatus] = useState(null);
  const [user, setUser] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems);
  const [refresh, setRefresh] = useState(false);
  const [Err, setErr] = useState('');
  // test
  const [TokenIDN, setTokenIDN] = useState(
    '5kkxMgGdTJqKDljMjJcWhXHDqcBFvJwVGeKTfc2FmfjRCCH5hd36LnlUE5yyPQ3g',
  );


  const fontfamily = "Quicksand-Bold";


  // live
  // const [TokenIDN, setTokenIDN] = useState("DljMjJcWhXHMgGdTJqKDqcUE5yyBFvJwVGeKTfc2FmfjRCCH5hd36LnlPQ3g5kkx");

  //   useEffect(() => {
  //     const unsubscribe = NetInfo.addEventListener(state => {
  //       if (state.isConnected && state.isInternetReachable) {
  //         if (state.isConnected) {
  //           console.log('connected');
  //           //   setIsNetworkConnected(state.isConnected);
  //         }
  //       } else {
  //         console.log('not connected');
  //         // setIsNetworkConnected(false);
  //       }
  //     });
  //     // if (isNetworkConnected) {
  //     // } else {
  //     //   unsubscribe();
  //     // }
  //     unsubscribe();
  //   });

  const authUser = data => {
    setUser(data);
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('LOGGEDUSER');
      if (value !== null) {
        let data = JSON.parse(value);
        authUser(data);
      } else {
        console.log('No data found');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const logOut = async () => {
    let data = null;
    try {
      let clear = await AsyncStorage.clear();
      setUser(clear);
      setRefresh(!refresh);
    } catch (error) {}
  };

  const [deliverableAddresses, setDeliverableAddresses] = useState([
    {
      title: 'address1',
      type: 'Home',
      coordinates: {latitude: null, longitude: null},
      isSelected: false,
      houseNo: '2-115',
      apartmentName: 'luxury Homes',
      directionsToReach:
        'get to the top of the hill, turn right and head towards north to dead end.',
      street: '',
      colony: '',
      city: '',
      state: '',
    },
  ]);

  const [userData, setUserData] = useState({
    name: 'Prakesh',
    email: 'prakesh@gmail.com',
    phoneNumber: 9360736095,
    profilePic: require('../assests/extras/user.png'),
    // profilePic: 'https://m.media-amazon.com/images/I/81-80FPGX0L._AC_SY200_.jpg',
    token: 123456789,
    address: '4-256/8-1, Vadapalani,Tamilnadu',
    walletBalance: 500,
  });

  const [userCards, setCards] = useState([
    {
      id: 1,
      cardName: 'Card holder name',
      cardNumber: 'xxxx xxxx xxxx 1234',
      expiraryYear: 2025,
      expiraryMonth: 12,
      cvv: 121,
      nickName: 'personal',
      cardType: 'visa',
      bankName: 'Andhra Bank',
    },
  ]);

  const productState = state => {
    setProductStatus(state);
  };

  const addCard = cardData => {
    setCards([...userCards, cardData]);
  };

  const [userUpis, setUserUpis] = useState([
    {
      title: 'Gpay',
    },
    {
      title: 'Phone pay',
    },
    {
      title: 'Amazon pay',
    },
  ]);

  const addUpi = upiData => {
    setUserUpis([...userUpis, upiData]);
  };

  const showToastWithGravity = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const addToCart = item => {
    item = {...item, inCart: item.inCart + 1};
    if (cartItems.length === 0) {
      setCartItems([...cartItems, item]);
    } else {
      let flag = 0;
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === item.id) {
          flag = 'found';
          showToastWithGravity('Product already added to cart');
        } else {
          flag = 'notfound';
        }
      }
      if (flag === 'notfound') {
        setCartItems([...cartItems, item]);
        showToastWithGravity('Product added to cart');
      }
      // cartItems.map(product => {
      //   if (product.id !== item.id) {

      //     setCartItems([...cartItems, item]);
      //     console.log(product.id);
      //   } else {
      //     console.log('product already added');
      //   }
      // });
      // for (let i = 0; i < cartItems.length; i++) {
      //   if (cartItems[i].id === item.id) {
      //     setCartItems([...cartItems, item]);
      //   } else {
      //     console.log('item add already');
      //   }
      // }
    }
  };

  const increaseProducts = index => {
    cartItems[index].inCart = cartItems[index].inCart + 1;
    setRefresh(!refresh);
  };
  const decreaseProducts = index => {
    if (cartItems[index].quantity == 0) {
    }
    cartItems[index].inCart = cartItems[index].inCart - 1;
    setRefresh(!refresh);
  };
  const removeProduct = index => {
    cartItems.splice(index, 1);
    setRefresh(!refresh);
  };

  const [products, setProducts] = useState([
    {
      id: 12345,
      title: 'Alpite',
      productBy: 'Ala Market',
      description:
        'Useful to stimulate pancreas, to generate amount of insulting ...',
      bv: 1,
      drc: 10,
      mrp: 200,
      img: require('../../assests/images/apex/HEALTH/alpiste.png'),
      weight: '200g',
      inCart: 0,
    },
    {
      id: 12346,
      title: 'Herbo Flax',
      productBy: 'Amazon',
      description:
        'Useful to stimulate pancreas, to generate amount of insulting ...',
      bv: 1,
      drc: 20,
      mrp: 200,
      img: require('../../assests/images/apex/HEALTH/herboflax.png'),
      weight: '200g',
      inCart: 0,
    },
    {
      id: 12347,
      title: 'Kickbags',
      productBy: 'Amazon',
      description:
        'Useful to stimulate pancreas, to generate amount of insulting ...',
      bv: 1,
      drc: 30,
      mrp: 200,
      img: require('../../assests/images/apex/HEALTH/kickgas.png'),
      weight: '200g',
      inCart: 0,
    },
    {
      id: 12348,
      title: 'Muscle Oil',
      productBy: 'Amazon',
      description:
        'Useful to stimulate pancreas, to generate amount of insulting ...',
      bv: 1,
      drc: 20,
      mrp: 200,
      img: require('../../assests/images/apex/HEALTH/muscleoil.png'),
      weight: '200g',
      inCart: 0,
    },
  ]);

  const [brands, setBrands] = useState(data);

  // console.log(cartItems);

  return (
    <DataContext.Provider
      value={{
        appVersion,
        companyName,
        TokenIDN,
        user,
        userData,
        authUser,
        api,
        url,
        logOut,
        Err,
        productState,
        productStatus,
        cartItems,
        emptyCart,
        user,
        addToCart,
        increaseProducts,
        decreaseProducts,
        removeProduct,
        deliverableAddresses,
        userCards,
        addCard,
        userUpis,
        addUpi,
        products,
        brands,
        fontfamily
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
