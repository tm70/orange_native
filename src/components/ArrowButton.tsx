import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import fontScaler from '../util/fontScaler';

export enum Direction {
    Left,
    Right,
}

interface Props {
    text: string;
    color: string;
    direction: Direction;
    onPress: () => void;
}

const ArrowButton: React.FC<Props> = ({ text, color, onPress, direction }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                {direction === Direction.Left ? (
                    <View
                        style={{
                            ...styles.arrow,
                            ...styles.arrowLeft,
                            borderRightColor: color,
                        }}
                    />
                ) : null}
                <View
                    style={{ ...styles.textContainer, backgroundColor: color }}
                >
                    <Text style={styles.buttonText}>{text}</Text>
                </View>
                {direction === Direction.Right ? (
                    <View
                        style={{
                            ...styles.arrow,
                            ...styles.arrowRight,
                            borderLeftColor: color,
                        }}
                    />
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: fontScaler(13),
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingTop: '0.5%',
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },
    arrow: {
        width: 0,
        height: 0,
        borderTopWidth: 30,
        borderBottomWidth: 30,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    arrowLeft: {
        borderRightWidth: 30,
    },
    arrowRight: {
        borderLeftWidth: 30,
    },
});

export default ArrowButton;
