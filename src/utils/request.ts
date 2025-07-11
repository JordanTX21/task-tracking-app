import axios from 'axios';

export default class Request {

    domain: string;
    prefix: string;
    token: string;

    constructor() {
        this.domain = import.meta.env.VITE_SERVICES_DOMAIN
        this.prefix = import.meta.env.VITE_SERVICES_PREFIX
        this.token = import.meta.env.VITE_SERVICES_TOKEN
        axios.defaults.headers.common = { 'Authorization': `bearer ${this.token}` }
    }

    async get(endpoint: string) {
        try {
            const prefixPath = this.prefix ? `/${this.prefix}/` : '/'
            const response = await axios.get(`${this.domain}${prefixPath}${endpoint}`)
            return response.data
        } catch (e) {
            return { success: false, message: 'Ocurrió un error interno.', error: e }
        }
    }

    async post(endpoint: string, data?: Record<string, any>) {
        const formData = new FormData()
        if (data && typeof data === 'object') {
            for (const [key, value] of Object.entries(data)) {
                if (value === null || value === undefined) continue;
                if (typeof value === 'boolean') {
                    formData.append(key, Number(value).toString())
                    continue
                }
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value))
                    continue
                }
                if (value instanceof Blob) {
                    formData.append(key, value)
                    continue
                }
                formData.append(key, value.toString())
            }
        }
        formData.append("token", this.token)
        try {
            const prefixPath = this.prefix ? `/${this.prefix}/` : '/'
            const response = await fetch(`${this.domain}${prefixPath}${endpoint}`, {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) {
                // Manejar respuestas HTTP no exitosas
                const errorResponse = await response.text();
                return { success: false, message: `HTTP Error: ${response.status}`, error: errorResponse };
            }
            return response.json()
        } catch (e) {
            return { success: false, message: 'Ocurrió un error interno.', error: e }
        }
    }

    async file(file: any) {
        const formData = new FormData()
        formData.append('files', file)
        try {
            const response = await fetch(`${this.domain}/api/upload-file-service`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                // Manejar respuestas HTTP no exitosas
                const errorResponse = await response.text();
                return { success: false, message: `HTTP Error: ${response.status}`, error: errorResponse };
            }
            const json = await response.json()
            return { success: true, message: "Archivo subido.", data: json }
        } catch (e) {
            console.log(e)
            return { success: false, message: "Ocurró un error interno.", error: e }
        }
    }

    async postAxios(endpoint: string, data?: any) {
        try {
            const prefixPath = this.prefix ? `/${this.prefix}/` : '/'
            const response = await axios.post(`${this.domain}${prefixPath}${endpoint}`, data)
            return response.data
        } catch (e) {
            return { success: false, message: 'Ocurrió un error interno.', error: e }
        }
    }

    async put(endpoint: string, data?: any) {
        try {
            const prefixPath = this.prefix ? `/${this.prefix}/` : '/'
            const response = await axios.put(`${this.domain}${prefixPath}${endpoint}`, data)
            return response.data
        } catch (e) {
            return { success: false, message: 'Ocurrió un error interno.', error: e }
        }
    }

    async delete(endpoint: string) {
        try {
            const prefixPath = this.prefix ? `/${this.prefix}/` : '/'
            const response = await axios.delete(`${this.domain}${prefixPath}${endpoint}`)
            return response.data
        } catch (e) {
            return { success: false, message: 'Ocurrió un error interno.', error: e }
        }
    }
}