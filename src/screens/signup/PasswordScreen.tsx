import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../../App';
import NameInput from '../../components/signup/NameInput';
import { RouteProp } from '@react-navigation/native';
import ArrowNavigation from '../../components/signup/ArrowNavigation';

// To get the navigation prop typed
type PasswordScreenNavigationProp = StackNavigationProp<StackParamList, 'Password'>;
type PasswordScreenRouteProp = RouteProp<StackParamList, 'Password'>;
type Props = {
    navigation: PasswordScreenNavigationProp;
    route: PasswordScreenRouteProp;
};

// TODO: Prevent moving on if passwords don't match

/**
 * Third screen in signup flow, for entering password
 * @constructor
 */
const PasswordScreen: React.FC<Props> = ({ navigation, route }) => {
    // Load the state using params as default value (if navigated away an has come back to edit)
    const params = route.params;
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <NameInput
                    title="Enter a password"
                    inputPlaceholder="Type your password here"
                    text={password1}
                    onChangeText={setPassword1}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />

                <View style={styles.inputSpacer} />

                <NameInput
                    title="Confirm your password"
                    inputPlaceholder="Re-type your password here"
                    text={password2}
                    onChangeText={setPassword2}
                    secureTextEntry={true}
                />
            </View>

            <View style={styles.navRow}>
                <ArrowNavigation
                    onBack={() => navigation.navigate('Country', params)}
                    onNext={() =>
                        navigation.navigate('Complete', {
                            ...params,
                            password: password1,
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '15%',
        marginHorizontal: '12%',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingHorizontal: '5%',
    },
    inputSpacer: {
        marginVertical: '7%',
    },
    navRow: {
        marginTop: '57%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default PasswordScreen;
