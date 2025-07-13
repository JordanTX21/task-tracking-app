<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Board from '@/components/Board.vue';
</script>

<template>
    <div class="p-4 flex flex-col gap-y-4 h-screen animate-pulse">
        <div
            class="border border-slate-400 rounded-lg bg-slate-700 text-gray-300 text-xs grid lg:grid-cols-3 sm:grid-cols-2">
            <div v-for="(user, index) in 9" :key="`user-${index}`" :class="['py-2 px-4 flex gap-x-2 items-center cursor-pointer hover:bg-slate-500', {
                'rounded-tl-lg': index === 0,
                'rounded-tr-lg': index === 2,
                'rounded-bl-lg': index === 6,
                'rounded-br-lg': index === 8,
            }]">
                <Avatar color="gray"></Avatar>
                <div class="bg-gray-500 h-3 w-20 rounded-lg"></div>
                <div class="flex gap-x-1">
                    <div class="bg-gray-500 h-3 w-4 rounded-lg"></div> / <div class="bg-gray-500 h-3 w-4 rounded-lg">
                    </div>
                </div>
                <div class="flex-1 rounded-lg bg-gray-300">
                    <div class="rounded-lg h-2 bg-gray-600" :style="{ 'width': `50%` }"></div>
                </div>
            </div>
        </div>
        <div class="flex-1 overflow-y-auto h-full">
            <div class="flex">
                <Board v-for="(board, index) in 5" :key="`board-${index}`" color="gray">
                    <template #title>
                        <div class="bg-gray-500 h-3 w-full rounded-lg"></div>
                    </template>
                    <template #body>
                        <div v-for="(user, iu) in 10"
                            class="p-4 border border-slate-400 rounded-lg bg-slate-700 text-gray-300 grid gap-y-2 hover:shadow-2xl hover:border-slate-300"
                            :key="`card-task-${iu}`">
                            <div class="flex gap-x-2 items-center cursor-pointer">
                                <Avatar color="gray"></Avatar>
                                <div class="flex-1 flex flex-col gap-y-1">
                                    <div class="bg-gray-500 h-3 rounded-lg"></div>
                                    <div class="bg-gray-500 h-3 rounded-lg"></div>
                                </div>
                            </div>
                            <div class="flex items-center justify-between text-xs">
                                <div class="bg-gray-500 h-3 w-32 rounded-lg"></div>
                                <div class="bg-gray-500 h-3 w-10 rounded-lg"></div>
                            </div>
                        </div>
                    </template>
                </Board>
            </div>
        </div>
    </div>
</template>
