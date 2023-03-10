<template>
  <TabPanel class="flex flex-grow items-center justify-center">
    <div v-if="evolutionChain" class="flex h-full">
      <Evolution :pokemon="pokemon" :chain-link="evolutionChain.chain" />
    </div>
  </TabPanel>
</template>

<script setup lang="ts">
import { type EvolutionChainWithSpecies, type Pokemon } from '~/types';
import { TabPanel } from '@headlessui/vue';

const props = defineProps<{
  pokemon: Pokemon;
  evolutionChain: EvolutionChainWithSpecies | null;
}>();
</script>
