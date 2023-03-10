import { type Pokemon } from '~/types';

export function getTypeColor(pokemon: Pokemon | null, type: 'default' | 'light' | 'dark' = 'default') {
  if (pokemon === null) {
    return `var(--normal-default)`;
  } else {
    return `var(--${pokemon.types[0].type.name}-${type})`;
  }
}
