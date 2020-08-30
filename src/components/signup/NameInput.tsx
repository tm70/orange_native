import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import fontScaler from '../../util/fontScaler';

interface Props {
  title: string;
  inputPlaceholder: string;
  text: string;
  onChangeText: (arg0: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'sentences' | 'none' | 'words' | 'characters' | undefined;
}

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
