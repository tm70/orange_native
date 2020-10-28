import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fontScaler from '../util/fontScaler';

/**
 * Props passed to the ProfileIcon component
 * See the component docs (below) for property information
 */
interface Props {
    image_url: string | null;
    onPress: () => void;
    text: string;
}

/**
 * A button for a user. Displays their profile image and some desired text underneath.
 * @constructor
 * @param image_url - The url for the associated users profile picture or null if there is none
 * @param onPress - Action triggered when the button is pressed
 * @param text - Text to display under the image
 */
const ProfileButton: React.FC<Props> = ({ image_url, onPress, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <ImageBackground
                source={image_url != null ? { uri: image_url } : require('../../assets/person.png')}
                style={{}}
            >
                <View style={styles.tile} />
            </ImageBackground>
            <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        padding: '2%',
        marginVertical: '1%',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        flex: 1 / 3,
        maxWidth: '23.5%',
    },
    tile: {
        aspectRatio: 1,
    },
    title: {
        fontSize: fontScaler(8),
        textAlign: 'center',
    },
});

export default ProfileButton;
