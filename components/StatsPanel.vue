<template>
  <TabPanel>
    <div class="grid grid-cols-[min-content_min-content_auto] items-center gap-x-4 gap-y-3">
      <template v-for="stat of pokemon.stats" :key="stat.stat.name">
        <div class="whitespace-nowrap text-sm font-medium text-gray-500">
          {{ formattedStatName[stat.stat.name] }}
        </div>

        <div class="text-right text-sm font-semibold text-gray-900">{{ stat.base_stat }}</div>

        <ProgressBar :value="stat.base_stat" :max="progressBarMax" :color="getTypeColorFromPokemon(pokemon)" />
      </template>

      <div class="whitespace-nowrap text-sm font-medium text-gray-500">Total</div>

      <div class="text-right text-sm font-semibold text-gray-900">
        {{ summedStats }}
      </div>

      <ProgressBar
        :value="summedStats"
        :max="pokemon.stats.length * progressBarMax"
        :color="getTypeColorFromPokemon(pokemon)"
      />
    </div>
  </TabPanel>
</template>

<script setup lang="ts">
import { type Pokemon } from '~/types';
import { TabPanel } from '@headlessui/vue';

const progressBarMax = 150;

const formattedStatName: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

const props = defineProps<{
  pokemon: Pokemon;
}>();

const summedStats = computed(() => props.pokemon.stats.reduce((sum, { base_stat }) => sum + base_stat, 0));
</script>
