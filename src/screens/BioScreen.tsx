import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import BioInformation from '../components/BioInformation';
import BasicButton from '../components/BasicButton';
import { Modal, StyleSheet, Text, View } from 'react-native';
import setRelationship, { FriendRequestAction } from '../api/setRelationship';
import fontScaler from '../util/fontScaler';
import AuthContext from '../context/AuthContext';

type BioScreenNavigationProp = StackNavigationProp<StackParamList, 'Bio'>;
type BioScreenRouteProp = RouteProp<StackParamList, 'Bio'>;
type Props = { navigation: BioScreenNavigationProp; route: BioScreenRouteProp };

const BioScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id, token } = React.useContext(AuthContext);
    const [friendModalVisible, setFriendModalVisible] = useState(false);

    // TODO: Display error on error

    return (
        <View style={styles.container}>
            <BioInformation id={route.params.id} />
            <BasicButton
                color="#bbbde0"
                text="Send friend request"
                onPress={() =>
                    setRelationship(
                        id,
                        route.params.id,
                        token,
                        FriendRequestAction.SendFriendRequest,
                    )
                        .then(() => setFriendModalVisible(true))
                        .catch(console.log)
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={friendModalVisible}
                onRequestClose={() => setFriendModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Friend request sent!</Text>
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
