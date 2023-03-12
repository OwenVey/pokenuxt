import {
  type ChainLinkWithSpecies,
  type PokemonSpecies,
  type ChainLink,
  type EvolutionChain,
  type EvolutionChainWithSpecies,
} from '~/types';
import { getLastSegmentOfUrl } from '@/utils/getLastSegmentOfUrl';

export default defineEventHandler(async (event): Promise<EvolutionChainWithSpecies> => {
  const id = event.context.params?.id;
  if (!id || !isValidId(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: `${id} is not a valid id`,
    });
  }

  const evolutionChain = await $fetch<EvolutionChain>(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
  const ids = getSpeciesIds(evolutionChain.chain);
  const speciesResults = await Promise.all(ids.map((id) => $fetch(`/api/pokemon-species/${id}`)));
  const chainLinkWithSpecies = replaceSpeciesWithData(evolutionChain.chain, speciesResults);

  return { ...evolutionChain, chain: chainLinkWithSpecies };
});

// returns an array of ids of all the pokemon-species found in the evolution-chain request tree
// so that they can all be fetched in parallel instead of fetching as the tree is traversed
function getSpeciesIds(evolution: ChainLink, ids: string[] = []) {
  const speciesId = getLastSegmentOfUrl(evolution.species.url);
  speciesId && ids.push(speciesId);

  if (evolution.evolves_to?.length > 0) {
    evolution.evolves_to.map((e) => getSpeciesIds(e, ids));
  }

  return ids;
}

// replaces the NamedAPIResource "species" the fetched pokemon-species data from the function above
function replaceSpeciesWithData(evolution: ChainLink, species: PokemonSpecies[]) {
  const matchedSpecies = species.find((s) => s.name === evolution.species.name) as PokemonSpecies;

  let chainLinkWithSpecies: ChainLinkWithSpecies[] = [];

  if (evolution.evolves_to?.length > 0) {
    chainLinkWithSpecies = evolution.evolves_to.map((e) => replaceSpeciesWithData(e, species));
  }

  return { ...evolution, evolves_to: chainLinkWithSpecies, species: matchedSpecies };
}
