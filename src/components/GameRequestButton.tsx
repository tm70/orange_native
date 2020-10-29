import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import fontScaler from '../util/fontScaler';
import getBio, { Bio } from '../api/getBio';
import AuthContext from '../context/AuthContext';

const states = {
    Finished: 'Finished',
    Cancelled: 'Cancelled',
    InProgress: 'Game in Progress',
    RequestSent: 'Request Sent',
    RequestReceived: 'Accept Request?',
};

interface Props {
    id: number;
}

/**
 * Button for a Game Request
 * @constructor
 * @param item - The game request
 * @param bio - The bio of the other user
 * @param onPress - Function to be called on pressing the button
 */
const GameRequestButton: React.FC<Props> = ({ item, bio, onPress }) => {
    return (
        <>
            <TouchableOpacity style={styles.rowDisplay} onPress={onPress}>
                <Image
                    style={styles.profileImage}
                    source={bio.image_url == null ? require('../../assets/person.png') : { uri: bio.image_url }}
                />
                <View style={styles.columnDisplay}>
                    <Text style={styles.subheader}>
                        {item.game_type} with {bio.firstname} {bio.surname}
                    </Text>
                    <Text style={styles.subheader}>{states[item.status]}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: '25%',
        aspectRatio: 1,
    },
    rowDisplay: {
        flexDirection: 'row',
        marginBottom: 12,
        backgroundColor: '#3498DB',
    },
    columnDisplay: {
        marginLeft: '5%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    subheader: {
        fontSize: fontScaler(15),
        textAlign: 'center',
    },
});

export default GameRequestButton;
