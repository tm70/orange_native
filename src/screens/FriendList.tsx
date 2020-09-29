import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import getRelationships from "../api/getRelationships";
import AuthContext from '../context/AuthContext';

type FriendListNavigationProp = StackNavigationProp<StackParamList, 'FriendList'>;
type FriendListRouteProp = RouteProp<StackParamList, 'FriendList'>
type Props = { navigation: FriendListNavigationProp; route: FriendListRouteProp };

// item prefer to display
const Item = ({ firstname, id }) => (
    <TouchableOpacity style={styles.item}>
        <ImageBackground source={require('../../assets/person.png')} style={{}}>
            <View style={styles.tile} />
        </ImageBackground>  
        <Text style={styles.title}>{firstname}</Text>
    </TouchableOpacity>
);

const FriendList: React.FC<Props> = ({navigation, route}) => {
    const params = route.params;
    const [friendList, setfriendList] = useState(null);
    // not sure which should be use here to get token
    const {token} = React.useContext(AuthContext);
    const {id} = React.useContext(AuthContext);
    // get data from api ()
    useEffect(() => {
        const b = getRelationships(id, token).catch(console.log).then(setfriendList);
    }, []);
    if (friendList === null) {
        return <Text>Loading</Text>;
    }

    const renderItem = ({ item }) => (
        <Item
            firstname={item.firstname}
        />
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={friendList}
                renderItem={renderItem}
                keyExtractor={({ id }, _index) => id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '2%',
        paddingBottom: '15%',
        fontWeight: 'bold',
    },
    header: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '5%',
    },
    item: {
        padding: '2%',
        marginVertical: '1%',
        backgroundColor: 'white',
        marginHorizontal: '5%',
        flex: 1/3,
        maxWidth: '23.5%'
    },
    tile: {
        aspectRatio: 1,
    },
    title: {
        fontSize: fontScaler(10),
        textAlign: 'center',
    },
});

export default FriendList;