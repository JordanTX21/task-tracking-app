import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Request from '@/utils/request'

const request = new Request()

export const useTaskStore = defineStore('task', () => {

    const boards = ref<any>([])

    const users = ref<any>([])

    const user = ref<any | null>(null)

    const getTasks = async () => {
        const response = await request.post("tasks")
        console.log(response.data)
        boards.value = response.data
    }

    const getUsers = async () => {
        const response = await request.post("users")
        console.log(response.data)
        users.value = response.data
    }

    const getUser = async (id: string) => {
        const response = await request.post(`user/${id}`)
        console.log(response.data)
        user.value = response.data
    }

    return { boards, users, user, getTasks, getUsers, getUser }
})
