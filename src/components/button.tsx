import React from 'react';
import {TouchableOpacity, StyleSheet, Text, TouchableOpacityProps} from 'react-native'
import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

export function Button({title, ... rest} : ButtonProps) {
    return (
        
        <TouchableOpacity 
        style={style.button} 
        activeOpacity={0.8}
        { ... rest}
        >
            <Text style={style.buttontext}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create ({
    
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 30,
        height: 56,
        width: 56,
        paddingHorizontal: 10
    },

    buttontext: {
        color: colors.white,
        fontSize: 24
    }
})