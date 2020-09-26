import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../../App';
import NameInput from '../../components/signup/NameInput';
import { RouteProp } from '@react-navigation/native';
import ArrowNavigation from '../../components/signup/ArrowNavigation';

// To get the navigation prop typed
type NameScreenNavigationProp = StackNavigationProp<StackParamList, 'Name'>;
type NameScreenRouteProp = RouteProp<StackParamList, 'Name'>;
type Props = {
    navigation: NameScreenNavigationProp;
    route: NameScreenRouteProp;
};

// TODO: Prevent moving on if no name has been entered

// Welcome screen placeholder
const NameScreen: React.FC<Props> = ({ navigation, route }) => {
    const params = route.params;
    const [email, setEmail] = useState(params.email);
    const [firstname, setFirstname] = useState(params.firstname);
    const [surname, setSurname] = useState(params.surname);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <NameInput
                    title="What is your email address?"
                    inputPlaceholder="Type your email address here"
                    text={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />

                <View style={styles.inputSpacer} />

                <NameInput
                    title="What is your first name?"
                    inputPlaceholder="Type your first name here"
                    text={firstname}
                    onChangeText={setFirstname}
                />

                <View style={styles.inputSpacer} />

                <NameInput
                    title="What is your last name?"
                    inputPlaceholder="Type your last name here"
                    text={surname}
                    onChangeText={setSurname}
                />
            </View>

            <View style={styles.navRow}>
                <ArrowNavigation
                    onBack={() =>
                        navigation.navigate('Welcome', {
                            ...params,
                            email,
                            firstname,
                            surname,
                        })
                    }
                    onNext={() =>
                        navigation.navigate('Country', {
                            ...params,
                            email,
                            firstname,
                            surname,
                        })
                    }
                />
            </View>
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
    navRow: {
        marginTop: '20%',
        marginBottom: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default NameScreen;
