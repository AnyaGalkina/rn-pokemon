import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, Pokemon, PokemonItem} from '../api/api';

type Nullable<T> = null | T;

const initialState = {
    allPokemons: [] as PokemonItem[],
    pokemon: null as Nullable<Pokemon>
}

export const getAllPokemon = createAsyncThunk<PokemonItem[], void>(
    'root/getAllPokemon',
    async (_, {rejectWithValue}) => {
        try {
            const res = await api.getAllPokemon();
            return res.data.results
        } catch
            (e) {
            return rejectWithValue(null);
        }
    })
;

export const getPokemonById = createAsyncThunk<Pokemon, string>(
    'root/getPokemonById',
    async (param: string, {rejectWithValue}) => {
        try {
            const res = await api.getPokemonById(param);
            return res.data;
        } catch
            (e) {
            return rejectWithValue(null);
        }
    }
);

export const clearPokemonState = createAction('root/clearPokemonState')

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPokemon['fulfilled'], (state, action) => {
                state.allPokemons = action.payload;
            })
            .addCase(getPokemonById['fulfilled'], (state, action) => {
                state.pokemon = action.payload;
            })
            .addCase(clearPokemonState, (state) => {
                state.pokemon = null;
            })
    }
});

export const root = slice.reducer;
export const {} = slice.actions;
