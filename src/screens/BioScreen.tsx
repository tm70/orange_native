import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import BioInformation from '../components/BioInformation';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getRelationship from '../api/getRelationship';
import setRelationship, { FriendRequestAction } from '../api/setRelationship';
import fontScaler from '../util/fontScaler';
import AuthContext from '../context/AuthContext';

type BioScreenNavigationProp = StackNavigationProp<StackParamList, 'Bio'>;
type BioScreenRouteProp = RouteProp<StackParamList, 'Bio'>;
type Props = { navigation: BioScreenNavigationProp; route: BioScreenRouteProp };

/**
 * Screen for displaying another user's bio and sending friend requests
 * @constructor
 */
const BioScreen: React.FC<Props> = ({ route, navigation }) => {
    const { id, token } = React.useContext(AuthContext);
    const [friendModalVisible, setFriendModalVisible] = useState(false);

    // Using string "Getting" as a sentinel value as null is a possible return value
    const [rel, setRel] = useState('Getting');

    // Get the relationship
    useEffect(() => {
        getRelationship(id, route.params.id, token).catch(console.log).then(setRel);
    }, []);

    // Return a different view depending whether the user is a friend or not
    if (rel === 'Friends') {
        return (
            <View style={styles.container}>
                <BioInformation id={route.params.id} />
                <View style={styles.inactivebutton}>
                    <Text style={styles.buttontext}>Friends</Text>
                </View>
            </View>
        );
    } else if (
        (rel === 'PendingFirstSecond' && id < route.params.id) ||
        (rel === 'PendingSecondFirst' && id > route.params.id)
    ) {
        return (
            <View style={styles.container}>
                <BioInformation id={route.params.id} />
                <View style={styles.inactivebutton}>
                    <Text style={styles.buttontext}>Request Sent</Text>
                </View>
            </View>
        );
    }

    // Otherwise display a friend request version
    return (
        <View style={styles.container}>
            <BioInformation id={route.params.id} />
            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    setRelationship(id, route.params.id, token, FriendRequestAction.SendFriendRequest)
                        .then(() => setFriendModalVisible(true))
                        .catch(console.log)
                }
            >
                <Text style={styles.buttontext}>Send friend request</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={friendModalVisible}
                onRequestClose={() => setFriendModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.header}>Friend request sent!</Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FriendFind')}>
                            <Text style={styles.buttontext}>Add more friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen')}>
                            <Text style={styles.buttontext}>Go back to menu</Text>
                        </TouchableOpacity>
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

    buttontext: {
        fontSize: fontScaler(15),
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
    },

    modalView: {
        margin: '10%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: '5%',
        alignItems: 'center',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#94d361',
        padding: '5%',
        marginTop: '10%',
    },

    inactivebutton: {
        alignItems: 'center',
        backgroundColor: '#bbbde0',
        padding: '5%',
        marginTop: '10%',
    },
});

export default BioScreen;
