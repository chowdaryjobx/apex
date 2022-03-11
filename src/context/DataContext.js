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
  const api = 'http://testapi.alamarket.net/api/';

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

    // =================== ALA MARKET =============
    Categories: 'Categories',
    HomeProducts: 'HomeProducts',
    CartItemsAddorMinus: 'CartItemsAddorMinus',
    HomeBusiness: 'HomeBusiness',
    ViewProduct: 'ViewProduct',
    ShippingAddress: 'ShippingAddress',
    ViewCart:'ViewCart',
  };

  const [companyName, setCompanyName] = useState('Ala Market');
  const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);
  const [productStatus, setProductStatus] = useState(null);
  const [user, setUser] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  // const [guestCartItems, setGuestCartItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [Err, setErr] = useState('');

  const [TokenIDN, setTokenIDN] = useState(
    'lUEjMjRCCH5TcWhdTJqKDlBFvJwVAmKTfc2FmfjhXHDqc5kkxMgGdyPQ3g78Ln5y',
  );

  const [TokenID, setTokenID] = useState(
    'afqRk2ElERRc7B4PQ8QnvEwRlaJP8WyhjpRcjLWx8XpR5qKJ2lywLmJGV1CRNXqx',
  );

  // useEffect(() => {
  //   if (guestCartItems.length > 0) {
  //     let obj = guestCartItems;
  //     AsyncStorage.setItem('guestCartItems', JSON.stringify(obj));
  //     console.log('stored');
  //   }
  // }, [guestCartItems]);

  // useEffect(() => {
  //   getGuestCartItems();
  //   console.log('retrieved');
  // }, []);

  // const getGuestCartItems = async () => {
  //   let data = await AsyncStorage.getItem('guestCartItems');
  //   let parsed = JSON.parse(data);
  //   console.log('parsed' + parsed);
  //   if (parsed === null) {
  //     setGuestCartItems([]);
  //     return;
  //   } else {
  //     setGuestCartItems(parsed);
  //   }
  // };

  const fontfamily = 'Quicksand-Bold';
  const font_title = 'Quicksand-Bold';
  const font_desc = 'Quicksand-Medium';

  const fonts = {
    BOLD: 'Quicksand-Bold',
    LIGHT: 'Quicksand-Light',
    MEDIUM: 'Quicksand-Medium',
    REGULAR: 'Quicksand-Regular',
    SEMIBOLD: 'Quicksand-SemiBold',
  };

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
    console.log('called');
    try {
      const value = await AsyncStorage.getItem('LOGGEDUSER');
      if (value !== null) {
        let data = JSON.parse(value);
        console.log(data);
        setUser(data);
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
    }
  };

  // const addToGuestCart = item => {
  //   item = {...item, inCart: 1};
  //   if (guestCartItems.length === 0) {
  //     setGuestCartItems([...guestCartItems, item]);
  //   } else {
  //     let flag = 0;
  //     for (let i = 0; i < guestCartItems.length; i++) {
  //       if (guestCartItems[i].id === item.id) {
  //         flag = 'found';
  //         showToastWithGravity('Product already added to cart');
  //       } else {
  //         flag = 'notfound';
  //       }
  //     }
  //     if (flag === 'notfound') {
  //       setGuestCartItems([...guestCartItems, item]);
  //       showToastWithGravity('Product added to cart');
  //     }
  //   }
  // };

  // const guestIncreaseProducts = index => {
  //   guestCartItems[index].inCart = guestCartItems[index].inCart + 1;
  //   setRefresh(!refresh);
  // };
  // const guestDecreaseProducts = index => {
  //   if (guestCartItems[index].quantity == 0) {
  //   }
  //   guestCartItems[index].inCart = guestCartItems[index].inCart - 1;
  //   setRefresh(!refresh);
  // };
  // const guestRemoveProduct = index => {
  //   guestCartItems.splice(index, 1);
  //   setRefresh(!refresh);
  // };

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
        // TokenID,
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
        // guestCartItems,
        // addToGuestCart,
        // guestIncreaseProducts,
        // guestDecreaseProducts,
        // guestRemoveProduct,
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
        fontfamily,
        font_title,
        font_desc,
        fonts,
      }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
