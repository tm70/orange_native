import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import fontScaler from '../util/fontScaler';

interface Props {
    text: string;
    color: string;
    onPress: () => void;
}

const BasicButton: React.FC<Props> = ({ text, color, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ backgroundColor: color }}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: fontScaler(13),
        textAlign: 'center',
        paddingVertical: '4%',
        fontWeight: 'bold',
    },
});

export default BasicButton;
