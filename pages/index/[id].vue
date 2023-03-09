<template>
  <main class="">
    <header class="flex justify-between p-4 text-white" :style="{ backgroundColor: typeColor }">
      <NuxtLink class="flex items-center" to="/">
        <ChevronLeft />
        <span class="font-medium">All</span>
      </NuxtLink>
      <Heart />
    </header>
    <div v-if="pending">Loading...</div>

    <template v-else-if="pokemon">
      <div class="px-4 pb-10" :style="{ backgroundColor: typeColor }">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-semibold capitalize text-white">{{ pokemon.name }}</h1>
          <span class="text-white">#{{ pokemon.id }}</span>
        </div>
      </div>
      <div class="h-20 rounded-b-[100%]" :style="{ backgroundColor: typeColor }"></div>
      <div class="-mb-28 flex w-full -translate-y-28 items-center justify-between px-4">
        <NuxtLink
          :to="`/${pokemon.id - 1}`"
          class="flex items-center justify-center rounded-full bg-gray-100/50 p-3 text-gray-700 backdrop-blur"
        >
          <ChevronLeft />
        </NuxtLink>

        <NuxtImg
          :width="176"
          :height="176"
          :src="pokemon.sprites.other['official-artwork'].front_default"
          alt="Front of pokemon"
        />

        <NuxtLink
          :to="`/${pokemon.id + 1}`"
          class="flex items-center justify-center rounded-full bg-gray-100/50 p-3 text-gray-700 backdrop-blur"
        >
          <ChevronRight />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 gap-4 px-4">
        <div class="flex flex-col justify-center rounded-2xl border bg-gray-100 p-4 backdrop-blur-lg">
          <h2 class="mb-1 font-semibold text-gray-900">Stats</h2>
          <div v-for="stat of pokemon.stats" :key="stat.stat.name" class="flex items-center space-y-1">
            <label class="w-28 whitespace-nowrap text-sm font-medium capitalize text-gray-700" :for="stat.stat.name">{{
              stat.stat.name.replace('special-', 'sp. ')
            }}</label>

            <div class="h-2 w-full rounded-full bg-gray-300">
              <div
                class="h-2 rounded-full"
                :style="{ width: `${(stat.base_stat / 255) * 100}%`, backgroundColor: typeColor }"
              ></div>
            </div>

            <span class="ml-2 w-8 font-mono font-semibold text-gray-700">{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Heart } from 'lucide-vue-next';
const route = useRoute();

const typeColor = computed(() => `var(--${pokemon.value?.types[0].type.name})`);

const { data: pokemon, pending } = useFetch(`/api/pokemon/${route.params.id}`, { key: `pokemon-${route.params.id}` });
</script>
