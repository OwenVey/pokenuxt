<template>
  <div v-if="allPokemon">
    <div v-for="pokemon of allPokemon" :key="pokemon.name">
      <NuxtLink :to="`/${pokemon.name}`">
        {{ pokemon.name }}
      </NuxtLink>
    </div>
  </div>

  <div v-else-if="pending">Loading...</div>
</template>

<script setup lang="ts">
import { type NamedAPIResource } from '~/types';
const { data: allPokemon, pending } = useFetch<NamedAPIResource[]>('/api/pokemon');
</script>
