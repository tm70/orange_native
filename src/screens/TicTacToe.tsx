import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../App';
import TTTBoard from '../components/tic_tac_toe/TTTBoard';

type TicTacToeNavigationProp = StackNavigationProp<StackParamList, 'TicTacToe'>;
type TicTacToeRouteProp = RouteProp<StackParamList, 'TicTacToe'>;
type Props = {
    navigation: TicTacToeNavigationProp;
    route: TicTacToeRouteProp;
};

/**
 * Screen for playing Tic Tac Toe. Just displays a TTTBoard.
 * Requires the game_id to be passed to the board to connect to the correct game.
 * @constructor
 */
const TicTacToe: React.FC<Props> = ({ route, navigation }) => {
    const { game_id } = route.params;
    return <TTTBoard game_id={game_id} onComplete={navigation.goBack} />;
};

const styles = StyleSheet.create({});

export default TicTacToe;
