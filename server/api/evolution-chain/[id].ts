import { ChainLinkWithSpecies, type ChainLink, type EvolutionChain, type EvolutionChainWithSpecies } from '~/types';
import { getLastSegmentOfUrl } from '@/utils/getLastSegmentOfUrl';

export default defineEventHandler(async (event): Promise<EvolutionChainWithSpecies> => {
  const id = event.context.params?.id;
  const evolutionChain = await $fetch<EvolutionChain>(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  return { ...evolutionChain, chain: await recursivelyfetchSpecies(evolutionChain.chain) };
});

async function recursivelyfetchSpecies(evolution: ChainLink): Promise<ChainLinkWithSpecies> {
  const speciesId = getLastSegmentOfUrl(evolution.species.url);
  const species = await $fetch(`/api/pokemon-species/${speciesId}`);

  evolution.species = species;

  if (evolution.evolves_to?.length > 0) {
    await Promise.all(evolution.evolves_to.map(recursivelyfetchSpecies));
  }

  return evolution;
}
