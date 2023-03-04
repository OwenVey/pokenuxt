export default defineEventHandler(async (event) => {
  const tag = event.context.params?.tag;
  const { apiKey } = useRuntimeConfig();

  const player = await $fetch(`https://api.brawlstars.com/v1/players/%23${tag}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return player;
});
