export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  const player = await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  return player;
});
