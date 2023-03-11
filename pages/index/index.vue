<template>
  <div v-if="pending">Loading...</div>

  <div v-else-if="error">{{ error }}</div>

  <div v-else-if="allPokemon" class="flex h-full flex-col px-4 pt-4">
    <input
      v-model="search"
      type="text"
      class="mb-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
      placeholder="Search pokemon..."
    />

    <UseVirtualList
      :list="filteredPokemon"
      :options="{ itemHeight: 158, overscan: 5 }"
      height="initial"
      class="flex-grow"
    >
      <template #="{ data: pokemonRow }: { data: { id: number, name: string, url: string }[] }">
        <div class="grid gap-x-4" :class="`grid-cols-${chunkSize}`">
          <NuxtLink
            v-for="pokemon of pokemonRow"
            :key="pokemon.id"
            :to="`/${pokemon.id}`"
            class="mb-4 flex flex-1 flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-100 py-4 transition duration-150 hover:bg-gray-200"
          >
            <NuxtImg
              class="pointer-events-none h-20 w-20"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
            />
            <div class="mt-1 font-semibold capitalize text-gray-700">{{ pokemon.name }}</div>
            <span class="text-xs text-gray-600">#{{ pokemon.id }}</span>
          </NuxtLink>
        </div>
      </template>
    </UseVirtualList>
  </div>
</template>

<script setup lang="ts">
import { UseVirtualList } from '@vueuse/components';
import { breakpointsTailwind } from '@vueuse/core';

const search = ref('');
const { sm, lg } = useBreakpoints(breakpointsTailwind);

const chunkSize = computed(() => {
  if (lg.value) {
    return 6;
  } else if (sm.value) {
    return 4;
  } else {
    return 2;
  }
});

const {
  data: allPokemon,
  pending,
  error,
} = await useFetch('/api/pokemon', {
  key: 'all-pokemon',
});

const filteredPokemon = computed(() => {
  let pokemon = allPokemon.value || [];
  if (search.value) {
    pokemon = pokemon.filter((p) => p.name.includes(search.value.toLowerCase()));
  }
  return chunkArray(pokemon, chunkSize.value);
});
</script>
