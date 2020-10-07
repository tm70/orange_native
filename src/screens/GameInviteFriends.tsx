import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import getFriends from "../hooks/getFriends";
//import getBio from "../api/GetBio";
//import useGetRelationships from '../hooks/useGetRelationships';
import sendGameRequest from "../api/sendGameRequest";
import ArrowButton, {Direction} from '../components/ArrowButton';
import AuthContext from '../context/AuthContext';

// To get the navigation prop typed
type GameInviteFriendsNavigationProp = StackNavigationProp<StackParamList, 'GameInviteFriends'>;
type GameInviteFriendsRouteProp = RouteProp<StackParamList, 'GameInviteFriends'>;
type Props = { navigation: GameInviteFriendsNavigationProp; route: GameInviteFriendsRouteProp };

const Item = ({ firstname, id, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <ImageBackground source={require('../../assets/person.png')} style={{}}>
            <View style={styles.tile}/>
        </ImageBackground>  
        <Text style={styles.title}>{firstname}</Text>
    </TouchableOpacity>
);

const GameInviteFriends: React.FC<Props> = ({navigation, route}) => {
    const game = route.params.game;
    const {token, id: userid} = useContext(AuthContext);
    
    const [searchAPI, friends, errorMessage] = getFriends(userid, token);
    
    const renderItem = ({ item }) => {
        return (
        <Item
            firstname={item.firstname}
            id={item.id}
            onPress={() => sendGameRequest(userid, item.id, game, token)}
        />
        );
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Invite Friend</Text>
            
            <FlatList
                data={friends}
                renderItem={renderItem}
                numColumns={3}
            />
            
            <ArrowButton
                text="Start Game"
                color="#94d361"
                direction={Direction.Right}
                onPress={() => navigation.navigate(game)}
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

export default GameInviteFriends;