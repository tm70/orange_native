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

const TicTacToe: React.FC<Props> = ({ route, navigation }) => {
    const { game_id, opponent_id, opponent_name } = route.params;

    return <TTTBoard game_id={game_id} onComplete={navigation.goBack} />;
};

const styles = StyleSheet.create({});

export default TicTacToe;
