<template>
  <main class="h-full">
    <div v-if="pending">Loading...</div>

    <div v-else-if="pokemon" class="flex h-full flex-col">
      <div
        class="px-4 pt-4"
        :style="{
          backgroundColor: getTypeColorFromPokemon(pokemon),
          backgroundImage: `radial-gradient(circle at 50% 75%, ${getTypeColorFromPokemon(
            pokemon,
            'light'
          )}, ${getTypeColorFromPokemon(pokemon, 'dark')} 100%)`,
        }"
      >
        <header class="flex justify-between text-white">
          <NuxtLink class="flex items-center" to="/">
            <ChevronLeft />
            All
          </NuxtLink>
          <Heart />
        </header>

        <div class="mt-2 flex flex-col">
          <h1 class="text-3xl font-semibold capitalize text-white">{{ pokemon.name }}</h1>
          <span
            class="font-medium"
            :style="{
              color: getTypeColorFromPokemon(pokemon, 'text-light'),
            }"
            >#{{ String(pokemon.id).padStart(4, '0') }}</span
          >
        </div>

        <div class="-mt-8 flex w-full items-center justify-between">
          <NuxtLink
            :to="`/${pokemon.id - 1}`"
            class="flex items-center justify-center rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/40"
            :class="pokemon.id === 1 && 'invisible'"
          >
            <ChevronLeft />
          </NuxtLink>

          <NuxtImg
            class="z-10"
            :width="256"
            :height="256"
            :src="
              pokemon.sprites.other['home']?.front_default || pokemon.sprites.other['official-artwork'].front_default
            "
            alt="Front of pokemon"
          />

          <NuxtLink
            :to="`/${pokemon.id + 1}`"
            class="flex items-center justify-center rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30"
            :class="pokemon.id === 1008 && 'invisible'"
          >
            <ChevronRight />
          </NuxtLink>
        </div>
      </div>

      <TabGroup
        :selected-index="selectedTab"
        class="-mt-8 flex flex-grow flex-col overflow-y-auto rounded-t-3xl bg-white px-4 pt-4"
        as="div"
        @change="changeTab"
      >
        <TabList class="mt-4 flex space-x-1 rounded-xl bg-gray-200 p-1">
          <Tab
            v-for="tabLabel in ['About', 'Stats', 'Evolution', 'Moves']"
            :key="tabLabel"
            v-slot="{ selected }"
            as="template"
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

        <TabPanels class="flex flex-grow flex-col overflow-y-auto px-2 py-4">
          <AboutPanel :pokemon="pokemon" :species="species" />
          <StatsPanel :pokemon="pokemon" />
          <EvolutionPanel :pokemon="pokemon" :evolution-chain="evolutionChain" />
          <MovesPanel :pokemon="pokemon" />
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
import { TabGroup, TabList, Tab, TabPanels } from '@headlessui/vue';
import { type EvolutionChainWithSpecies } from '~/types';

const route = useRoute();
const selectedTab = useState('selectedTab', () => 0);

function changeTab(index: number) {
  selectedTab.value = index;
}

const {
  data: pokemon,
  pending,
  error,
} = await useFetch(`/api/pokemon/${route.params.id}`, {
  key: `pokemon-${route.params.id}`,
});
const { data: species } = await useLazyFetch(`/api/pokemon-species/${pokemon.value?.species.name}`, {
  key: `pokemon-species-${pokemon.value?.species.name}`,
});

watch(species, (newSpecies) => {
  if (newSpecies) {
    const evolutionChainId = getLastSegmentOfUrl(species.value?.evolution_chain.url);
    if (evolutionChainId) {
      fetchEvolutionChain(evolutionChainId);
    }
  }
});

const evolutionChain = ref<EvolutionChainWithSpecies | null>(null);

const fetchEvolutionChain = async (id: string) => {
  evolutionChain.value = await $fetch<EvolutionChainWithSpecies>(`/api/evolution-chain/${id}`);
};

// const { data: evolutionChain } = await useLazyFetch(
//   `/api/evolution-chain/${getLastSegmentOfUrl(species.value?.evolution_chain.url)}`,
//   {
//     immediate: false,
//     watch: [species],
//     key: `evolution-chain-${getLastSegmentOfUrl(species.value?.evolution_chain.url)}`,
//   }
// );
</script>
