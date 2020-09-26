import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '../../../App';
import getCountries from '../../api/getCountries';
import PickerInput from '../../components/signup/PickerInput';
import ArrowNavigation from '../../components/signup/ArrowNavigation';

// To get the navigation prop typed
type CountryScreenNavigationProp = StackNavigationProp<
    StackParamList,
    'Country'
>;
type CountryScreenRouteProp = RouteProp<StackParamList, 'Country'>;
type Props = {
    navigation: CountryScreenNavigationProp;
    route: CountryScreenRouteProp;
};

interface CountryOption {
    label: string;
    value: string;
}

// Welcome screen placeholder
const CountryScreen: React.FC<Props> = ({ navigation, route }) => {
    const [countryOptions, setCountryOptions] = useState([] as CountryOption[]);

    // Populate the list of available countries from the API
    useEffect(() => {
        getCountries()
            .then((countries) => {
                setCountryOptions(
                    countries.map((country) => {
                        return {
                            label: country.name,
                            value: country.code,
                        };
                    }),
                );
            })
            .catch((err) => {
                console.log(err.toString());
                // TODO: We should have a system for displaying errors)
            });
    }, []);

    const params = route.params;
    let initialCountry = params.country_code
        ? params.country_code
        : countryOptions.length == 0
        ? ''
        : countryOptions[0].value;
    const [country_code, setCountry_code] = useState(initialCountry);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <PickerInput
                    title="What country do you live in?"
                    items={countryOptions}
                    selectedValue={country_code}
                    // @ts-ignore
                    onValueChange={setCountry_code}
                    enabled={countryOptions.length !== 0}
                />
            </View>

            <View style={styles.navRow}>
                <ArrowNavigation
                    onBack={() =>
                        navigation.navigate('Name', { ...params, country_code })
                    }
                    onNext={() =>
                        navigation.navigate('Password', {
                            ...params,
                            country_code,
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '25%',
        marginHorizontal: '12%',
        justifyContent: 'center',
    },
    inputContainer: {
        paddingHorizontal: '5%',
    },
    navRow: {
        marginTop: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CountryScreen;
