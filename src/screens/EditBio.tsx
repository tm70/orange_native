import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, Alert, Modal} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {StackParamList} from "../../App";
import fontScaler from "../util/fontScaler";
import BasicButton from "../components/BasicButton";

type IndexScreenNavigationProp = StackNavigationProp<StackParamList, 'EditBio'>
type Props = { navigation: IndexScreenNavigationProp; };

const BioScreen: React.FC<Props> = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);



    return (
        
        <View style={styles.container}>
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
                    <Text style={styles.header}>Profile edit sucessful</Text>
                    <BasicButton color='#bbbde0' text="Ok" onPress={() => {setModalVisible(!modalVisible);}}/>
                  </View>
                </View>
            </Modal>
            <View style={styles.rowdisplay}>
                <Image 
                    style={{width:'30%',height:'130%'}}
                    source={require('../../assets/person.png')}
                />
                <View style={styles.columndisplay}>
                    <Text style={styles.subheader}>Name</Text>
                    <Text style={styles.subheader}>Country</Text>
                </View>
            </View>
            <Text style={styles.header}>Bio</Text>
            <Text style={styles.header}>Hobbies</Text>
            <Text style={styles.header}>Game</Text>
            <BasicButton color='#bbbde0' text="Save" onPress={() => {setModalVisible(true);}}/>

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
