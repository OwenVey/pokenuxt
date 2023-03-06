<template>
  <form class="m-10 w-72" @submit.prevent="() => navigateTo(`/player/${tag}`)">
    <label for="tag" class="block text-sm font-medium leading-6 text-gray-900">Player Tag</label>
    <input
      id="tag"
      v-model="tag"
      name="tag"
      type="text"
      class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="QC88QVP"
    />
    <button
      type="submit"
      class="rounded-md bg-indigo-600 py-1.5 px-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Search
    </button>
  </form>
</template>

<script setup lang="ts">
const tag = ref('QC88QVP');
</script>
