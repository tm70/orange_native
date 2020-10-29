// This is taken from StackOverflow to scale fonts to different screen sizes automatically:
// https://stackoverflow.com/questions/57114354/react-native-responsive-font-size

import {Dimensions, PixelRatio, Platform} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

const fontScaler = (size: number) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export default fontScaler;
