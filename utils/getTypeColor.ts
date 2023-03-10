import { type ColorVariant } from '~/types';

export function getTypeColor(type: string, variant: ColorVariant = 'default') {
  return `var(--${type}-${variant})`;
}
