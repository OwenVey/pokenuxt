<template>
  <div class="h-2 w-full rounded-full bg-gray-300">
    <ClientOnly>
      <Transition appear @after-appear="percentage = (value / max) * 100">
        <div
          class="h-2 rounded-full bg-primary-500 transition-width duration-150"
          :style="{
            width: `${percentage}%`,
            backgroundColor: color,
          }"
        ></div>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number;
  max: number;
  color?: string;
}>();

const percentage = ref(0);
</script>
