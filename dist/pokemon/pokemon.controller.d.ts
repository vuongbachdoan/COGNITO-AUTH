import { Pokemon } from './pokemon.interface';
import { PokemonService } from './pokemon.service';
export declare class PokemonController {
    private pokemonService;
    constructor(pokemonService: PokemonService);
    listAllPokemon(): Array<Pokemon>;
}
