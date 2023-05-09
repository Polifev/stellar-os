import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASE_URL = "https://api.spacetraders.io/v2";

interface ApiConfig extends AxiosRequestConfig {
    authToken: string;
}

export interface SpaceTradersApiResponse<T> {
    data: T
}

export interface Agent {
    accountId: string
    symbol: string,
    headquarters: string,
    credits: string
}

class Api {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_URL,
        });
    }

    public setAuthToken(token: string) {
        this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    public async get<T>(url: string, config?: ApiConfig): Promise<T> {
        return (await this.axiosInstance.get<SpaceTradersApiResponse<T>>(url, config).then((response) => response.data)).data;
    }

    public async post<T>(url: string, data: any, config?: ApiConfig): Promise<T> {
        return (await this.axiosInstance.post<SpaceTradersApiResponse<T>>(url, data, config).then((response) => response.data)).data;
    }
}

export async function fetchMyAgent(token: string): [] {
    const api = new Api();
    api.setAuthToken(token);
    try {
        const agent = await api.get<Agent>("my/agent");
        return agent;
    } catch(err) {
        console.error(err);
        return null;
    }
}
