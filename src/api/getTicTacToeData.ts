import ApiRequest, {WEBSOCKET_CONNECT} from './ApiRequest';
import {GameState} from './getGames';

/**
 * What the server returns when getting data from a specific game.
 * Contains information about the players, the last saved state.
 * As the game isn't saved after each move only when no players are playing or the game ends.
 */
export interface TicTacToeData {
    game_data: {
        TicTacToe: {
            first_player_id: number;
            game_id: number;
            moves: string;
        };
    };
    game_state: {
        game_type: 'TicTacToe';
        id: number;
        opponent_id: number;
        player_ids: [number, number];
        status: GameState;
    };
    state: TTTState;
}

/**
 * A position on the tic tac toe board
 * @property {number} pos - the position: [0, 8] top left to to bottom right
 * @property {string} char - the character at this position
 */
export interface TTTPos {
    pos: number;
    char: string;
}

/**
 * The determined state for the game based on the messages sent by the websocket server
 * @property {number} current_turn - The id of the player whose turn it is
 * @property {boolean} is_player_turn - True if it is this players turn otherwise false
 * @property {number} first_player - The id of the first player to play
 * @property {number} second_player - The id of the second player to play
 * @property {string} player_character - The character that this player uses
 * @property {TTTPos[]} board - The current state of the board
 */
export interface TTTState {
    current_turn: number;
    is_player_turn: boolean;
    first_player: number;
    second_player: number;
    player_character: 'X' | 'O';
    board: TTTPos[]; // Length of 9, left to right, top to bottom, 'X', 'O' or '-'
}

/**
 * Takes the information about the tic tac toe game, the player and constructs a more useful representation of the state
 * @param tttd The information about the game returned from the backend
 * @param player_id The id of this player
 * @param ms The current state of the game
 */
export const processTTTMoveString = (tttd: TicTacToeData, player_id: number, ms: string): TTTState => {
    if (ms.length !== 9 && ms.length !== 0) {
        throw new Error('Invalid move string');
    }

    // Compute some information about which player is which based on the board state anf first player information
    const board = ms.split('').map((c, i) => {
        return { pos: i, char: c };
    });
    const first_player = tttd.game_data.TicTacToe.first_player_id;
    const opponent = tttd.game_state.opponent_id;
    const second_player = opponent === first_player ? player_id : opponent;

    // X always goes first
    const x_count = ms.split('X').length - 1;
    const o_count = ms.split('O').length - 1;
    const firsts_turn = x_count <= o_count;
    const current_turn = firsts_turn ? first_player : second_player;

    return {
        first_player,
        second_player,
        is_player_turn: current_turn === player_id,
        current_turn,
        player_character: first_player === player_id ? 'X' : 'O',
        board,
    };
};

/**
 * Connect to a new game of tic tac toe. This tells the websocket server to open a new url for websocket connection.
 * @param game_id The id of the game to connect to
 * @param token This players token
 */
export const connectTTT = async (game_id: number, token: string): Promise<string> => {
    let response = await fetch(WEBSOCKET_CONNECT, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game_id: game_id }),
    });

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response
        .json()
        .then((data) => data.url)
        .catch(() => {
            throw new Error('Error connecting to game');
        });
};

/**
 * The state of the game framed from this players perspective (ar they the winner or loser)
 */
export enum GameResult {
    NotFinished,
    Winner,
    Loser,
    Draw,
}

/**
 * The result of making a move. Used to provide feedback to the user when they try to do something wrong.
 */
export enum MoveResult {
    Success,
    NotReady,
    WrongTurn,
    InvalidPosition,
}

/**
 * Implements all the websocket communication and state maintenance logic.
 */
export class TTTPlayer {
    url: string; // The play url (where the websocket connection is initiated)
    player_id: number; // The id of this player
    tttd: TicTacToeData; // The 'static' information about this game
    setBoard: (newBoard: TTTPos[]) => void; // An action that is triggered when the STATE message is sent
    setTurn: (player: number) => void; // An action that is triggered when the TURN message is sent
    socket: WebSocket; // The socket that is being used for communication
    currentPlayer: number; // The player whose turn it currently is
    board: TTTPos[] | null; // The current state of the board
    ready: boolean; // Whether or not the connection is ready
    pingInterval: NodeJS.Timeout; // The interval responsible for keeping the connection alive

    /**
     * Initialise a new websocket connection and handle all the server messages
     * @param play_url The play url (where the websocket connection is initiated)
     * @param player_id The id of this player
     * @param tttd The 'static' information about this game
     * @param setBoard An action that is triggered when the STATE message is sent
     * @param setTurn An action that is triggered when the TURN message is sent
     * @param onComplete An action to trigger when the game finishes
     * @param onReady An action to trigger when the game has finished initialising
     */
    constructor(
        play_url: string,
        player_id: number,
        tttd: TicTacToeData,
        setBoard: (newBoard: TTTPos[]) => void,
        setTurn: (player: number) => void,
        onComplete: (result: GameResult) => void,
        onReady: () => void,
    ) {
        this.url = play_url;
        this.player_id = player_id;
        this.tttd = tttd;
        this.setBoard = setBoard;
        this.setTurn = setTurn;
        this.currentPlayer = -1; // -1 before we know
        this.board = null;
        this.ready = false;
        this.socket = new WebSocket(play_url);

        // Keep the websocket connection alive by sending a ping
        this.pingInterval = setInterval(() => {
            this.ping();
        }, 3000);

        // Handle messages from the server
        this.socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.command) {
                case 'STATE': // The game state has changed
                    const state = processTTTMoveString(tttd, player_id, msg.payload);
                    setBoard(state.board);
                    setTurn(state.current_turn);
                    this.board = state.board;
                    this.currentPlayer = state.current_turn;
                    if (!this.ready) {
                        onReady();
                    }
                    this.ready = true;
                    break;
                case 'TURN': // It is a new players turn
                    const p = parseInt(msg.payload, 10);
                    setTurn(p);
                    this.currentPlayer = p;
                    break;
                case 'FINISH': // The game has finished
                    // Winner format is "Winner(#)"
                    if (msg.payload.startsWith('Winner')) {
                        const winnerIDStr = msg.payload.split('(')[1].split(')')[0];
                        const winnerID = parseInt(winnerIDStr, 10);
                        onComplete(winnerID === player_id ? GameResult.Winner : GameResult.Loser);
                    } else if (msg.payload === 'Draw') {
                        onComplete(GameResult.Draw);
                    }
                    break;
            }
        };

        // Send JOINED message on connection
        this.socket.onopen = () => {
            const joined_message = { command: 'JOINED', payload: '' };
            this.socket.send(JSON.stringify(joined_message));
        };
    }

    /**
     * Attempt to make a move
     * @param pos The position to play [0, 8] top left to bottom right
     */
    move(pos: number): MoveResult {
        // Ensure the game is ready to send moves
        if (this.board === null || !this.ready) {
            return MoveResult.NotReady;
        }

        // Ensure it is this players turn
        if (this.currentPlayer !== this.player_id) {
            return MoveResult.WrongTurn;
        }

        // Ensure they are playing a valid position of the board
        if (this.board[pos].char !== '-') {
            return MoveResult.InvalidPosition;
        }

        // Send Move
        const moveMsg = {
            command: 'MOVE',
            payload: pos.toString(),
        };

        this.socket.send(JSON.stringify(moveMsg));
        return MoveResult.Success;
    }

    /**
     * Cleanup the connection as cleanly as possible when the user leaves the game
     */
    cleanup() {
        clearInterval(this.pingInterval);

        const closeMsg = {
            command: 'CLOSE',
            payload: '',
        };

        try {
            this.socket.send(JSON.stringify(closeMsg));
            this.socket.close();
        } catch {
            // It's okay if we error here. It just means we had a problem sending a close message.
            // The server will still be able to detect that the websocket has/will close
        }
    }

    /**
     * Send a PING message to the server (which triggers a proper WebSocket ping response which we pong to)
     * Doing it this way means that it's the clients responsibility to keep the connection alive which
     * makes the most sense for this application.
     */
    ping() {
        // Not ready to send messages
        if (!this.ready) {
            return;
        }

        const pingMsg = {
            command: 'PING',
            payload: '',
        };
        this.socket.send(JSON.stringify(pingMsg));
    }
}

// ======================
// Backend API Request
// ======================

interface Response {
    status: number;
    info: TicTacToeData;
}

/**
 * Get the 'static' data about a tic tac toe game (things like the players and who goes first etc)
 * @param game_id The id of the game
 * @param player_id The id of this player
 * @param token This player's token
 */
export const getTicTacToeData = async (game_id: number, player_id: number, token: string): Promise<TicTacToeData> => {
    const response = await new ApiRequest(`/users/${player_id}/games/${game_id}`).withToken(token).send<Response>();
    return response.info;
};
