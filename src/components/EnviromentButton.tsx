import React from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fontes from '../styles/fontes';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export function EnviromentButton({
    title,
    active = false,
    ...rest
    
}: EnviromentButtonProps){
    return (
        <RectButton 
        style={[
            styles.container,
            active && styles.containerActive
        ]}
        {...rest}>

            <Text 
            style={[
                styles.text,
                active && styles.textActive
            ]}>
                {title}
            </Text>

        </RectButton>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.shape,
        width: 110,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },

    containerActive: {
        backgroundColor: colors.green_light
    },

    text: {
        color: colors.heading,
        fontFamily: fontes.text
    },

    textActive: {
        fontFamily: fontes.heading,
        color: colors.green_dark
    }

})