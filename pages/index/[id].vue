<template>
  <main class="px-4 pt-4" :style="{ backgroundColor: typeColor }">
    <header class="flex justify-between text-white">
      <NuxtLink class="flex items-center" to="/">
        <ChevronLeft />
        <span class="font-medium">All</span>
      </NuxtLink>
      <Heart />
    </header>
    <div v-if="pending">Loading...</div>

    <template v-else-if="pokemon">
      <div class="mt-2 flex items-center justify-between">
        <h1 class="text-3xl font-semibold capitalize text-white">{{ pokemon.name }}</h1>
        <span class="text-white">#{{ pokemon.id }}</span>
      </div>

      <div class="flex w-full items-center justify-between">
        <NuxtLink
          :to="`/${pokemon.id - 1}`"
          class="flex items-center justify-center rounded-full bg-white/30 p-3 text-white hover:bg-white/40"
          :class="pokemon.id === 1 && 'invisible'"
        >
          <ChevronLeft />
        </NuxtLink>

        <NuxtImg
          class="translate-y-5"
          :width="176"
          :height="176"
          :src="pokemon.sprites.other['official-artwork'].front_default"
          alt="Front of pokemon"
        />

        <NuxtLink
          :to="`/${pokemon.id + 1}`"
          class="flex items-center justify-center rounded-full bg-white/30 p-3 text-white hover:bg-white/40"
          :class="pokemon.id === 1008 && 'invisible'"
        >
          <ChevronRight />
        </NuxtLink>
      </div>

      <TabGroup class="-mx-4 rounded-t-3xl bg-white p-4" as="div">
        <TabList class="flex space-x-1 rounded-xl bg-gray-200 p-1">
          <Tab
            v-for="category in ['About', 'Stats', 'Evolution', 'Moves']"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              :class="[
                'w-full rounded-lg py-2 text-sm font-medium leading-5 text-gray-900',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-900 focus:outline-none focus:ring-2',
                selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-800',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel>About content</TabPanel>
          <TabPanel>
            <div class="flex flex-col justify-center space-y-2 rounded-2xl">
              <div v-for="stat of pokemon.stats" :key="stat.stat.name" class="flex items-center">
                <div
                  class="min-w-[5rem] whitespace-nowrap text-sm font-medium capitalize text-gray-500"
                  :for="stat.stat.name"
                >
                  {{ stat.stat.name.replace('special-', 'sp. ') }}
                </div>

                <div class="mx-8 text-sm font-semibold text-gray-900">{{ stat.base_stat }}</div>

                <div class="h-2 w-full rounded-full bg-gray-300">
                  <div
                    class="h-2 rounded-full"
                    :style="{ width: `${(stat.base_stat / 150) * 100}%`, backgroundColor: typeColor }"
                  ></div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>Evolution content</TabPanel>
          <TabPanel>Moves content</TabPanel>
        </TabPanels>
      </TabGroup>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Heart } from 'lucide-vue-next';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

const route = useRoute();

const typeColor = computed(() => `var(--${pokemon.value?.types[0].type.name})`);

const { data: pokemon, pending } = useFetch(`/api/pokemon/${route.params.id}`, { key: `pokemon-${route.params.id}` });

const categories = ref({
  Recent: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Popular: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Trending: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
});
</script>
