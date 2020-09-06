import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {StackParamList} from "../../App";
import fontScaler from "../util/fontScaler";
import useUserSearch from "../hooks/useUserSearch";

type IndexScreenNavigationProp = StackNavigationProp<StackParamList, 'FriendFind'>
type Props = { navigation: IndexScreenNavigationProp; };

const FriendFindScreen: React.FC<Props> = ({navigation}) => {
    const [searchAPI, users, errorMessage] = useUserSearch(20);
    const [searchText, setSearchText] = useState('')
    
    interface ItemProps { 
        firstname: string ,
        id: number
    }

    // item prefer to display

    const Item: React.FC<ItemProps> = ({ firstname, id }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Bio', 
            {id}
          )}>
                <Image 
                    style={{width:60,height:60,}}
                    source={require('../../assets/person.png')}
                />
                <Text style={styles.title}>{firstname}</Text>
            </TouchableOpacity>
        </View>
    );

    // render item 
    const renderItem = ({ item }) => (
        <Item firstname={item.firstname} id={item.id}/>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose friend to play with</Text>
            <Text style={styles.subheader}>based on similar interests</Text>
            <View style={styles.textinput}>
            <TextInput
                style={{height:'70%', width:'80%', borderColor: 'black', borderWidth: 3, fontSize: fontScaler(13), textAlign: 'center'}}
                onChangeText={setSearchText}
                value={searchText}
                onSubmitEditing={() => searchAPI(searchText)}
            />
            </View>
            <View style={styles.list}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={({ id }, _index) => id.toString()}
                numColumns={3}
                horizontal={false}
                columnWrapperStyle={styles.columnStyle}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    textinput: {
        marginTop: '5%',
        marginHorizontal: '25%',
        justifyContent: 'center',
        flexDirection:"row",
        marginBottom: '10%',
        width: '50%',
        alignItems:'center',
    },

    header: {
        fontSize: fontScaler(17),
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subheader: {
        fontSize: fontScaler(13),
        textAlign: 'center',
        
    },
    list: {
        alignItems:'center',
        flex: 1,
    },
    item: {
        padding: '2%',
        marginVertical: '1%',
        backgroundColor: 'white',
        alignItems:'center',
        marginHorizontal: '5%',
    },
    
    title: {
        fontSize: fontScaler(8),
        justifyContent: 'center',
        textAlign: 'center',
    },

    columnStyle:{
        // marginLeft: '5%',
        // marginRight: '5%',
    },
});

export default FriendFindScreen;
