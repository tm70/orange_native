import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import ArrowButton, {Direction} from '../components/ArrowButton';

// To get the navigation prop typed
type GameInviteFriendsNavigationProp = StackNavigationProp<StackParamList, 'GameInviteFriends'>;
type GameInviteFriendsRouteProp = RouteProp<StackParamList, 'GameInviteFriends'>
type Props = { navigation: GameInviteFriendsNavigationProp; route: GameInviteFriendsRouteProp };

// Placeholder screen for now
const GameInviteFriends: React.FC<Props> = ({navigation, route}) => {
    const params = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Invite Friends</Text>
            
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
        marginTop: 8,
        marginHorizontal: 8,
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