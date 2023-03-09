import { type PokemonSpecies } from '~/types';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  return await $fetch<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
});
