import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import ProfileButton from '../components/ProfileIcon';
import useGetRelationships from '../hooks/useGetRelationships';
import AuthContext from '../context/AuthContext';

type FriendListNavigationProp = StackNavigationProp<StackParamList, 'FriendList'>;
type FriendListRouteProp = RouteProp<StackParamList, 'FriendList'>;
type Props = { navigation: FriendListNavigationProp; route: FriendListRouteProp };

/**
 * Screen for showing this user's friend list, as well as a list of all their sent/received
 * friend requests
 * @constructor
 */
const FriendList: React.FC<Props> = ({ navigation, route }) => {
    const { token, id } = React.useContext(AuthContext);
    const [showFriends, switchList] = React.useState(true);
    const [listenerAdded, addListener] = React.useState(false);

    // get data from api
    const [searchAPI, friendList, errorMessage] = useGetRelationships();

    // refresh page on refocusing for navigating backwards
    if (listenerAdded == false && friendList.length != 0) {
        addListener(true);
        navigation.addListener('focus', () => {
            searchAPI();
        });
    }

    const renderItem = ({ item }) => (
        <ProfileButton
            text={item.bio.firstname + ' ' + item.bio.surname + '\n' + item.relationship}
            onPress={() => navigation.navigate('Bio', { id: item.bio.id })}
            image_url={item.bio.image_url}
        />
    );

    // Loading screen before friends list is loaded
    // TODO: check that the user doesn't just have no relationships
    if (friendList.length == 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadtext}>Loading</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>{showFriends ? 'Friends' : 'Requests'}</Text>
                    </>
                }
                data={
                    showFriends
                        ? friendList.filter((item) => item && item.relationship == 'Friends')
                        : friendList.filter(
                              (item) =>
                                  item &&
                                  (item.relationship == 'Request Sent' || item.relationship == 'Request Received'),
                          )
                }
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => item.bio.id}
            />
            <TouchableOpacity style={styles.button} onPress={() => switchList(!showFriends)}>
                <Text style={styles.subheader}>{showFriends ? 'View Requests' : 'View Friends'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        paddingBottom: '10%',
        fontWeight: 'bold',
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '4%',
        marginBottom: '4%',
    },
    subheader: {
        fontSize: fontScaler(15),
        textAlign: 'center',
    },
    loadtext: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
    list: {
        width: '100%',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#94d361',
        padding: '5%',
        marginTop: '10%',
    },
});

export default FriendList;
