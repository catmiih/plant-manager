import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';

import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { Svg, SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fontes from '../styles/fontes';

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export const PlantCardSecondary = ({data, ... rest} : PlantProps) => {
    return (
        <RectButton
        style={styles.container}
        {...rest}>

            <SvgFromUri uri={data.photo} 
            width={50} height={50}/>
            
            <Text style={styles.title}>
                {data.name}
            </Text>

            <View style={styles.details}>

                <Text style={styles.timeLabel}>
                    Regar às
                </Text>

                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderStartColor: colors.shape,
        marginVertical: 5,
        backgroundColor: colors.shape
        
    },

    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fontes.heading,
        fontSize: 17,
        color: colors.heading
    },

    details: {
        alignItems: 'flex-end'
    },

    timeLabel: {
        fontSize: 16,
        fontFamily: fontes.text,
        color: colors.body_light
    },

    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fontes.heading,
        color: colors.body_dark
    }

})