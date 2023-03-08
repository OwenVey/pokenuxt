<template>
  <div class="p-4">
    <div v-if="allPokemon">
      <input
        v-model="search"
        type="text"
        class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
        placeholder="Search pokemon..."
      />
      <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <NuxtLink
          v-for="pokemon in filteredPokemon"
          :key="pokemon.name"
          :to="`/${pokemon.id}`"
          class="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-100 py-4 transition duration-150 hover:scale-105 hover:bg-gray-200"
        >
          <NuxtImg
            class="h-20 w-20"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
          />
          <div class="mt-1 font-semibold capitalize text-gray-700">{{ pokemon.name }}</div>
          <span class="text-xs text-gray-600">#{{ pokemon.id }}</span>
        </NuxtLink>
      </div>
    </div>

    <div v-else-if="pending">Loading...</div>
  </div>
</template>

<script setup lang="ts">
const search = ref('');

const { data: allPokemon, pending } = useFetch('/api/pokemon', { key: 'all-pokemon' });
const filteredPokemon = useArrayFilter(allPokemon.value ?? [], (i) =>
  i.name.toLowerCase().includes(search.value.toLowerCase())
);
</script>
