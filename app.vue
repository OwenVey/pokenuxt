<template>
  <main>
    <form class="m-10 w-72" @submit.prevent="getPlayer">
      <label for="tag" class="block text-sm font-medium leading-6 text-gray-900">Player Tag</label>
      <input
        id="tag"
        v-model="tag"
        name="tag"
        type="text"
        class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="you@example.com"
      />
    </form>
    <pre>{{ player }}</pre>
  </main>
</template>

<script setup lang="ts">
const tag = ref('QC88QVP');
const player = ref(null);

const getPlayer = async () => {
  player.value = await $fetch(`/api/player/${tag.value}`);
};
</script>
