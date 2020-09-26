import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import fontScaler from '../util/fontScaler';
import BasicButton from '../components/BasicButton';
import BioInformation from '../components/BioInformation';
import AuthContext from '../context/AuthContext';

const BioScreen: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const { id } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <BioInformation id={id} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>
                            Profile edit successful
                        </Text>
                        <BasicButton
                            color="#bbbde0"
                            text="Ok"
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
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

        fontWeight: 'bold',
        flex: 1,
    },

    header: {
        fontSize: fontScaler(17),
        fontWeight: 'bold',
        marginTop: '5%',
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
});

export default BioScreen;
