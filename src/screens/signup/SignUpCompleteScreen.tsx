import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {RouteProp} from '@react-navigation/native';
import fontScaler from '../../util/fontScaler';
import {StackParamList} from '../../../App';
import ArrowButton, {Direction} from '../../components/ArrowButton';
import AuthContext from '../../context/AuthContext';

// To get the navigation prop typed
type SignUpCompleteScreenNavigationProp = StackNavigationProp<
  StackParamList,
  'Complete'
>;
type SignUpCompleteScreenRouteProp = RouteProp<StackParamList, 'Complete'>;
type Props = {
  navigation: SignUpCompleteScreenNavigationProp;
  route: SignUpCompleteScreenRouteProp;
};

// Welcome screen placeholder
const SignUpCompleteScreen: React.FC<Props> = ({navigation, route}) => {
  const {signUp} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>You're done!</Text>

      <View style={styles.navRow}>
        <ArrowButton
          text="Go Back"
          color="#62bdd0"
          direction={Direction.Left}
          onPress={() => {
            const params = {...route.params, password: ''};
            navigation.navigate('Country', params);
          }}
        />
        <ArrowButton
          text="Sign Up"
          color="#94d361"
          direction={Direction.Right}
          onPress={() => {
            signUp(route.params);
          }}
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
  navRow: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SignUpCompleteScreen;
