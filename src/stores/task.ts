import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Request from '@/utils/request'

const request = new Request()

export const useTaskStore = defineStore('task', () => {

    const boards = ref<any>([])

    const users = ref<any>([])

    const user = ref<any | null>(null)

    const getTasks = async () => {
        boards.value = []
        const response = await request.post("tasks")
        boards.value = response.data
    }

    const getUsers = async () => {
        users.value = []
        const response = await request.post("users")
        users.value = response.data
    }

    const getUser = async (id: string) => {
        user.value = null
        const response = await request.post(`user/${id}`)
        user.value = response.data
    }

    return { boards, users, user, getTasks, getUsers, getUser }
})
