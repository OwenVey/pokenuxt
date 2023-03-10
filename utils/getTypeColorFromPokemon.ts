import { type Pokemon, type ColorVariant } from '~/types';

export function getTypeColorFromPokemon(pokemon: Pokemon | null, variant: ColorVariant = 'default') {
  if (pokemon === null) {
    return `var(--normal-default)`;
  } else {
    return getTypeColor(pokemon.types[0].type.name, variant);
  }
}
