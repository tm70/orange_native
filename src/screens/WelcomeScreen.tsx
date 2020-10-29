import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BasicButton from '../components/BasicButton';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import fontScaler from '../util/fontScaler';
import { RouteProp } from '@react-navigation/native';

// To get the navigation prop typed
type WelcomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Welcome'>;
type WelcomeScreenRouteProp = RouteProp<StackParamList, 'Welcome'>;
type Props = {
    navigation: WelcomeScreenNavigationProp;
    route: WelcomeScreenRouteProp;
};

/**
 * Initial screen when not logged in, goes to login or signup
 * @constructor
 */
const WelcomeScreen: React.FC<Props> = ({ navigation, route }) => {
    const params = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to Lovejoy!</Text>
            <Text style={styles.subheader}>Let's start by setting up your account</Text>

            <View style={styles.buttonContainer}>
                <BasicButton color="#94d361" text="I'm new" onPress={() => navigation.navigate('Name', params)} />

                <Text style={styles.orText}>or</Text>

                <BasicButton
                    color="#62bdd0"
                    text="I already have an account"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '25%',
        marginHorizontal: '14%',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
    },
    subheader: {
        marginTop: '8%',
        marginBottom: '8%',
        paddingHorizontal: '15%',
        fontSize: fontScaler(16),
        textAlign: 'center',
    },
    buttonContainer: {
        paddingHorizontal: '13%',
    },
    orText: {
        fontSize: fontScaler(16),
        marginVertical: '5%',
        textAlign: 'center',
    },
});

export default WelcomeScreen;
