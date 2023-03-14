<template>
  <TabPanel>
    <h2 class="font-semibold">Base Stats</h2>
    <div class="mt-6 grid grid-cols-[min-content_min-content_auto] items-center gap-x-4 gap-y-3">
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

    <h2 class="mt-10 font-semibold">Matchups</h2>
    <p class="mb-6 text-sm text-gray-500">
      The effectiveness of each type against <span class="capitalize">{{ pokemon.name }}</span>
    </p>
    <div class="flex flex-wrap gap-1.5">
      <div
        v-for="matchup in matchups"
        :key="matchup.type"
        :style="{
          backgroundColor: getTypeColor(matchup.type, 'dark'),
        }"
        class="inline-flex rounded-full px-4 py-2 text-sm font-medium text-white/90"
      >
        <span class="capitalize">{{ matchup.type }}</span>
        <span class="ml-1">{{ matchup.multiplier }}x</span>
      </div>
    </div>
  </TabPanel>
</template>

<script setup lang="ts">
import { type Pokemon, types, Type } from '~/types';
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

const matchups = computed(() =>
  types
    .map((type) => ({
      type,
      multiplier: typeAdvantageLookup(
        props.pokemon.types.map((t) => t.type.name as Type),
        type
      ),
    }))
    .sort((a, b) => b.multiplier - a.multiplier)
);
</script>
