import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {

    const boards = ref([
        {
            title: "Modo Web",
            color: "blue",
            users: [
                {
                    name: "Jordan - Sistemas",
                    color: "blue",
                    task: "TASK-2025-02769",
                    date: "2025-07-10 23:11:00"
                }
            ]
        },
        {
            title: "Chambiadores",
            color: "orange",
            users: [
                {
                    name: "Marco - Sistemas",
                    color: "yellow",
                    task: "TASK-2025-02769",
                    date: "2025-07-10 23:11:00"
                }
            ]
        },
        {
            title: "Todo el día Pullp",
            color: "red",
            users: [
                {
                    name: "Edson - Sistemas",
                    color: "gray",
                    task: "TASK-2025-02769",
                    date: "2025-07-10 23:11:00"
                }
            ]
        },
    ])

    const users = ref([
        {
            name: "Jordan",
            color: "blue",
            goal: 8,
            done: 1
        },
        {
            name: "Marco",
            color: "yellow",
            goal: 8,
            done: 1
        },
        {
            name: "Edson",
            color: "gray",
            goal: 8,
            done: 1
        },
        {
            name: "Jose",
            color: "green",
            goal: 6,
            done: 3
        },
    ])

    const user = ref({
        name: "Edson - Sistemas",
        color: "gray",
        tasks: [
            {
                status: "Chambiando",
                color: "orange",
                tasks: [
                    {
                        name: "TASK-2025-02769",
                        date: "2025-07-10 23:11:00"
                    }
                ]
            },
            {
                status: "Pendiente",
                color: "blue",
                tasks: [
                    {
                        name: "TASK-2025-02769",
                        date: "2025-07-10 23:11:00"
                    }
                ]
            },
            {
                status: "Aprovado para subir",
                color: "red",
                tasks: [
                    {
                        name: "TASK-2025-02769",
                        date: "2025-07-10 23:11:00"
                    }
                ]
            },
        ]
    })

    const getTasks = async () => {

    }

    return { boards, users, user, getTasks }
})
