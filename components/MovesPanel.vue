<template>
  <TabPanel>
    <label for="version-group" class="block text-sm font-medium leading-6 text-gray-900">Game Version</label>
    <select
      id="version-group"
      v-model="selectedVersion"
      name="version-group"
      class="block rounded-md border-0 py-1.5 pl-3 pr-10 capitalize text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
    >
      <option v-for="versionGroup in versionGroups" :key="versionGroup" :value="versionGroup" class="capitalize">
        {{ versionGroup }}
      </option>
    </select>

    <div v-for="[learnMethod, moveList] in movesByVersionGroup" :key="learnMethod">
      <h3 class="mt-6 font-semibold capitalize">{{ learnMethod }}</h3>
      <ul class="">
        <li
          v-for="move in moveList"
          :key="move.name"
          class="my-2 grid grid-cols-3 items-center gap-x-4 rounded-lg border bg-gray-50 p-2"
        >
          <div class="flex items-center">
            <NuxtImg
              :src="`/images/moves/${move.type.name}.png`"
              :alt="`${move.type.name} move`"
              :height="32"
              :width="32"
            />
            <div class="ml-2 whitespace-nowrap text-sm font-medium capitalize text-gray-900">
              {{ move.name.replace('-', ' ') }}
            </div>
          </div>
          <!-- <p v-if="move.effect_entries[0]?.effect" class="text-xs">{{ move.effect_entries[0].short_effect }}</p> -->

          <div class="flex gap-x-4">
            <div>
              <div class="text-xs text-gray-500">Power</div>
              <div class="text-sm font-medium">{{ move.power || '—' }}</div>
            </div>

            <div>
              <div class="text-xs text-gray-500">Accuracy</div>
              <div class="text-sm font-medium">{{ move.accuracy || '—' }}</div>
            </div>

            <div>
              <div class="text-xs text-gray-500">PP</div>
              <div class="text-sm font-medium">{{ move.pp || '—' }}</div>
            </div>
          </div>

          <div v-if="learnMethod === 'level-up'">{{ move.level_learned_at }}</div>
        </li>
      </ul>
    </div>
  </TabPanel>
</template>

<script setup lang="ts">
import { type Pokemon, type VersionGroup, type Move, versionGroups } from '~/types';
import { TabPanel } from '@headlessui/vue';

interface FormattedMove extends Move {
  move_learn_method: string;
  level_learned_at: number;
  version_group: string;
}
const props = defineProps<{
  pokemon: Pokemon;
}>();

const moveUrls = props.pokemon.moves.map((move) => $fetch<Move>(move.move.url));
// const moveUrls = props.pokemon.moves.map((move) => $fetch(`/api/moves/${getLastSegmentOfUrl(move.move.url)}`));

const movesData = await Promise.all(moveUrls);

const selectedVersion = ref<VersionGroup>('sword-shield');

const movesByVersionGroup = computed(() => {
  const moves = props.pokemon.moves
    .filter((move) =>
      move.version_group_details.find((versionGroup) => versionGroup.version_group.name === selectedVersion.value)
    )
    .map((move) => {
      const moveVersionGroupDetails = move.version_group_details.find(
        (details) => details.version_group.name === selectedVersion.value
      )!;

      return {
        move_learn_method: moveVersionGroupDetails.move_learn_method.name,
        level_learned_at: moveVersionGroupDetails.level_learned_at,
        version_group: moveVersionGroupDetails.version_group.name,
        ...movesData.find((m) => m.name === move.move.name)!,
      };
    })
    .reduce(
      (moveMap, move) => moveMap.set(move.move_learn_method, [...(moveMap.get(move.move_learn_method) || []), move]),
      new Map<string, FormattedMove[]>()
    );

  moves.forEach((moves, key) =>
    key === 'level-up' ? moves.sort((a, b) => a.level_learned_at - b.level_learned_at) : moves
  );

  return moves;
});
</script>
