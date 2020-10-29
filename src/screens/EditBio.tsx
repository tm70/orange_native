import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import fontScaler from '../util/fontScaler';
import BasicButton from '../components/BasicButton';
import BioInformation from '../components/BioInformation';
import AuthContext from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';

type EditBioScreenNavigationProp = StackNavigationProp<StackParamList, 'EditBio'>;
type Props = {
    navigation: EditBioScreenNavigationProp;
};

/**
 * Screen for displaying this user's bio and editing it. Also serves as the logout screen
 * @constructor
 */
const BioScreen: React.FC<Props> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const { id, logout } = React.useContext(AuthContext);

    // TODO: Functionality and remove temp signout button

    return (
        <View style={styles.container}>
            <BioInformation id={id} />

            <View style={styles.signout}>
                <BasicButton text="Signout" color="#94d361" onPress={logout} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Profile edit successful</Text>
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
    signout: {
        paddingTop: '4%',
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
