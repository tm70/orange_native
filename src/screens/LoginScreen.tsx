import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import NameInput from '../components/signup/NameInput';
import BasicButton from '../components/BasicButton';
import AuthContext from '../context/AuthContext';

// To get the navigation prop typed
type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'Login'>;
type Props = {
    navigation: LoginScreenNavigationProp;
};

// TODO: Display error on fail to log in

/**
 * Login screen
 * @constructor
 */
const LoginScreen: React.FC<Props> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = React.useContext(AuthContext);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.inputSpacer} />

                <NameInput
                    title="What is your email address?"
                    inputPlaceholder="Type your email address here"
                    text={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <View style={styles.inputSpacer} />

                <NameInput
                    title="What is your password?"
                    inputPlaceholder="Type your password"
                    text={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputSpacer} />

            <BasicButton text="Login" color="#94d361" onPress={() => login({ email, password })} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        paddingHorizontal: '10%',
    },
    inputContainer: {
        paddingHorizontal: '5%',
    },
    inputSpacer: {
        marginVertical: '7%',
    },
});

export default LoginScreen;
