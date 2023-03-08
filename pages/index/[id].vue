<template>
  <main>
    <NuxtLink to="/">All Pokemon</NuxtLink>
    <div v-if="pending">Loading...</div>

    <div v-else-if="pokemon">
      <Button @click="navigateTo(`/${pokemon!.id - 1}`)"> Previous </Button>
      <Button class="ml-2" @click="navigateTo(`/${pokemon!.id + 1}`)"> Next </Button>
      <h1 class="text-5xl font-extrabold capitalize text-gray-900/70">{{ pokemon.name }}</h1>
      <div class="mt-4 grid grid-cols-4 gap-4">
        <div class="flex h-60 items-center justify-center rounded-2xl border bg-gray-100 backdrop-blur-lg">
          <NuxtImg
            class="h-auto w-44"
            :src="pokemon.sprites.other['official-artwork'].front_default"
            alt="Front of pokemon"
          />
        </div>
        <div class="col-span-3 flex flex-col justify-center rounded-2xl border bg-gray-100 p-4 backdrop-blur-lg">
          <h2 class="text-lg font-bold text-gray-700">Stats</h2>
          <div v-for="stat of pokemon.stats" :key="stat.stat.name" class="flex items-center space-y-1">
            <label class="w-28 whitespace-nowrap text-sm font-medium capitalize text-gray-700" :for="stat.stat.name">{{
              stat.stat.name.replace('special-', 'sp. ')
            }}</label>

            <div class="h-3 w-full rounded-full bg-gray-700">
              <div class="h-3 rounded-full bg-primary-500" :style="{ width: `${(stat.base_stat / 255) * 100}%` }"></div>
            </div>

            <span class="ml-2 w-8 font-mono font-semibold text-gray-700">{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: pokemon, pending } = useFetch(`/api/pokemon/${route.params.id}`);
</script>
