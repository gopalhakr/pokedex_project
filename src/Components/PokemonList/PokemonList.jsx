
import { useEffect } from "react"
import axios from 'axios'
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setisloading] = useState(true);

    const PokedexUrl = 'https://pokeapi.co/api/v2/pokemon'

    async function downloadPokemons() {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const pokemonResults = response.data.results;
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));


        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData)

        // saving data in pokemon list
        const res = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id : pokemon.id,

                name: pokemon.name,

                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,

                types: pokemon.types
            }
        });
        console.log(res)
        setPokemonList(res)

        setisloading(false);


    }
    useEffect(() => {
        downloadPokemons();

    }, []);


    return (
        <>
        <div className="pokemon-list-wrapper">
            <div> Pokemon list :  </div>
            {(isLoading) ? 'laoding' : pokemonList.map((p) => <Pokemon name = {p.name} image ={p.image} key={p.id} />)
            }
        </div>
        </>
    )

}

export default PokemonList