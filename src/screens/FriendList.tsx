import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, FlatList, ImageBackground} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {StackParamList} from '../../App';
import fontScaler from '../util/fontScaler';
import ProfileButton from '../components/ProfileIcon';
import useGetRelationships from "../hooks/useGetRelationships";
import AuthContext from '../context/AuthContext';

type FriendListNavigationProp = StackNavigationProp<StackParamList, 'FriendList'>;
type FriendListRouteProp = RouteProp<StackParamList, 'FriendList'>
type Props = { navigation: FriendListNavigationProp; route: FriendListRouteProp };

const FriendList: React.FC<Props> = ({navigation, route}) => {
    const params = route.params;
    const {token,id} = React.useContext(AuthContext);
    
    // refresh on focus, for navigating back to this page
    const [refresh, setRefresh] = React.useState(false);
    useEffect(() => {
        console.log("refresh");
    }, [refresh]);
    navigation.addListener('focus', () => {
        setRefresh(!refresh);
    });
    
    // get data from api ()
    const [s, friendList, e] = useGetRelationships();
    
    const renderItem = ({ item }) => (
        <ProfileButton
            text={item.bio.firstname + ' ' + item.bio.surname + '\n' + item.relationship}
            onPress={() => navigation.navigate('Bio', { id: item.bio.id })}
            image_url={item.bio.image_url}
        />
    );
    
    if (friendList.length == 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadtext}>Loading</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                ListHeaderComponent={
                    <>
                        <Text style={styles.header}>Friends</Text>
                    </>
                }
                data={friendList}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
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
    loadtext: {
        fontSize: fontScaler(25),
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '15%',
    },
    list: {
        width: '100%',
    },
});

export default FriendList;