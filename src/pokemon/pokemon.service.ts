import { Injectable } from '@nestjs/common';
import { Pokemon } from './pokemon.interface';

@Injectable()
export class PokemonService {
    listAllPokemons(): Array<Pokemon> {
        return [
            { name: 'Pikachu', type: 'electric' },
            { name: 'Pikachu', type: 'electric' },
            { name: 'Pikachu', type: 'electric' }
        ]
    }
}
