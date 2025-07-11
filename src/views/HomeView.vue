<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Board from '@/components/Board.vue';
import Indicator from '@/components/Indicator.vue';
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { storeToRefs } from 'pinia';

const store = useTaskStore()
const { boards, users, user } = storeToRefs(store)

onMounted(() => {
  store.getTasks()
})

const formatTime = (date: string) => {
  const inputDate = new Date(date);
  const now = new Date();

  let diffMs = now.getTime() - inputDate.getTime();

  // Asegurarse de que no sea negativo
  if (diffMs < 0) diffMs = 0;

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const diffSeconds = Math.floor((diffMs / 1000) % 60);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeStr = `${pad(diffHours)}:${pad(diffMinutes)}:${pad(diffSeconds)}`;
  return diffDays > 0 ? `${diffDays}d ${timeStr}` : timeStr;
}

</script>

<template>
  <main class="max-w-[1280px] mx-auto p-4 flex flex-col min-h-screen gap-y-4">
    <div class="border border-gray-400 rounded-lg bg-white text-gray-500 text-xs grid grid-cols-3">
      <div v-for="(user, index) in users" :key="`user-${index}`"
        class="py-2 px-4 flex gap-x-2 items-center cursor-pointer hover:bg-gray-200">
        <Avatar :color="user.color">{{ user.name[0] }}</Avatar>
        <div class="font-medium">{{ user.name }}</div>
        <div class="font-medium">{{ user.done }} / {{ user.goal }}</div>
        <div class="flex-1 rounded-lg bg-gray-300">
          <div class="rounded-lg h-2 bg-red-600" :style="{ 'width': `${(user.done / user.goal) * 100}%` }"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 gap-x-4 h-full">
      <Board v-for="(board, index) in boards" :key="`board-${index}`" :color="board.color">
        <template #title>{{ board.title }}</template>
        <template #body>
          <div v-for="(user, iu) in board.users" :class="[`p-4 border border-${board.color}-400 rounded-lg bg-white text-gray-500 grid gap-y-2`, {
            'hover:shadow-lg hover:shadow-gray-600/20': board.color === 'gray',
            'hover:shadow-lg hover:shadow-red-600/20': board.color === 'red',
            'hover:shadow-lg hover:shadow-blue-600/20': board.color === 'blue',
            'hover:shadow-lg hover:shadow-green-600/20': board.color === 'green',
            'hover:shadow-lg hover:shadow-yellow-600/20': board.color === 'yellow',
            'hover:shadow-lg hover:shadow-purple-600/20': board.color === 'purple',
            'hover:shadow-lg hover:shadow-orange-600/20': board.color === 'orange',
          }]" :key="`card-task-${iu}`">
            <div class="flex gap-x-2 items-center cursor-pointer">
              <Avatar :color="user.color">{{ user.name[0] }}</Avatar>
              <div class="text-sm font-medium">{{ user.name }}</div>
            </div>
            <div class="flex items-center justify-between text-xs">
              <a target="_blank" :href="`https://erp.overskull.com/app/task/${user.task}`" class="hover:underline">
                {{ user.task }}
              </a>
              <span class="font-semibold">{{ formatTime(user.date) }}</span>
            </div>
          </div>
        </template>
      </Board>
      <div class="flex-1 p-4 border border-gray-400 bg-gray-200 rounded-lg text-gray-500 grid gap-y-2">
        <div class="flex flex-col gap-y-4">
          <div class="flex gap-x-2 items-center">
            <Avatar :color="user.color">{{ user.name[0] }}</Avatar>
            <div class="text-sm font-medium">{{ user.name }}</div>
          </div>
          <div>
            <div class="border border-gray-400 rounded-lg bg-white text-gray-500">
              <div v-for="(tasks_status, index) in user.tasks" :key="`task-list-${index}`">
                <div class="p-4 flex items-center gap-x-2 font-medium text-sm border-b border-b-gray-300">
                  <Indicator :color="tasks_status.color" />{{
                    tasks_status.status }}
                </div>
                <div v-for="(task, ti) in tasks_status.tasks" :key="`task-item-${index}-${ti}`"
                  :class="['p-4 flex items-center justify-between gap-x-2 font-medium text-xs', { 'border-b border-b-gray-400': index !== user.tasks.length - 1 }]">
                  <a target="_blank" :href="`https://erp.overskull.com/app/task/${task.name}`" class="hover:underline">
                    <span>{{ task.name }}</span>
                  </a>
                  <span class="font-semibold">{{ formatTime(task.date) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
