import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import fontScaler from '../../util/fontScaler';

/**
 * The properties passed to NameInput
 * For more information see NameInput
 */
interface Props {
    title: string;
    inputPlaceholder: string;
    text: string;
    onChangeText: (arg0: string) => void;
    secureTextEntry?: boolean;
    autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
}

/**
 *
 * @param title The title for this input. Positioned above the input itself
 * @param inputPlaceholder The placeholder text in the input itself
 * @param text  The property to track the current value of the text
 * @param onChangeText The function to call when the text changes, passes the new text value
 * @param secureTextEntry Whether or not this should mimic password entry
 * @param autoCapitalize Whether or not to autocapitalise the input from the user
 * @constructor
 */
const NameInput: React.FC<Props> = ({
    title,
    inputPlaceholder,
    text,
    onChangeText,
    secureTextEntry = false,
    autoCapitalize = 'sentences',
}) => {
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
            <TextInput
                style={styles.input}
                placeholder={inputPlaceholder}
                value={text}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: fontScaler(15),
        textAlign: 'center',
        marginBottom: '5%',
    },
    input: {
        fontSize: fontScaler(14),
        height: 80,
        borderWidth: 3,
        borderColor: 'black',
        paddingHorizontal: '5%',
    },
});

export default NameInput;
