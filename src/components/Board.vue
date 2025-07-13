<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "gray"
    }
})
</script>
<template>
    <div class="p-4 rounded-lg flex-1 flex flex-col gap-y-4 min-w-[248px]">
        <div :class="['rounded-lg border px-2 py-1 flex gap-x-2 text-sm font-medium', {
            'text-gray-900 bg-gray-200 border-gray-400': color === 'gray',
            'text-red-900 bg-red-200 border-red-400': color === 'red',
            'text-blue-900 bg-blue-200 border-blue-400': color === 'blue',
            'text-green-900 bg-green-200 border-green-400': color === 'green',
            'text-yellow-900 bg-yellow-200 border-yellow-400': color === 'yellow',
            'text-purple-900 bg-purple-200 border-purple-400': color === 'purple',
            'text-orange-900 bg-orange-200 border-orange-400': color === 'orange',
        }]" class="font-medium">
            <div :class="['h-full w-1 rounded-lg', {
                'bg-gray-400': color === 'gray',
                'bg-red-400': color === 'red',
                'bg-blue-400': color === 'blue',
                'bg-green-400': color === 'green',
                'bg-yellow-400': color === 'yellow',
                'bg-purple-400': color === 'purple',
                'bg-orange-400': color === 'orange',
            }]"></div>
            <slot name="title"></slot>
        </div>
        <div class="flex flex-col gap-y-2">
            <slot name="body"></slot>
        </div>
    </div>
</template>