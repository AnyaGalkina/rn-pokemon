import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {DetailsScreenProps} from '../main/types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {clearPokemonState, getPokemonById} from '../../store/rootSlice';

type Nullable<T> =T | null;

export const DetailsScreen = ({route}: DetailsScreenProps) => {
    const {url} = route.params;
    const dispatch = useAppDispatch();

    const currentPokemon = useAppSelector(state => state.root.pokemon)

    useEffect(() => {
        dispatch(getPokemonById(url));
        return () => {
            dispatch(clearPokemonState());
        }

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
