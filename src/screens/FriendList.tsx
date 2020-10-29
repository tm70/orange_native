import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import Loading from '../components/Loading';
import fontScaler from '../util/fontScaler';
import ProfileButton from '../components/ProfileIcon';
import useGetRelationships from '../hooks/useGetRelationships';

type FriendListNavigationProp = StackNavigationProp<StackParamList, 'FriendList'>;
type Props = { navigation: FriendListNavigationProp };

/**
 * Screen for showing this user's friend list, as well as a list of all their sent/received
 * friend requests
 * @constructor
 */
const FriendList: React.FC<Props> = ({ navigation }) => {
    const [showFriends, switchList] = React.useState(true);
    const [listenerAdded, addListener] = React.useState(false);

    // get data from api
    const [trigger, friendList, errorMessage] = useGetRelationships();

    // refresh page on refocusing for navigating backwards
    if (!listenerAdded && friendList.length !== 0) {
        addListener(true);
        navigation.addListener('focus', () => {
            trigger();
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
        return <Loading />;
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
