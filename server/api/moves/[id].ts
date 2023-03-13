import { type Move } from '~/types';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  return await $fetch<Move>(`https://pokeapi.co/api/v2/move/${id}`);
});
