import axios from 'axios'
import {
    Configuration,
} from './spacetraders-sdk'

export const configuration = new Configuration({
    accessToken: localStorage.getItem("spacetraders-api-token") ?? undefined
});

export const instance = axios.create({})

instance.interceptors.response.use(undefined, async (error) => {
    const apiError = error.response?.data?.error;

    if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after']

        await new Promise((resolve) => {
            setTimeout(resolve, retryAfter * 1000);
        });

        return instance.request(error.config);
    }

    throw error;
});