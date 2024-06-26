import { type NamedAPIResourceList } from '~/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event) => {
  const response = await $fetch<NamedAPIResourceList>(`https://pokeapi.co/api/v2/pokemon?limit=1008`);
  const pokemon = response.results.map((p, index) => ({ ...p, id: index + 1 }));

  return pokemon;
});
