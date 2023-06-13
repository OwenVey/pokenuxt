<template>
  <NuxtLink :to="`/${chainLink.species.id}`" class="flex w-full flex-col items-center justify-center sm:flex-row">
    <div
      v-if="chainLink.species.evolves_from_species"
      class="center grid grid-cols-3 sm:mx-4 sm:grid-flow-col sm:grid-cols-1 sm:grid-rows-3"
    >
      <NuxtImg
        v-if="chainLink.evolution_details[0]?.item"
        :height="30"
        :width="30"
        class="m-auto"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${chainLink.evolution_details[0].item.name}.png`"
      />
      <div v-else></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="m-auto my-4 h-6 w-6 text-gray-400 sm:mx-4 sm:my-0 sm:-rotate-90"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
      </svg>
      <div v-if="chainLink.evolution_details[0]?.min_level" class="m-auto text-xs font-semibold text-gray-900">
        Lvl {{ chainLink.evolution_details[0]?.min_level }}
      </div>
      <div v-else></div>
    </div>

    <div class="flex flex-col items-center justify-center">
      <NuxtImg
        class=""
        :height="80"
        :width="80"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chainLink.species.id}.png`"
      />

      <div
        class="mt-1 border-b-2 text-sm font-semibold capitalize text-gray-900"
        :style="{ borderColor: chainLink.species.id === pokemon.id ? getTypeColorFromPokemon(pokemon) : 'transparent' }"
      >
        {{ chainLink.species.name }}
      </div>
    </div>

    <div class="flex flex-row gap-10 sm:flex-col">
      <Evolution
        v-for="evolvesTo of chainLink.evolves_to"
        :key="evolvesTo.species.id"
        :pokemon="pokemon"
        :chain-link="evolvesTo"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { type ChainLinkWithSpecies, type Pokemon } from '~/types';

const props = defineProps<{
  pokemon: Pokemon;
  chainLink: ChainLinkWithSpecies;
}>();
</script>
