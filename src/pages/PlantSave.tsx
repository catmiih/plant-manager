import React, {useState} from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';

import { SvgFromUri } from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import colors from '../styles/colors';
import {Button} from '../components/button'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import fontes from '../styles/fontes';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';


interface Params{
    plant: PlantProps
}


export function PlantSave() {

    const navigation = useNavigation();

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const[showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();

    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if(Platform.OS == 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Você não pode escolher uma data que já passou! 😅')
        }

        if(dateTime) {
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }


    async function handleSave() {

        try {
            await savePlant({
                ... plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation',{
                title: 'Tudo certo!',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });


        }catch{
            Alert.alert('Não foi possível salvar sua planta. 😅')
        }
    }

    return(

        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>   
                <View style={styles.plantInfo}>
                <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>

                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />

                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                    </Text>

                    {showDatePicker && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />)}

                    { Platform.OS == 'android' && (
                        <TouchableOpacity 
                        style={styles.dataTimePickerButton}
                        onPress={handleOpenDateTimePickerForAndroid}>
                            <Text style={styles.dataTimePickerText}>
                                {`Regar em: ${format(selectedDateTime, 'HH:mm')} \n\n Mudar horário`}
                            </Text>
                        </TouchableOpacity>
                    )

                    }

                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },

    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: getBottomSpace() || 20,
        borderRadius: 20
    },

    plantName: {
        fontFamily: fontes.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    
    plantAbout: {
        textAlign: 'center',
        fontFamily: fontes.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },

    tipImage: {
        width: 56,
        height: 56
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fontes.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fontes.complemet,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },

    dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },

    dataTimePickerText: {
        color: colors.heading,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: fontes.text
    }
})