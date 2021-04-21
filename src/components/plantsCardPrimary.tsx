import React from 'react';
import {
    StyleSheet,
    Text,
    Image
} from 'react-native';

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { Svg, SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fontes from '../styles/fontes';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

export const PlantCardPrimary = ({data, ... rest} : PlantProps) => {
    return (
        <RectButton
        style={styles.container}
        {...rest}>

            <SvgFromUri uri={data.photo} 
            width={70} height={70}/>
            
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        borderRadius: 10,
        alignItems: 'center',
        margin: 10
    },

    text: {
        color: colors.green_dark,
        fontFamily: fontes.heading,
        marginVertical: 16
    }

})