import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import useGetRelationships from "../hooks/useGetRelationships";
import sendGameRequest from "../api/sendGameRequest";
import ArrowButton, {Direction} from '../components/ArrowButton';
import AuthContext from '../context/AuthContext';

// To get the navigation prop typed
type GameInviteFriendsNavigationProp = StackNavigationProp<StackParamList, 'GameInviteFriends'>;
type GameInviteFriendsRouteProp = RouteProp<StackParamList, 'GameInviteFriends'>
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
    const {token, id: userid} = React.useContext(AuthContext);
    
    const renderItem = ({ item }) => (
        <Item
            firstname={item.firstname}
            id={item.id}
            onPress={sendGameRequest(userid, id, game, token)}
        />
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Invite Friend</Text>
            
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
});

export default GameInviteFriends;