import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-community/picker';
import fontScaler from '../../util/fontScaler';

interface PickerValue {
  label: string;
  value: any;
}

interface Props {
  title: string;
  items: PickerValue[];
  onValueChange: (itemValue: string | number, itemIndex: number) => void;
  selectedValue: string | number;
  enabled?: boolean;
}

const PickerInput: React.FC<Props> = ({
  title,
  onValueChange,
  items,
  selectedValue,
  enabled = true,
}) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
      <Picker
        itemStyle={styles.input}
        onValueChange={onValueChange}
        selectedValue={selectedValue}
        enabled={enabled}>
        {items.map((item) => {
          return (
            <Picker.Item
              value={item.value}
              label={item.label}
              key={item.value}
            />
          );
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
