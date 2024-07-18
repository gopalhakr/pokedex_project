
import { useEffect } from "react"
import axios from 'axios'
import './PokemonList.css'
import { useState } from "react"
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setisloading] = useState(true);

    // const PokedexUrl = 'https://pokeapi.co/api/v2/pokemon'
    const [PokedexUrl, setPokedexUrl] = useState ('https://pokeapi.co/api/v2/pokemon')

    const [nextUrl , setNextUrl] =useState('');
    const [prevUrl , setPrevUrl] =useState('');







    async function downloadPokemons() {

          //as soon as download pokemons is calling setisloading should be true
          setisloading(true)

        const response = await axios.get(PokedexUrl) //this will download list of 20 pokemons


        const pokemonResults = response.data.results;//  we get the array of pokemons from results
        console.log(response.data)
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);

        // iterating over the array of pokemons and using their url to create an arry of promises that will download these pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData)// the pokemonData has all the detailed information of all the 20  pokemons 

        // saving data in pokemon list and iterating over data of each pokemon and extracting id name image types
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

    }, [PokedexUrl]);


    return (
        <>
        <div className="pokemon-list-wrapper">
            <div className="pokemon-name-list-colour"> Pokemon list :  </div>
            <div className="pokemon-wrapper">
            {(isLoading) ? 'laoding' : pokemonList.map((p) => <Pokemon name = {p.name} image ={p.image} key={p.id} id ={p.id}/>)
            }
            </div>
            <div className="button-control">
                <button  disabled={prevUrl ==null} onClick={()=> setPokedexUrl(prevUrl)}>prev</button>
                <button disabled={nextUrl ==null} onClick={()=> setPokedexUrl(nextUrl)}>next</button>
            </div>
            
        </div>
        </>
    )

}

export default PokemonList