import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
     } from 'react-native';

import { EnviromentButton } from '../components/EnviromentButton';

import { Header } from '../components/header';
import { PlantCardPrimary } from '../components/plantsCardPrimary';
import { Load } from '../components/load'

import api from '../services/api';

import colors from '../styles/colors';
import fontes from '../styles/fontes';
import { useNavigation } from '@react-navigation/core';
import { PlantProps } from '../libs/storage';

interface EnviromentProps{
    key: string;
    title: string;
}

export function PlantSelect() {

    const navigation = useNavigation();

    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);

    const [enviromentSelected, setEnviromentSelected ] = useState('all');

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    function handleEnviromentSelected(environment: string) {
        setEnviromentSelected(environment);

        if(environment == 'all') return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
          )

            setFilteredPlants(filtered);
    }

    function handleFetchMore(distance: number) {
        if(distance < 1) return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);

        fetchPlants();
    }

    async function fetchPlants() {

        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=10`)

        if(!data)
            return setLoading(true);

        if(page > 1) {
            setPlants(oldValue => [... oldValue, ... data])
        }else {            
        setPlants(data);
        setFilteredPlants(data);

        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate('PlantSave', { plant });
    }

    useEffect(() => {

        async function fetchEnviroment() {
            const { data } = await api
            .get('plants_environments?_sort=title&asc')
            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }

        fetchEnviroment();
    },[])

    useEffect(() => {
        

        fetchPlants();
    },[])


    if(loading) {
        return <Load/>
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    voc?? quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({item}) => (

                        <EnviromentButton
                         title= {item.title}

                         active={item.key == enviromentSelected}
                         onPress={() => handleEnviromentSelected(item.key)}
                         />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                    <FlatList 
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardPrimary
                        data={item}
                        onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd} ) =>
                    handleFetchMore(distanceFromEnd) }

                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green}/>
                        : <View/>    
                    }
                    />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background
    },

    header: {
        paddingHorizontal: 30
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fontes.heading,
        lineHeight: 20,
        marginTop: 15
    },

    subtitle: {
        fontFamily: fontes.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },

    contentContainerStyle: {
        
    }

});