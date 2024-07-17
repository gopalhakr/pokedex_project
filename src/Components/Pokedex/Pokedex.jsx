import React from 'react';
import Search from "../Search/Searchs";
import "./Pokedex.css";
import PokemonList from '../PokemonList/PokemonList';


function Pokedex()
{
    return(
        <div className='pokedex-wrapper'>
           <h1 id='pokedex-heading'>Pokedex</h1> 
        
        <Search/> 
        {/* // this is the name that you import from the file*/}
        <PokemonList/>
        </div>
    )

}
export default Pokedex;



