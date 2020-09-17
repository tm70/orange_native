import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {StackParamList} from "../../App";
import fontScaler from "../util/fontScaler";
import BasicButton from "../components/BasicButton";
import {RouteProp} from "@react-navigation/native";
import getBio from "../api/GetBio";
import AuthContext from '../context/AuthContext';
import setRelationships from "../api/setRelationsips";

type BioScreenNavigationProp = StackNavigationProp<StackParamList, 'Bio'>
type BioScreenRouteProp = RouteProp<StackParamList, 'Bio'>
type Props = { navigation: BioScreenNavigationProp; route: BioScreenRouteProp};



const BioScreen: React.FC<Props> = ({route, navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [bio, setBio] = useState(null);
    const [Relationship, setRelationship] = useState();

    // get token
    const {token} = React.useContext(AuthContext);
    // get user id 
    const {id: userid} = React.useContext(AuthContext);
    // get data from frindfindscreen
    const { id } = route.params;

    // get data from api ()
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
                    style={{width:'30%',height:'130%'}}
                    source={require('../../assets/person.png')}
                />
                <View style={styles.columndisplay}>
                    <Text style={styles.subheader}>{bio.firstname}  {bio.surname}</Text>
                    <Text style={styles.subheader}>{bio.country}</Text>
                </View>
            </View>


            <Text style={styles.header}>Bio</Text>
            <Text style={styles.info}>{bio.bio}</Text>

            <Text style={styles.header}>Hobbies</Text>
            {bio.hobbies.map((h) => <Text style={styles.info}>{h}</Text>)}

            <Text style={styles.header}>Game</Text>
            

            <BasicButton color='#bbbde0' text="Send friend request" onPress={() => {setModalVisible(true);}}/>
            
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
           >    
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.header}>Friend reqest sent!</Text>
                    <BasicButton color='#bbbde0' text="Add more friends" onPress={() => navigation.navigate('FriendFind')}/>
                    <Text style={styles.header}>or</Text>
                    <BasicButton color='#bbbde0' text="Go back to menu" onPress={() => navigation.navigate('MainScreen')}/>
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

        fontWeight: 'bold',
        flex:1,
    },

    rowdisplay: {
        flexDirection:"row",
        marginBottom: '10%',
    },
    columndisplay: {
        marginTop: '9%',
        marginLeft: '20%',
        flexDirection:"column",
    },

    header: {
        fontSize: fontScaler(17),
        fontWeight: 'bold',
        marginTop: '5%',
    },

    subheader: {
        fontSize: fontScaler(15),
        textAlign: 'center',       
    },

    info: {
        fontSize: fontScaler(15),    
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

});

export default BioScreen;
