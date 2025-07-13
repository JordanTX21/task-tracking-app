<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Board from '@/components/Board.vue';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';
import { get_color, get_abbr, capitalizeWords, formatTime } from '@/utils/utils'
import { useRouter } from 'vue-router';
import SkeletonHome from './SkeletonHome.vue';

const router = useRouter()

const store = useTaskStore()
const { boards, users } = storeToRefs(store)

onMounted(() => {
  store.getUsers()
  store.getTasks()
})

const getRoundedClasses = (index: number) => {
  const len = users.value.length;

  // Por breakpoint
  const cols = {
    'lg': 3,
    'sm': 2,
    'max-sm': 1,
  };

  const result: Record<string, boolean> = {};

  Object.entries(cols).forEach(([prefix, colCount]) => {
    const rowCount = Math.ceil(len / colCount);

    const row = Math.floor(index / colCount);
    const col = index % colCount;

    const isFirstRow = row === 0;
    const isLastRow = row === rowCount - 1;
    const isFirstCol = col === 0;
    const isLastCol = col === colCount - 1;

    if (isFirstRow && isFirstCol) result[`rounded-tl-lg`] = true;
    if (isFirstRow && isLastCol) result[`${prefix}:rounded-tr-lg`] = true;
    if (isLastRow && isFirstCol) result[`${prefix}:rounded-bl-lg`] = true;
    if (isLastRow && isLastCol) result[`${prefix}:rounded-br-lg`] = true;
  });

  return result;
};

</script>

<template>
  <div class="p-4 flex flex-col gap-y-4 h-screen" v-if="boards.length > 0 && users.length > 0">
    <div
      class="border border-slate-400 rounded-lg bg-slate-700 text-gray-300 text-xs grid lg:grid-cols-3 sm:grid-cols-2">
      <RouterLink v-for="(user, index) in users" :key="`user-${index}`" :to="`/user/${user.id}`"
        :class="['py-2 px-4 grid grid-cols-2 gap-x-2 items-center cursor-pointer hover:bg-slate-500', getRoundedClasses(index)]">
        <div class="flex items-center gap-x-2">
          <Avatar :color="user.image ? 'stone' : get_color(user.name)"><img
              :src="`https://erp.overskull.com${user.image}`" alt="" v-if="user.image"><span v-else>{{
                get_abbr(user.name)
              }}</span></Avatar>
          <div class="font-medium">{{ capitalizeWords(user.name) }}</div>
        </div>
        <div class="flex flex-col gap-y-2">
          <div class="font-medium text-center">{{ user.done }} / {{ user.goal }}</div>
          <div class="flex-1 rounded-lg bg-gray-300">
            <div class="rounded-lg h-2 bg-red-600"
              :style="{ 'width': `${(Math.min(user.done, user.goal) / user.goal) * 100}%` }"></div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="flex-1 overflow-y-auto h-full">
      <div class="flex">
        <Board v-for="(board, index) in boards" :key="`board-${index}`" :color="board.color">
          <template #title>{{ board.title }}</template>
          <template #body>
            <div v-for="(user, iu) in board.users"
              class="p-4 border border-slate-400 rounded-lg bg-slate-700 text-gray-300 grid gap-y-2 hover:shadow-2xl hover:border-slate-300"
              :key="`card-task-${iu}`">
              <RouterLink class="flex gap-x-2 items-center cursor-pointer" :to="`/user/${user.id}`">
                <Avatar :color="user.image ? 'stone' : get_color(user.name)"><img
                    :src="`https://erp.overskull.com${user.image}`" alt="" v-if="user.image"><span v-else>{{
                      get_abbr(user.name) }}</span></Avatar>
                <div class="text-sm font-medium">{{ user.name }}</div>
              </RouterLink>
              <div class="flex items-center justify-between text-xs">
                <a target="_blank" :href="`https://erp.overskull.com/app/task/${user.task}`" class="hover:underline">
                  {{ user.task }}
                </a>
                <span class="font-semibold">{{ formatTime(user.date) }}</span>
              </div>
            </div>
          </template>
        </Board>
      </div>
    </div>
  </div>
  <SkeletonHome v-else />
</template>
