<template>
  <div class="p-4">
    <div v-if="allPokemon">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <NuxtLink
          v-for="(pokemon, index) in allPokemon"
          :key="pokemon.name"
          :to="`/${index + 1}`"
          class="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-100 py-4 transition duration-150 hover:scale-105 hover:bg-gray-200"
        >
          <NuxtImg
            class="h-20 w-20"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`"
          />
          <div class="mt-1 font-semibold capitalize text-gray-700">{{ pokemon.name }}</div>
          <span class="text-xs text-gray-600">#{{ index + 1 }}</span>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="pending">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { type NamedAPIResource } from '~/types';

const { data: allPokemon, pending } = useFetch<NamedAPIResource[]>('/api/pokemon', { key: 'all-pokemon' });
</script>
