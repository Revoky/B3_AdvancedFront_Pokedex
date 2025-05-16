import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../types';

export const pokemonApi = createApi({
    reducerPath: "pokemonApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://tyradex.app/api/v1/" }),
    tagTypes: ["PokemonGen"],

    endpoints: (builder) => ({
        getGen: builder.query<Pokemon[], number | void>({
            query: (gen = 1) => `gen/${gen}`,
            providesTags: () => ["PokemonGen"],
        }),

        getPokemon: builder.query<Pokemon, number>({
            query: (id) => `pokemon/${id}`,
        }),
    })
})

export const { useGetGenQuery, useGetPokemonQuery } = pokemonApi;