import { AuthGuard } from '@nestjs/passport';
import { Pokemon } from './pokemon.interface';
import { PokemonService } from './pokemon.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('api/v1/pokemon')
export class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    listAllPokemon(): Array<Pokemon> {
        return this.pokemonService.listAllPokemons();
    }
}
