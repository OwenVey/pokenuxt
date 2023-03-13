import { type ColorVariant } from '~/types';

export function getTypeColor(pokemonType: string, variant: ColorVariant = 'default') {
  return `var(--${pokemonType}-${variant})`;
}
