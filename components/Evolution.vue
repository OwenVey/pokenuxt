<template>
  <pre v-if="evolutionChain">
    {{ evolutionChain }}
  </pre>
</template>

<script setup lang="ts">
import { type EvolutionChainWithSpecies } from '~/types';

const props = defineProps<{
  evolutionChain: EvolutionChainWithSpecies | null;
}>();
</script>
