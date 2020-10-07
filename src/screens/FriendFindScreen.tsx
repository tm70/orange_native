import React, { useState } from 'react';
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { StackParamList } from '../../App';
import fontScaler from '../util/fontScaler';
import useUserSearch from '../hooks/useUserSearch';

type IndexScreenNavigationProp = StackNavigationProp<
    StackParamList,
    'FriendFind'
>;
type Props = { navigation: IndexScreenNavigationProp };

const FriendFindScreen: React.FC<Props> = ({ navigation }) => {
    const [searchAPI, users, errorMessage] = useUserSearch(20);
    const [searchText, setSearchText] = useState('');

    interface ItemProps {
        firstname: string;
        id: number;
    }

    // item prefer to display

    const Item: React.FC<ItemProps> = ({ firstname, id }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Bio', { id })}
        >
            <ImageBackground
                source={require('../../assets/person.png')}
                style={{}}
            >
                <View style={styles.tile} />
            </ImageBackground>
            <Text style={styles.title}>{firstname}</Text>
        </TouchableOpacity>
    );

    // render item
    const renderItem = ({ item }) => (
        <Item firstname={item.firstname} id={item.id} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose friend to play with</Text>
            <Text style={styles.subheader}>based on similar interests</Text>
            <View style={styles.textinput}>
                <TextInput
                    style={{
                        height: '70%',
                        width: '80%',
                        borderColor: 'black',
                        borderWidth: 3,
                        fontSize: fontScaler(13),
                        textAlign: 'center',
                    }}
                    onChangeText={setSearchText}
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
