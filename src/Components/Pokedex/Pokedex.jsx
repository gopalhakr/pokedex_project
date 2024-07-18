import React from 'react';
import Search from "../Search/Searchs";
import "./Pokedex.css";
import PokemonList from '../PokemonList/PokemonList';


function Pokedex()
{
    return(
        <div className='pokedex-wrapper'>
            
        
        <Search/> 
        {/* // this is the name that you import from the file ex: import Search from*/}
        <PokemonList/>
        </div>
    )

}
export default Pokedex;



