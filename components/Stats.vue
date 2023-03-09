<template>
  <div class="flex flex-col justify-center space-y-2 rounded-2xl">
    <div v-for="stat of pokemon.stats" :key="stat.stat.name" class="flex items-center">
      <div class="min-w-[5rem] whitespace-nowrap text-sm font-medium text-gray-500">
        {{ formattedStatName[stat.stat.name] }}
      </div>

      <div class="mx-8 text-sm font-semibold text-gray-900">{{ stat.base_stat }}</div>

      <div class="h-2 w-full rounded-full bg-gray-300">
        <div
          class="h-2 rounded-full"
          :style="{ width: `${(stat.base_stat / progressBarMax) * 100}%`, backgroundColor: getTypeColor(pokemon) }"
        ></div>
      </div>
    </div>

    <div class="flex items-center">
      <div class="min-w-[5rem] whitespace-nowrap text-sm font-medium text-gray-500">Total</div>

      <div class="mx-8 text-sm font-semibold text-gray-900">
        {{ summedStats }}
      </div>

      <div class="h-2 w-full rounded-full bg-gray-300">
        <div
          class="h-2 rounded-full"
          :style="{
            width: `${(summedStats / (pokemon.stats.length * progressBarMax)) * 100}%`,
            backgroundColor: getTypeColor(pokemon),
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Pokemon } from '~/types';

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
