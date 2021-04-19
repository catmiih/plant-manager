import React, {useState} from 'react';
import{ SafeAreaView, Platform, StatusBar, StyleSheet , Text, Image, TouchableOpacity } from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import { Button } from '../components/button'

export function Welcome(){
    const[visible,setVisible] = useState(false);

    function handVisibility() {
        setVisible(true);
    }

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.title}>
                Gerencie {"\n"}
                suas plantas{"\n"}
                de forma fácil!
            </Text>

            <Image source={wateringImg} style={style.image}/>

            <Text style={style.subtitle}>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            
            <Button title=">"/>

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },

    image: {
        width: 292,
        height: 284
    }
})