import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import fontScaler from '../../util/fontScaler';
import { connectTTT, GameResult, getTicTacToeData, MoveResult, TTTPlayer, TTTPos } from '../../api/getTicTacToeData';
import AuthContext from '../../context/AuthContext';
import Snackbar from 'react-native-snackbar';

/**
 * The properties passed to the TTTBoard
 *
 * See TTTBoard for more information
 */
interface Props {
    game_id: number;
    onComplete: () => void;
}

/**
 * Stores the default value of the board (empty)
 */
const DEFAULT_STATE = [
    { pos: 0, char: '-' },
    { pos: 1, char: '-' },
    { pos: 2, char: '-' },
    { pos: 3, char: '-' },
    { pos: 4, char: '-' },
    { pos: 5, char: '-' },
    { pos: 6, char: '-' },
    { pos: 7, char: '-' },
    { pos: 8, char: '-' },
];

/**
 * A tic tac toe board that can be used to represent gameplay
 * @param game_id The id of the game that this represents (used to start the game itself)
 * @param onComplete Called when the game is completed
 * @constructor
 */
const TTTBoard: React.FC<Props> = ({ game_id, onComplete }) => {
    // Setup the game state
    const [loading, setLoading] = React.useState(true);
    const [board, setBoard] = React.useState(DEFAULT_STATE);
    const [turn, setTurn] = React.useState('');
    const [winner, setWinner] = React.useState('');
    const { id, token } = React.useContext(AuthContext);
    const game = React.useRef(null as TTTPlayer | null);

    // Connect to the websocket server to start playing the game
    React.useEffect(() => {
        const connectToWS = async () => {
            // Set the initial state
            const tttd = await getTicTacToeData(game_id, id, token);

            const st = (player: number) => {
                const s = player === id ? 'Your Turn!' : 'Opponents Turn!';
                setTurn(s);
            };

            const onGameComplete = (result: GameResult) => {
                switch (result) {
                    case GameResult.Loser:
                        setWinner('Too bad, you lost!');
                        break;
                    case GameResult.Draw:
                        setWinner('A draw!');
                        break;
                    case GameResult.Winner:
                        setWinner('Congratulations you won!');
                }
            };

            // Connect to play the game
            const play_url = await connectTTT(game_id, token);
            game.current = new TTTPlayer(play_url, id, tttd, setBoard, st, onGameComplete, () => setLoading(false));
        };

        connectToWS();

        // When this component is unmounted we want to clean up the websocket connection
        return () => {
            game.current?.cleanup();
        };
    }, []);

    // Display the loading message if the game isn't ready yet
    if (loading || board.length === 0 || turn.length === 0 || game.current === null) {
        return (
            <View style={styles.loadContainer}>
                <Text style={styles.loadText}>Loading</Text>
            </View>
        );
    }

    // The game is done display a message to the user
    if (winner !== '') {
        Alert.alert('Game finished!', winner, [
            {
                text: 'Back',
                onPress: onComplete,
            },
        ]);
    }

    // An item representing each tile of the TTT board
    const Item = ({ pos, character }: { pos: number; character: string | null }) => {
        // onPress we try to move make a move their and notify the user what happened
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    switch (game.current.move(pos)) {
                        case MoveResult.InvalidPosition:
                            Snackbar.show({
                                text: "Can't move there",
                                duration: Snackbar.LENGTH_SHORT,
                            });
                            break;
                        case MoveResult.WrongTurn:
                            Snackbar.show({
                                text: 'Not your turn',
                                duration: Snackbar.LENGTH_SHORT,
                            });
                            break;
                    }
                }}
            >
                <Text style={styles.icon}>{character === '-' ? '' : character}</Text>
            </TouchableOpacity>
        );
    };
    const renderItem = ({ item }: { item: TTTPos }) => <Item character={item.char} pos={item.pos} />;

    return (
        <View style={styles.container}>
            <FlatList data={board} renderItem={renderItem} numColumns={3} keyExtractor={({ pos }) => pos.toString()} />

            <Text style={styles.turntext}>{turn}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        marginHorizontal: 8,
        fontWeight: 'bold',
    },
    item: {
        flex: 1,
        padding: 10,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
    },
    turntext: {
        marginTop: 30,
        fontSize: fontScaler(20),
        textAlign: 'center',
    },
    icon: {
        fontSize: fontScaler(100),
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    loadContainer: {
        marginTop: 8,
        marginHorizontal: 8,
        justifyContent: 'center',
        paddingBottom: '10%',
        flex: 1,
    },
    loadText: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
});

export default TTTBoard;
