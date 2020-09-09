import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Alert, Modal} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import BasicButton from '../components/BasicButton';
import {RouteProp} from '@react-navigation/native';
import getBio from '../api/getBio';
import AuthContext from '../context/AuthContext';

type BioScreenNavigationProp = StackNavigationProp<StackParamList, 'Bio'>;
type BioScreenRouteProp = RouteProp<StackParamList, 'Bio'>;
type Props = {navigation: BioScreenNavigationProp; route: BioScreenRouteProp};

const BioScreen: React.FC<Props> = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bio, setBio] = useState(null);

  const {token} = React.useContext(AuthContext);

  // get data from frindfindscreen
  const {id} = route.params;

  // get data from api
  useEffect(() => {
    const b = getBio(id, token).catch(console.log).then(setBio);
  }, []);

  if (bio === null) {
    return <Text>Loading</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowdisplay}>
        <Image
          style={{width: 100, height: 100}}
          source={require('../../assets/person.png')}
        />
        <View style={styles.columndisplay}>
          <Text style={styles.header} />
          <Text style={styles.header} />
        </View>
      </View>

      <Text style={styles.header}>Bio</Text>
      <Text>{bio.bio}</Text>
      <Text style={styles.header}>Hobbies</Text>
      {bio.hobbies.map((h) => <Text>{h}</Text>)}
      <Text style={styles.header}>Games</Text>

      <BasicButton
        color="#bbbde0"
        text="Send friend request"
        onPress={() => {
          setModalVisible(true);
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.header}>Friend reqest sent!</Text>
            <BasicButton
              color="#bbbde0"
              text="Add more friends"
              onPress={() => navigation.navigate('FriendFind')}
            />
            <Text style={styles.header}>or</Text>
            <BasicButton
              color="#bbbde0"
              text="Go back to menu"
              onPress={() => navigation.navigate('MainScreen')}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    marginHorizontal: '10%',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  rowdisplay: {
    flexDirection: 'row',
    marginBottom: '10%',
  },
  columndisplay: {
    marginTop: '9%',
    marginLeft: '20%',
    flexDirection: 'column',
  },

  header: {
    fontSize: fontScaler(17),
    fontWeight: 'bold',
    padding: '5%',
  },

  bio: {
    fontSize: fontScaler(16),
  },

  subheader: {
    fontSize: fontScaler(13),
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BioScreen;
