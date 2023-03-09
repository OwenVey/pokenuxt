<template>
  <dl class="grid grid-cols-[min-content_auto] gap-x-10 gap-y-4">
    <h2 class="col-span-2 font-semibold">General</h2>
    <DescriptionTerm>Category</DescriptionTerm>
    <DescriptionDefinition>
      {{ species?.genera.find((g) => g.language.name === 'en')?.genus.replace(' Pokémon', '') }}
    </DescriptionDefinition>

    <DescriptionTerm>Height</DescriptionTerm>
    <DescriptionDefinition>
      {{ decimetersToFeet(pokemon.height) }} ft ({{ decimetersToMeters(pokemon.height) }} m)
    </DescriptionDefinition>

    <DescriptionTerm>Weight</DescriptionTerm>
    <DescriptionDefinition>
      {{ hectogramsToPounds(pokemon.weight) }} lbs ({{ hectogramsToKilograms(pokemon.weight) }} kg)
    </DescriptionDefinition>

    <DescriptionTerm>Abilities</DescriptionTerm>
    <DescriptionDefinition class="capitalize">
      {{ pokemon.abilities.map((a) => a.ability.name).join(', ') }}
    </DescriptionDefinition>

    <h2 class="col-span-2 mt-6 font-semibold">Breeding</h2>
    <DescriptionTerm>Gender</DescriptionTerm>
    <DescriptionDefinition v-if="species" class="flex items-center">
      <template v-if="species.gender_rate === -1">Unknown</template>
      <template v-else>
        <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11 14.9q-1.975-.35-3.238-1.888T6.5 9.45q0-2.275 1.613-3.862T12 4q2.275 0 3.888 1.588T17.5 9.45q0 2.025-1.263 3.563T13 14.9V17h1q.425 0 .713.288T15 18q0 .425-.288.713T14 19h-1v1q0 .425-.288.713T12 21q-.425 0-.713-.288T11 20v-1h-1q-.425 0-.713-.288T9 18q0-.425.288-.713T10 17h1v-2.1Zm1-1.9q1.45 0 2.475-1.025T15.5 9.5q0-1.45-1.025-2.475T12 6q-1.45 0-2.475 1.025T8.5 9.5q0 1.45 1.025 2.475T12 13Z"
          />
        </svg>
        {{ (species.gender_rate / 8) * 100 }}%
        <svg
          class="ml-4 mr-0.5 text-pink-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.5 20q-2.3 0-3.9-1.6T4 14.5q0-2.3 1.6-3.9T9.5 9q.825 0 1.625.237t1.475.738L16.575 6H15q-.425 0-.713-.288T14 5q0-.425.288-.713T15 4h4q.425 0 .713.288T20 5v4q0 .425-.288.713T19 10q-.425 0-.713-.288T18 9V7.425l-3.975 3.95q.475.7.725 1.488T15 14.5q0 2.3-1.6 3.9T9.5 20Zm0-9q-1.45 0-2.475 1.025T6 14.5q0 1.45 1.025 2.475T9.5 18q1.45 0 2.475-1.025T13 14.5q0-1.45-1.025-2.475T9.5 11Z"
          />
        </svg>
        {{ ((8 - species.gender_rate) / 8) * 100 }}%
      </template>
    </DescriptionDefinition>

    <DescriptionTerm>Egg Groups</DescriptionTerm>
    <DescriptionDefinition class="capitalize">
      {{ species?.egg_groups.map((e) => e.name).join(', ') }}
    </DescriptionDefinition>

    <DescriptionTerm>Steps to Hatch</DescriptionTerm>
    <DescriptionDefinition v-if="species" class="text-sm font-medium text-gray-900">
      {{ 255 * (species?.hatch_counter + 1) }} steps
    </DescriptionDefinition>
  </dl>
</template>

<script setup lang="ts">
import { type PokemonSpecies, type Pokemon } from '~/types';

const props = defineProps<{
  pokemon: Pokemon;
  species: PokemonSpecies | null;
}>();

const hectogramsToPounds = (hectograms: number) => {
  return (hectograms / 4.536).toFixed(1);
};

const hectogramsToKilograms = (hectograms: number) => {
  return (hectograms / 10).toFixed(1);
};

const decimetersToFeet = (decimeters: number) => {
  const inches = decimeters * 3.937;

  return `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`;
};

const decimetersToMeters = (decimeters: number) => {
  return (decimeters / 10).toFixed(1);
};
</script>
