// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom"

// function PokemonDetails() {
//     const { id } = useParams();
//     const [pokemon, setPokemon] = useState({name: '',
//         image: '',
//         weight: 0,
//         height: 0,
//         types: []});
//     async function downloadPokemon() {
//         // this will give details of all the pokemon
//         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/1/${id}`)
//         setPokemon({
//             name: response.data.name,
//             image: response.data.sprites.other.dream_world.front_default,
//             weight: response.data.weight,
//             height: response.data.height,
//             types: response.data.types.map((t) => t.type.name)



//         })
//     }

//     // and will call this downloadPokemon in use effect
//     useEffect(() => {

//         downloadPokemon();
//     }, [])

//     return (
//     <div className="pokemon-details-wrapper">

//        <div className="pokemon-name">name :{pokemon.name} </div> 
//        <img className="pokemon-image" src= {pokemon.image}/>
//        <div>Height : {pokemon.height}</div>  
//        <div>Weight : {pokemon.weight}</div> 
//        <div className="pokemon-types">
//         {pokemon.types.map((t)=> < div key={t}>{t}</div>)}
//         </div> 
       
//         </div>
//     );
// }

// export default PokemonDetails



import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({
        name: '',
        image: '',
        weight: 0,
        height: 0,
        types: []
    });

    async function downloadPokemon() {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default,
                weight: response.data.weight,
                height: response.data.height,
                types: response.data.types.map((t) => t.type.name)
            });
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]);

    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-name">Name: {pokemon.name}</div>
            <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
           
           < div className="wid-height">
            <div >Height: {pokemon.height}</div>
            <div >Weight: {pokemon.weight}</div>
            </div>
            <div className="pokemon-types">
                {pokemon.types.length > 0 ? (
                    pokemon.types.map((t) => <div key={t}>{t}</div>)
                ) : (
                    <div>Loading types...</div>
                )}
            </div>
        </div>
    );
}

export default PokemonDetails;
