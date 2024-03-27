import axios, { AxiosResponse } from 'axios';

export class Response<Type> {
    constructor(
        public readonly success: boolean, 
        public readonly message: Type) { }
}

export const request = async <Type>(
    url: string,
    method: string,
    data: object = {},
    params: object = {}, 
    headers: object = {}
): Promise<Response<Type>> => {
    try {
        const res: AxiosResponse = await axios.request({
            url: url, 
            method,
            data,
            params,
            headers: {  'Content-Type': 'application/json', ...headers },
            withCredentials: true
        });

        return new Response(true, res.data);
    } catch (err: any) {
        return new Response(false, err.response ? err.response.data : err);
    }
};