import { BACKEND_BASE_URL, WEBSOCKET_CONNECT } from './endpoints';
import TTTBoard from '../components/tic_tac_toe/TTTBoard';

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
        status:
            | 'Cancelled'
            | 'Finished'
            | 'InProgress'
            | 'RequestSent'
            | 'RequestReceived';
    };
    state: TTTState;
}

export interface TTTPos {
    pos: number;
    char: string;
}

export interface TTTState {
    current_turn: number;
    is_player_turn: boolean;
    first_player: number;
    second_player: number;
    player_character: string;
    board: TTTPos[]; // Length of 9, left to right, top to bottom, 'X', 'O' or '-'
}

// This whole thing is ugly as hell but we are running low on time
export const processTTTMoveString = (
    tttd: TicTacToeData,
    player_id: number,
    ms: string,
): TTTState => {
    if (ms.length !== 9 && ms.length !== 0) {
        throw new Error('Invalid move string');
    }

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

export const connectTTT = async (
    game_id: number,
    token: string,
): Promise<string> => {
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

export enum GameResult {
    NotFinished,
    Winner,
    Loser,
    Draw,
}

export enum MoveResult {
    Success,
    NotReady,
    WrongTurn,
    InvalidPosition,
}

export class TTTPlayer {
    url: string;
    player_id: number;
    tttd: TicTacToeData;
    setBoard: (newBoard: TTTPos[]) => void;
    setTurn: (player: number) => void;
    socket: WebSocket;
    currentPlayer: number;
    board: TTTPos[] | null;
    ready: boolean;
    pingInterval: NodeJS.Timeout;

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
        this.currentPlayer = -1;
        this.board = null;
        this.ready = false;
        this.socket = new WebSocket(play_url);

        this.pingInterval = setInterval(() => {
            this.ping();
        }, 3000);

        // Handle messages from the server
        this.socket.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.command) {
                case 'STATE':
                    const state = processTTTMoveString(
                        tttd,
                        player_id,
                        msg.payload,
                    );
                    setBoard(state.board);
                    setTurn(state.current_turn);
                    this.board = state.board;
                    this.currentPlayer = state.current_turn;
                    if (!this.ready) {
                        onReady();
                    }
                    this.ready = true;
                    break;
                case 'TURN':
                    const p = parseInt(msg.payload, 10);
                    setTurn(p);
                    this.currentPlayer = p;
                    break;
                case 'FINISH':
                    // Winner format is "Winner(#)"
                    if (msg.payload.startsWith('Winner')) {
                        const winnerIDStr = msg.payload
                            .split('(')[1]
                            .split(')')[0];
                        const winnerID = parseInt(winnerIDStr, 10);
                        onComplete(
                            winnerID === player_id
                                ? GameResult.Winner
                                : GameResult.Loser,
                        );
                    } else if (msg.payload === 'Draw') {
                        onComplete(GameResult.Draw);
                    }
                    break;
            }
        };

        // Send Joined message on connection
        this.socket.onopen = () => {
            const joined_message = { command: 'JOINED', payload: '' };
            this.socket.send(JSON.stringify(joined_message));
        };
    }

    move(pos: number): MoveResult {
        // Ensure valid
        if (this.board === null || !this.ready) {
            return MoveResult.NotReady;
        }

        if (this.currentPlayer !== this.player_id) {
            return MoveResult.WrongTurn;
        }

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
            // Meh
        }
    }

    ping() {
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

// export const playTTT = (
//     play_url: string,
//     player_id: number,
//     tttd: TicTacToeData,
//     setBoard: (newBoard: TTTPos[]) => void,
//     setTurn: (player: number) => void,
// ): TTTCommands => {
//     let socket = new WebSocket(play_url);
//
//     // Handle messages from the server
//     socket.onmessage = (event) => {
//         const msg = JSON.parse(event.data);
//         switch (msg.command) {
//             case 'STATE':
//                 const state = processTTTMoveString(
//                     tttd,
//                     player_id,
//                     msg.payload,
//                 );
//                 setBoard(state.board);
//                 setTurn(state.current_turn);
//                 break;
//             case 'TURN':
//                 setTurn(msg.payload);
//                 break;
//         }
//     };
//
//     // Send Joined message on connection
//     socket.onopen = () => {
//         const joined_message = { command: 'JOINED', payload: '' };
//         socket.send(JSON.stringify(joined_message));
//     };
//
//     const move = (pos: number) => {};
//
//     return {
//         move,
//     };
// };

export const getTicTacToeData = async (
    game_id: number,
    player_id: number,
    token: string,
): Promise<TicTacToeData> => {
    const url = `${BACKEND_BASE_URL}/users/${player_id}/games/${game_id}`;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error('Failed to connect');
    }

    return await response.json().then((data) => {
        if (data.status !== 200) {
            throw new Error(data.message);
        }
        // console.log(data.info.);
        return data.info;
    });
};
