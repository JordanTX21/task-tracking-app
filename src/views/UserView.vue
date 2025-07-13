<script setup lang="ts">
import Avatar from '@/components/Avatar.vue';
import Indicator from '@/components/Indicator.vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/task';
import { get_color, get_abbr, capitalizeWords, formatTime } from '@/utils/utils'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import IconChevron from '@/components/icons/IconChevron.vue';
import SkeletonUser from './SkeletonUser.vue';

const route = useRoute()

const store = useTaskStore()
const { boards, users, user } = storeToRefs(store)

onMounted(() => {
    store.getUser(route.params.id.toString())
})

</script>
<template>
    <div class="p-4 flex flex-col gap-y-4 h-screen">
        <div class="p-4 border border-slate-400 rounded-lg bg-slate-700 text-gray-300 grid gap-y-2 shadow-lg"
            v-if="user !== null">
            <div class="flex flex-col gap-y-4">
                <div class="flex gap-x-4 items-center">
                    <RouterLink id="btn-back"
                        class="p-3 rounded-lg border border-slate-400 hover:border-slate-300 hover:shadow-lg"
                        :to="{ name: 'home' }">
                        <IconChevron class="w-5 h-5" />
                    </RouterLink>
                    <Avatar :color="user.image ? 'stone' : get_color(user.name)"><img
                            :src="`https://erp.overskull.com${user.image}`" alt="" v-if="user.image"><span v-else>{{
                                get_abbr(user.name)
                            }}</span></Avatar>
                    <div class="text-sm font-medium">{{ capitalizeWords(user.name) }}</div>
                </div>
                <div>
                    <div class="border border-slate-400 rounded-lg bg-slate-700">
                        <div v-for="(tasks_status, index) in user.tasks" :key="`task-list-${index}`">
                            <div :class="['p-4 flex items-center gap-x-2 font-medium text-sm cursor-pointer bg-slate-600', {
                                'border-t-2 border-t-slate-400': index !== 0,
                                'border-b-2 border-b-slate-400': index !== user.tasks.length - 1,
                                'rounded-t-lg': index === 0,
                                'rounded-b-lg': index === user.tasks.length - 1 && tasks_status.tasks.length === 0,
                            }]">
                                <Indicator :color="tasks_status.color" />{{
                                    tasks_status.status }}
                            </div>
                            <div v-for="(task, ti) in tasks_status.tasks" :key="`task-item-${index}-${ti}`"
                                :class="['p-4 flex items-center justify-between gap-x-2 font-medium text-xs',]">
                                <a target="_blank" :href="`https://erp.overskull.com/app/task/${task.name}`"
                                    class="hover:underline">
                                    <span>{{ task.name }}</span>
                                </a>
                                <span class="font-semibold">{{ formatTime(task.date) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SkeletonUser v-else />
    </div>
</template>