import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {DetailsScreenProps} from '../main/types';
import {api, Pokemon} from '../../api/api';

type Nullable<T> =T | null;

export const DetailsScreen = ({route}: DetailsScreenProps) => {
    const {url} = route.params;
    const [currentPokemon, setCurrentPokemon] = useState<Nullable<Pokemon>>(null);

    useEffect(() => {
        api.getPokemonById(url).then((res) => {
            setCurrentPokemon(res.data);
        })
    }, []);

    return (
        <View style={{flex: 1}}>
            {currentPokemon  ?
                <View>
                    <Text>{currentPokemon.name}</Text>
                    <Image
                        style={{width: 250, height: 250}}
                        source={{uri: currentPokemon.sprites.other["official-artwork"].front_default}}
                    />
                </View>
            : ""
            }
        </View>
    );
};
