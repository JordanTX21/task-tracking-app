<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import IconChevron from '@/components/icons/IconChevron.vue';
import Indicator from '@/components/Indicator.vue';

</script>
<template>
    <div class="p-4 border border-slate-400 rounded-lg bg-slate-700 text-gray-300 grid gap-y-2 shadow-lg animate-pulse">
        <div class="flex flex-col gap-y-4">
            <div class="flex gap-x-4 items-center">
                <RouterLink id="btn-back"
                    class="p-3 rounded-lg border border-slate-400 hover:border-slate-300 hover:shadow-lg"
                    :to="{ name: 'home' }">
                    <IconChevron class="w-5 h-5" />
                </RouterLink>
                <Avatar color="gray"></Avatar>
                <div class="bg-gray-500 h-3 w-40 rounded-lg"></div>
            </div>
            <div>
                <div class="border border-slate-400 rounded-lg bg-slate-700">
                    <div v-for="(tasks_status, index) in 5" :key="`task-list-${index}`">
                        <div :class="['p-4 flex items-center gap-x-2 font-medium text-sm cursor-pointer bg-slate-600', {
                            'border-t-2 border-t-slate-400': index !== 0,
                            'border-b-2 border-b-slate-400': index !== 4,
                            'rounded-t-lg': index === 0,
                            'rounded-b-lg': index === 4,
                        }]">
                            <Indicator color="gray" />
                            <div class="bg-gray-500 h-3 w-48 rounded-lg"></div>
                        </div>
                        <div v-for="(task, ti) in 2" :key="`task-item-${index}-${ti}`"
                            :class="['p-4 flex items-center justify-between gap-x-2 font-medium text-xs',]">
                            <div class="bg-gray-500 h-3 w-64 rounded-lg"></div>
                            <div class="bg-gray-500 h-3 w-32 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>