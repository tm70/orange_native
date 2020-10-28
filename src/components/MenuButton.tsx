import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import fontScaler from '../util/fontScaler';

interface Props {
    title: string;
    onPress: () => void;
    //icon: ;
}

const MenuButton: React.FC<Props> = ({ title, onPress, icon }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <ImageBackground source={icon} style={{}}>
            <View style={styles.tile}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </ImageBackground>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#3498DB',
        flex: 1,
        padding: '2%',
        marginVertical: '2%',
        marginHorizontal: '2%',
    },
    tile: {
        flex: 1,
        justifyContent: 'flex-end',
        aspectRatio: 1,
    },
    title: {
        color: 'white',
        fontSize: fontScaler(16),
        textAlign: 'center',
    },
});

export default MenuButton;
