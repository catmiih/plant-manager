import { useNavigation } from '@react-navigation/core';
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
    Keyboard
} from 'react-native';

import { Button } from '../components/button'

import colors from '../styles/colors';
import fontes from '../styles/fontes';

export function UserIdentification() {

    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleSubmit(){
        navigation.navigate('Confirmation');
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