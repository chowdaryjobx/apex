import React, { useState } from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const SIZES = { height, width };


const COLORS = {
    primary: '#19BABD',
    secondary: '#1F5DAB',
    blue: 'blue',
    white: '#ffff',
    black: '#000'
}



export { SIZES, COLORS };