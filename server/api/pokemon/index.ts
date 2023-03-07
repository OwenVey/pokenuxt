import { type NamedAPIResourceList } from '~/types';

export default defineEventHandler(async (event) => {
  const pokemon = await $fetch<NamedAPIResourceList>(`https://pokeapi.co/api/v2/pokemon?limit=100000`);

  return pokemon.results;
});
