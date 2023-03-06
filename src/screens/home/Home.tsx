import React, {useEffect} from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PokemonItem} from '../../api/api';
import {NUM_COLUMNS, PADDING, WIDTH} from '../../constants/constants';
import {useAppNavigation} from '../main/types';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {getAllPokemon} from '../../store/rootSlice';

export type Item = {
    name: string
    icon: string
    id: number
    key: number
    url: string
}

export const HomeScreen = () => {
    const {navigate} = useAppNavigation();
    const allPokemons = useAppSelector(state => state.root.allPokemons);
    const dispatch = useAppDispatch();
    // const [allPokemons, setAllPokemons] = useState<Item[]>([]);

    useEffect(() => {
        dispatch(getAllPokemon());
        // api.getAllPokemon().then((res) => {
        //         res.data.results.forEach(({url}, index) => {
        //             api.getPokemonById(url).then((resp) => {
        //                 setAllPokemons((prevState) =>  [...prevState, {
        //                     id: resp.data.id,
        //                     key: index + 1,
        //                     icon: resp.data.sprites.other['official-artwork'].front_default,
        //                     name: resp.data.name,
        //                     url: url,
        //                 } ])
        //             })
        //         })
        // })
    }, []);

    const renderItem: ListRenderItem<PokemonItem> = ({item, index}) => {

        return <TouchableOpacity onPress={() => {
            navigate('Details', {url: item.url})
        }}>
            <View style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
                {/*<Image*/}
                {/*    style={{width: 50, height: 50}}*/}
                {/*    source={{uri: item.icon}}*/}
                {/*/>*/}
            </View>
        </TouchableOpacity>
    }
    return (
        <View style={styles.container}>
            {/*{allPokemons.length &&*/}
                <FlatList
                    numColumns={NUM_COLUMNS}
                    data={allPokemons}
                    renderItem={renderItem}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                />
            {/*}*/}
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