import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { Button } from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fontes from '../styles/fontes';

export function UserIdentification() {

    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    async function handleSubmit(){

        if(!name) 
            return Alert.alert("Me diz como chamar você por favor 🥺");
            
        try{
            await AsyncStorage.setItem('@plantmanager:user', name);    
        
            navigation.navigate('Confirmation',{
                title: 'Prontinho!',
                subtitle: 'Agora vamos começar a cuidar das suas planttinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            return Alert.alert("Parece que algo deu errado 🥺");
        }
        
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!!name);
    }

    function handleInputFocus() {
        setIsFocused(true)
        
    }

    function handleInputChange(value: string) {
        setIsFilled(!!!value);
        setName(value);
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>
                                {isFilled ? '😃' : '😄'}
                            </Text>
                            <Text style={[
                                styles.title
                                ]}>
                                Como podemos{"\n"}
                                chamar você?
                            </Text>

                            <TextInput
                                style={[styles.input,
                                    (isFocused || !isFilled) && 
                                    {borderColor: colors.green}]
                                }
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                 </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        width: '100%'
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },

    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fontes.heading,
        lineHeight: 32,
        marginTop: 20
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20
    }
});