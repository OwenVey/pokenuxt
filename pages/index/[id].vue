<template>
  <main>
    <div v-if="pending">Loading...</div>

    <div v-else-if="pokemon" class="">
      <div
        class="px-4 pt-4"
        :style="{
          backgroundColor: getTypeColor(pokemon),
          backgroundImage: `radial-gradient(circle at 50% 75%, ${getTypeColor(pokemon, 'light')}, ${getTypeColor(
            pokemon,
            'dark'
          )} 100%)`,
        }"
      >
        <header class="flex justify-between text-white">
          <NuxtLink class="flex items-center" to="/">
            <ChevronLeft />
            <span class="font-medium">All</span>
          </NuxtLink>
          <Heart />
        </header>

        <div class="mt-2 flex items-center justify-between">
          <h1 class="text-3xl font-semibold capitalize text-white">{{ pokemon.name }}</h1>
          <span class="text-white">#{{ pokemon.id }}</span>
        </div>

        <div class="flex w-full items-center justify-between">
          <NuxtLink
            :to="`/${pokemon.id - 1}`"
            class="mb-8 flex items-center justify-center rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/40"
            :class="pokemon.id === 1 && 'invisible'"
          >
            <ChevronLeft />
          </NuxtLink>

          <NuxtImg
            class="z-10"
            :width="176"
            :height="176"
            :src="
              pokemon.sprites.other['home']?.front_default || pokemon.sprites.other['official-artwork'].front_default
            "
            alt="Front of pokemon"
          />

          <NuxtLink
            :to="`/${pokemon.id + 1}`"
            class="mb-8 flex items-center justify-center rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30"
            :class="pokemon.id === 1008 && 'invisible'"
          >
            <ChevronRight />
          </NuxtLink>
        </div>
      </div>

      <TabGroup class="-translate-y-8 rounded-t-3xl bg-white p-4" as="div">
        <TabList class="mt-4 flex space-x-1 rounded-xl bg-gray-200 p-1">
          <Tab
            v-for="tabLabel in ['About', 'Stats', 'Evolution', 'Moves']"
            as="template"
            :key="tabLabel"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'w-full rounded-lg py-2 text-sm font-medium leading-5 text-gray-900',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-900 focus:outline-none',
                selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-800',
              ]"
            >
              {{ tabLabel }}
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-4 px-2">
          <TabPanel>
            <About :pokemon="pokemon" :species="species" />
          </TabPanel>
          <TabPanel>
            <Stats :pokemon="pokemon" />
          </TabPanel>
          <TabPanel>Evolution content</TabPanel>
          <TabPanel>Moves content</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <div v-else-if="error">
      <h1>Pokemon with id {{ route.params.id }} does not exist</h1>
      {{ error }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Heart } from 'lucide-vue-next';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const route = useRoute();

const {
  data: pokemon,
  pending,
  error,
} = await useFetch(`/api/pokemon/${route.params.id}`, {
  key: `pokemon-${route.params.id}`,
});
const { data: species } = useFetch(`/api/pokemon-species/${pokemon.value?.species.name}`, {
  key: `pokemon-species-${pokemon.value?.species.name}`,
});
</script>
