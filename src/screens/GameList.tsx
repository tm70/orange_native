import React from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';

// To get the navigation prop typed
type GameListNavigationProp = StackNavigationProp<StackParamList, 'GameList'>;
type Props = {navigation: GameListNavigationProp};

// Games to be listed
// 'title' is the name to be displayed on its button
// 'game' is the screen to navigate to when the button is pressed
// 'icon' is the image source for the background image on its button
const DATA = [
  {
    key: 'game1',
    title: 'Tic Tac Toe',
    game: 'TicTacToe',
    icon: require('../../assets/tictactoeicon.png'),
  },
  {
    key: 'game2',
    title: 'Chess',
    game: 'Chess',
    icon: require('../../assets/chessicon.png'),
  },{
    key: 'game3',
    title: 'VideoChat',
    game: 'VideoChat',
    icon: require('../../assets/video_chat.png'),
  },
];

const Item = ({title, onPress, icon}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <ImageBackground source={icon} style={{}}>
      <View style={styles.tile}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const GameList: React.FC<Props> = ({navigation}) => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      onPress={() => navigation.navigate('GameInviteFriends', {game: item.game})}
      icon={item.icon}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Games</Text>
          </>
        }
        data={DATA}
        renderItem={renderItem}
        numColumns={2}
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
  item: {
    backgroundColor: '#3498DB',
    flex: 1,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    color: 'white',
    fontSize: fontScaler(22),
    textAlign: 'center',
  },
});

export default GameList;
