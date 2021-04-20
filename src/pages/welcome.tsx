import React from 'react';
import{SafeAreaView,
        Platform,
        StatusBar,
        StyleSheet,
        Text, 
        Image, 
        TouchableOpacity,
        Dimensions,
        View
    } from 'react-native';

import { Entypo } from '@expo/vector-icons'
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fontes from '../styles/fontes';
import { BaseNavigationContainer, useNavigation } from '@react-navigation/core';


export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }
    
    return (
        <View style={style.wrapper}>
            <SafeAreaView style={style.container}>
                <Text style={style.title}>
                    Gerencie {"\n"}
                    suas plantas de {"\n"}
                    forma fácil!
                </Text>

                <Image 
                    source={wateringImg}
                    style={style.image}
                    resizeMode='contain'
                />

                <Text style={style.subtitle}>
                    Não esqueça mais de regar suas {"\n"}
                    plantas. Nós cuidamos de lembrar você {"\n"}
                    sempre que precisar.
                </Text>
                
                <TouchableOpacity style={style.button}activeOpacity={0.8}>   
                        <Entypo 
                            name='chevron-right'
                            style={style.buttonicon}
                            onPress={handleStart}
                        />
            </TouchableOpacity>

            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    wrapper: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
        paddingHorizontal: 20
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 30,
        height: 56,
        width: 56
    },

    buttonicon: {
        color: colors.white,
        fontSize: 32
    },

    title: {
        fontSize: 28,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fontes.heading,
        marginTop: 38,
        lineHeight: 34

    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fontes.text
    },

    image: {
        height: Dimensions.get('window').width * 0.7
    }
})