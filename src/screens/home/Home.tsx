import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, ListRenderItem, TouchableOpacity, View, FlatList} from 'react-native';
import {api, Pokemon, PokemonItem} from '../../api/api';
import {NUM_COLUMNS, PADDING, WIDTH} from '../../constants/constants';
import {useAppNavigation} from '../main/types';

type Item = {
    name: string
    icon: string
    id: number
    key: number
    url: string
}

export const HomeScreen = () => {
    const {navigate} = useAppNavigation();
    const [allPokemons, setAllPokemons] = useState<Item[]>([]);

    useEffect(() => {
        api.getAllPokemon().then((res) => {
                res.data.results.forEach(({url}, index) => {
                    api.getPokemonById(url).then((resp) => {
                        setAllPokemons((prevState) =>  [...prevState, {
                            id: resp.data.id,
                            key: index + 1,
                            icon: resp.data.sprites.other['official-artwork'].front_default,
                            name: resp.data.name,
                            url: url,
                        } ])
                    })
                })
        })
    }, []);

    const renderItem: ListRenderItem<Item> = ({item, index}) => {

        return <TouchableOpacity onPress={() => {
            navigate('Details', {url: item.url})
        }}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: item.icon}}
                />
            </View>
        </TouchableOpacity>
    }
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={NUM_COLUMNS}
                data={allPokemons}
                renderItem={renderItem}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: PADDING,
    },
    item: {
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        width: (WIDTH - PADDING * 2) / NUM_COLUMNS - 5,
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 20,
        textAlign: 'center',
    }
})