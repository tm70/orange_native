import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import getRelationships from "../api/GetRelationships";
import ArrowButton, {Direction} from '../components/ArrowButton';

// To get the navigation prop typed
type GameInviteFriendsNavigationProp = StackNavigationProp<StackParamList, 'GameInviteFriends'>;
type GameInviteFriendsRouteProp = RouteProp<StackParamList, 'GameInviteFriends'>
type Props = { navigation: GameInviteFriendsNavigationProp; route: GameInviteFriendsRouteProp };

const Item = ({ firstname, id }) => (
    <TouchableOpacity style={styles.item}> // add onpress that sends a game request to the api
        <ImageBackground source={require('../../assets/person.png')} style={{}}>
            <View style={styles.tile} />
        </ImageBackground>  
        <Text style={styles.title}>{firstname}</Text>
    </TouchableOpacity>
);

const GameInviteFriends: React.FC<Props> = ({navigation, route}) => {
    const params = route.params;
    
    const renderItem = ({ item }) => (
        <Item
            firstname={item.firstname}
            id={item.id}
        />
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Invite Friend</Text>
            
            <ArrowButton
                text="Start Game"
                color="#94d361"
                direction={Direction.Right}
                onPress={() => navigation.navigate(params.game)}
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