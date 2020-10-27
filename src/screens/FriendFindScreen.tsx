import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import fontScaler from '../util/fontScaler';
import useUserSearch from '../hooks/useUserSearch';
import ProfileButton from '../components/ProfileIcon';
import { SearchedUser } from '../api/getUsersSearch';

type FriendFindScreenNavigationProp = StackNavigationProp<
    StackParamList,
    'FriendFind'
>;
type Props = { navigation: FriendFindScreenNavigationProp };

const FriendFindScreen: React.FC<Props> = ({ navigation }) => {
    // TODO: Error
    const [searchAPI, users, errorMessage] = useUserSearch(40);
    const [searchText, setSearchText] = useState('');

    interface ItemProps {
        item: SearchedUser;
    }

    // render item
    const renderItem: React.FC<ItemProps> = ({ item }) => {
        return (
            <ProfileButton
                text={item.firstname + ' ' + item.surname}
                onPress={() => navigation.navigate('Bio', { id: item.id })}
                image_url={item.image_url}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for a new friend</Text>
            <Text style={styles.subheader}>You can search by name or email address</Text>
            <View style={styles.textinput}>
                <TextInput
                    style={styles.searchBox}
                    onChangeText={(value) => {setSearchText(value); searchAPI(value);}}
                    value={searchText}
                    onSubmitEditing={() => searchAPI(searchText)}
                />
            </View>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={({ id }, _index) => id.toString()}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
        marginBottom: '5%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    textinput: {
        marginTop: '5%',
        marginHorizontal: '25%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '10%',
        width: '50%',
        alignItems: 'center',
    },
    searchBox: {
        height: '95%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 2.5,
        fontSize: fontScaler(13),
        textAlign: 'center',
    },
    header: {
        fontSize: fontScaler(17),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subheader: {
        fontSize: fontScaler(13),
        textAlign: 'center',
    },
    item: {
        padding: '2%',
        marginVertical: '1%',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        flex: 1 / 3,
        maxWidth: '23.5%',
    },
    tile: {
        aspectRatio: 1,
    },
    title: {
        fontSize: fontScaler(10),
        textAlign: 'center',
    },
});

export default FriendFindScreen;
