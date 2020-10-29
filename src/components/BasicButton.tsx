import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fontScaler from '../util/fontScaler';

/**
 * The properties passed to BasicButton
 *
 * See BasicButton for more information
 */
interface Props {
    text: string;
    color: string;
    onPress: () => void;
}

/**
 * A basic button for use in any generic context
 * @param text The text displayed on the button
 * @param color The color of the button
 * @param onPress Called when the button is pressed
 * @constructor
 */
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
