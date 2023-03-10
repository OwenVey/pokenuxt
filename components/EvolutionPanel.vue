<template>
  <div v-if="evolutionChain" class="flex h-full">
    <Evolution :pokemon="pokemon" :chain-link="evolutionChain.chain" />
  </div>
</template>

<script setup lang="ts">
import { type EvolutionChainWithSpecies, type Pokemon } from '~/types';

const props = defineProps<{
  pokemon: Pokemon;
  evolutionChain: EvolutionChainWithSpecies | null;
}>();
</script>
