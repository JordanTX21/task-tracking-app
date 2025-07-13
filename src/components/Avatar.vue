<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: "gray"
    }
})
</script>
<template>
    <div :class="['rounded-full w-8 h-8 flex items-center border justify-center text-sm text-white bg-stone-500 border-stone-400', {
        '!bg-gray-500 !border-gray-400': color === 'gray',
        '!bg-red-500 !border-red-400': color === 'red',
        '!bg-blue-500 !border-blue-400': color === 'blue',
        '!bg-green-500 !border-green-400': color === 'green',
        '!bg-yellow-500 !border-yellow-400': color === 'yellow',
        '!bg-purple-500 !border-purple-400': color === 'purple',
        '!bg-orange-500 !border-orange-400': color === 'orange',
        '!bg-pink-500 !border-pink-400': color === 'pink',
        '!bg-stone-500 !border-stone-400': color === 'dark',
    }]">
        <slot></slot>
    </div>
</template>