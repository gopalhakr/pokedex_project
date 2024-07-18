import {Route, Routes} from "react-router-dom"
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails"
import Pokedex from "../Components/Pokedex/Pokedex"

function CustomRoutes()
{
    return(
        <Routes>
            {/* // giving a route component inside route */}
            {/* Keep in remember whenever we are giving any component it should be wrapped inside the </> */}
            <Route path = "/" element ={<Pokedex/>}/>
            <Route path ="/pokemon/:id" element ={<PokemonDetails/>}/>
        </Routes>
    )

}

export default CustomRoutes