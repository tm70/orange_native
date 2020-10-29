import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fontScaler from '../util/fontScaler';

/**
 * A component to show when something is loading
 * @constructor
 */
const Loading: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.loadtext}>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        paddingBottom: '10%',
        fontWeight: 'bold',
    },
    loadtext: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
});

export default Loading;
