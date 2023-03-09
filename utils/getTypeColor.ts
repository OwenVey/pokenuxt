import { type Pokemon } from '~/types';

export default function getTypeColor(pokemon: Pokemon | null) {
  if (pokemon === null) {
    return `var(--normal)`;
  } else {
    return `var(--${pokemon.types[0].type.name})`;
  }
}
