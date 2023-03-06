<template>
  <main>
    <div v-if="pending">Loading...</div>
    <pre v-else>{{ player }}</pre>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: player, pending } = await useLazyFetch(`/api/player/${route.params.tag}`);
</script>
