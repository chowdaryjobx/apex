const OffersData = [
    { id: 1, path: require('../assests/offersImages/offer2.png') },
    { id: 2, path: require('../assests/offersImages/offer3.png') },
    { id: 3, path: require('../assests/offersImages/offer2.png') },
    { id: 4, path: require('../assests/offersImages/offer1.png') },
];

const dishes= [
    { id: 1, path: require('../assests/dishesImages/biryani.png'), title: 'Mutton Biryani', rating: 3.5,price:120,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'nonVeg' },
    { id: 2, path: require('../assests/dishesImages/chicken.png'), title: 'Chicken Biryani', rating: 4,price:140,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'nonVeg'  },
    { id: 3, path: require('../assests/dishesImages/dosa.png'), title: 'Dosa', rating: 3.5 ,price:180,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 4, path: require('../assests/dishesImages/friedrice.png'), title: 'Fried Rice', rating: 4,price:210 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 5, path: require('../assests/dishesImages/healthy.png'), title: 'Healthy', rating: 3,price:100 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 6, path: require('../assests/dishesImages/homestyle.png'), title: 'Home Style', rating: 3,price:120 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 7, path: require('../assests/dishesImages/manchurian.png'), title: 'Manchurian', rating: 3.5,price:120,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg'  },
    { id: 8, path: require('../assests/dishesImages/noodles.png'), title: 'Noodles', rating: 3,price:100,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg'  },
    { id: 9, path: require('../assests/dishesImages/panner.png'), title: 'Panner', rating: 3.5,price:160 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 10, path: require('../assests/dishesImages/paratha.png'), title: 'Paratha', rating: 4,price:150 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 11, path: require('../assests/dishesImages/pulao.png'), title: 'Pulao', rating: 3,price:130 ,description:'A delicious preparation of flavorful saffron rice cooked with spicy marinated chicken.',quantity:1,type:'veg' },
    { id: 12, path: require('../assests/toppicks/grillchicken.png'), title: 'Grills', rating: 3,price:130 ,description:'Grilled chicken.',quantity:1,type:'nonVeg' },

]


const dishesData = [
    { id: 1, path: require('../assests/dishesImages/chicken65.png'), title: 'Chicken 65', rating: 3.5 },
    { id: 2, path: require('../assests/dishesImages/chickenbiryani.png'), title: 'Chicken Biryani', rating: 4 },
    { id: 3, path: require('../assests/dishesImages/muttonbiryani.png'), title: 'Mutton Biryani', rating: 3 },
    { id: 4, path: require('../assests/dishesImages/muttonbiryani.png'), title: 'Mutton Biryani', rating: 3 },
];


const toppicksforyou = [
    { id: 1, path: require('../assests/toppicks/chickenbiryani.png'), title: 'Biryani', rating: 3.5 },
    { id: 2, path: require('../assests/toppicks/grillchicken.png'), title: 'Grills', rating: 4 },
    { id: 3, path: require('../assests/toppicks/pannerbuttermasala.png'), title: 'Panner', rating: 3 },
    { id: 4, path: require('../assests/dishesImages/dosa.png'), title: 'Dosa', rating: 3 },
];


const recentlySearched = [
    { id: 1, title: 'Chicken Biryani' },
    { id: 2, title: 'Chicken' },
    { id: 3, title: 'Paratha' },
    { id: 4, title: 'Pulao' },
    { id: 5, title: 'Noodles' },
    { id: 6, title: 'Manchurian' },
]

export { OffersData, dishesData, toppicksforyou, recentlySearched,dishes };