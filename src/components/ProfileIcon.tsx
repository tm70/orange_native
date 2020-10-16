import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import fontScaler from '../util/fontScaler';

interface Props {
    image_url: string | null;
    onPress: () => void;
    text: string;
}

const ProfileButton: React.FC<Props> = ({ image_url, onPress, text }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            <ImageBackground
                source={
                    image_url != null
                        ? { uri: image_url }
                        : require('../../assets/person.png')
                }
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
