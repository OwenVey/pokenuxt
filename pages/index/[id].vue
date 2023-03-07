<template>
  <main class="mx-auto max-w-5xl sm:px-6 lg:px-8">
    <NuxtLink to="/">All Pokemon</NuxtLink>
    <Button @click="navigateTo(`/pokemon/${+route.params.id - 1}`)"> Previous </Button>
    <Button class="ml-2" @click="navigateTo(`/pokemon/${+route.params.id + 1}`)"> Next </Button>

    <div v-if="pending">Loading...</div>

    <div v-else-if="pokemon">
      <h1 class="text-7xl font-black capitalize text-gray-900/70">{{ pokemon.name }}</h1>
      <div class="mt-4 grid grid-cols-4 gap-4">
        <div class="flex h-60 items-center justify-center rounded-2xl bg-white/70 backdrop-blur-lg">
          <NuxtImg
            ref="pokemonImg"
            class="h-auto w-44"
            :src="pokemon.sprites.other['official-artwork'].front_default"
            alt="Front of pokemon"
            @load="onImgLoad"
          />
        </div>
        <div class="col-span-3 flex flex-col justify-center rounded-2xl bg-white/70 p-4 backdrop-blur-lg">
          <h2 class="text-lg font-bold text-gray-700">Stats</h2>
          <div v-for="stat of pokemon.stats" :key="stat.stat.name" class="flex items-center space-y-1">
            <label class="w-28 whitespace-nowrap text-sm font-medium capitalize text-gray-700" :for="stat.stat.name">{{
              stat.stat.name.replace('special-', 'sp. ')
            }}</label>

            <div class="h-3 w-full rounded-full bg-gray-700">
              <div
                class="h-3 rounded-full"
                :style="{ width: `${(stat.base_stat / 255) * 100}%`, backgroundColor: mainColor }"
              ></div>
            </div>

            <span class="ml-2 w-8 font-mono font-semibold text-gray-700">{{ stat.base_stat }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { type Pokemon } from '~/types';
import ColorThief from 'colorthief';

const route = useRoute();
const pokemonImg = ref<HTMLImageElement | null>(null);
const mainColor = ref('transparent');

const { data: pokemon, pending } = useFetch<Pokemon>(`/api/pokemon/${route.params.id}`);

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

const onImgLoad = () => {
  const imgEl = unrefElement(pokemonImg);

  if (imgEl) {
    const colorThief = new ColorThief();
    imgEl.crossOrigin = 'Anonymous';
    const [r, g, b] = colorThief.getColor(imgEl);

    const [h, s, l] = rgbToHsl(r, g, b);

    console.log({ h, s, l });
    // document.body.style.backgroundColor = `hsl(${h} ${s}% ${l}% / .5)`;
    mainColor.value = `hsl(${h} ${s}% ${l}%)`;
    document.body.style.backgroundImage = `linear-gradient(45deg, hsla(${h}deg ${s}% ${l}% / .5) 0%, hsla(${h}deg 100% 50% / .5) 100%)`;
  }
};
</script>

<style>
body {
  /* background-image: linear-gradient(55deg, hsl(244deg 100% 20%) 0%, hsl(234deg 66% 41%) 50%, hsl(223deg 100% 59%) 100%); */
}
</style>
