<script setup lang="ts">
import { alertStore } from '@/stores/alerts'
import { AlertCircle, X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const store = alertStore()

const { popups, message } = storeToRefs(store)

const hideAlert = (index: number) => {
    store.onCancelPopUp()
    popups.value.splice(index, 1)
}

const saveAlert = (index: number) => {
    store.onAceptPopUp()
    hideAlert(index)
}

</script>
<template>
    <TransitionGroup name="list" tag="ul" class="fixed bottom-12 right-12 z-99 max-w-64 flex flex-col gap-y-4">
        <li v-for="(popup, ipopup) in popups" :key="`popup-${ipopup}`"
            class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex">
                <div class="shrink-0">
                    <AlertCircle class="size-5 text-gray-800 dark:text-white" />
                </div>
                <div class="ms-2">
                    <div class="text-gray-800 font-semibold dark:text-white" v-html="popup.title"></div>
                    <div class="mt-2 text-sm text-gray-700 dark:text-neutral-400" v-html="popup.message"></div>
                </div>
                <div class="ps-3 ms-auto">
                    <div class="-mx-1.5 -my-1.5">
                        <button type="button" @click="hideAlert(ipopup)"
                            class="inline-flex bg-neutral-50 rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 focus:outline-hidden focus:bg-neutral-100 dark:bg-transparent dark:text-gray-600 dark:hover:bg-gray-900 dark:focus:bg-gray-900 ">
                            <span class="sr-only">Dismiss</span>
                            <X class="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    </TransitionGroup>
</template>