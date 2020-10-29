import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import fontScaler from '../../util/fontScaler';

/**
 * Represents an item in the picker
 *
 * @property label - The label of this item (what is displayed to the user)
 * @property value - The value that is internally stored for logic use
 */
interface PickerValue {
    label: string;
    value: any;
}

/**
 * The properties passed to PickerInput
 *
 * See Picker input for more information
 */
interface Props {
    title: string;
    items: PickerValue[];
    onValueChange: (itemValue: string | number, itemIndex: number) => void;
    selectedValue: string | number;
    enabled?: boolean;
}

/**
 *  Creates a new picker with the given values and title
 *
 * @param title The title that will display above the picker
 * @param onValueChange Called when the user selects new item in the picker
 * @param items THe list of options that the picker has
 * @param selectedValue The current selected value (state)
 * @param enabled Whether or not the user can select and pick something new
 * @constructor
 */
const PickerInput: React.FC<Props> = ({ title, onValueChange, items, selectedValue, enabled = true }) => {
    return (
        <View>
            <Text style={styles.header}>{title}</Text>
            <Picker
                itemStyle={styles.input}
                onValueChange={onValueChange}
                selectedValue={selectedValue}
                enabled={enabled}
            >
                {items.map((item) => {
                    return <Picker.Item value={item.value} label={item.label} key={item.value} />;
                })}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: fontScaler(17),
        textAlign: 'center',
        marginBottom: '5%',
    },
    input: {
        height: 200,
        fontSize: fontScaler(200),
    },
});

export default PickerInput;
