<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "gray"
    }
})
</script>
<template>
    <div :class="[
        'p-4 border rounded-lg flex flex-col gap-y-4',
        {
            'bg-gray-200 border-gray-400': color === 'gray',
            'bg-red-200 border-red-400': color === 'red',
            'bg-blue-200 border-blue-400': color === 'blue',
            'bg-green-200 border-green-400': color === 'green',
            'bg-yellow-200 border-yellow-400': color === 'yellow',
            'bg-purple-200 border-purple-400': color === 'purple',
            'bg-orange-200 border-orange-400': color === 'orange',
        }
    ]">
        <div :class="{
            'text-gray-900': color === 'gray',
            'text-red-900': color === 'red',
            'text-blue-900': color === 'blue',
            'text-green-900': color === 'green',
            'text-yellow-900': color === 'yellow',
            'text-purple-900': color === 'purple',
            'text-orange-900': color === 'orange',
        }" class="font-medium">
            <slot name="title"></slot>
        </div>
        <div>
            <slot name="body"></slot>
        </div>
    </div>
</template>