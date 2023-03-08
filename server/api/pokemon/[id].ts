import { type Pokemon } from '~/types';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  return await $fetch<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
});
