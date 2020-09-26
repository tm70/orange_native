import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import fontScaler from '../util/fontScaler';
import { Bio } from '../api/getBio';
import getBio from '../api/getBio';
import AuthContext from '../context/AuthContext';

interface Props {
    id: number;
}

const BioInformation: React.FC<Props> = ({ id }) => {
    const [bio, setBio] = useState({} as Bio);

    const { token } = React.useContext(AuthContext);

    // Get data from api
    useEffect(() => {
        getBio(id, token).catch(console.log).then(setBio);
    }, [id, token]);

    if (Object.keys(bio).length === 0) {
        return <Text>Loading</Text>;
    }

    return (
        <>
            <View style={styles.rowDisplay}>
                <Image
                    style={styles.profileImage}
                    source={require('../../assets/person.png')}
                />
                <View style={styles.columnDisplay}>
                    <Text style={styles.subheader}>
                        {bio.firstname} {bio.surname}
                    </Text>
                    <Text style={styles.subheader}>{bio.country}</Text>
                </View>
            </View>

            <Text style={styles.header}>Bio</Text>
            <Text style={styles.info}>{bio.bio}</Text>

            <Text style={styles.header}>Hobbies</Text>
            {bio.hobbies.map((h) => (
                <Text key={h} style={styles.info}>
                    {h}
                </Text>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: '30%',
        height: '120%',
    },

    rowDisplay: {
        flexDirection: 'row',
        marginBottom: '10%',
    },

    columnDisplay: {
        marginTop: '9%',
        marginLeft: '20%',
        flexDirection: 'column',
    },

    header: {
        fontSize: fontScaler(17),
        fontWeight: 'bold',
        marginTop: '5%',
    },

    subheader: {
        fontSize: fontScaler(15),
        textAlign: 'center',
    },

    info: {
        fontSize: fontScaler(15),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BioInformation;
