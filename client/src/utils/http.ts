import axios, { AxiosResponse } from 'axios';

export class Response<Type> {
    /**
     * Creates a new instance of the Response class.
     *
     * @param {boolean} success - Indicates whether the response was successful or not.
     * @param {Type} message - The message associated with the response.
     */
    constructor(
        public readonly success: boolean, 
        public readonly message: Type) { }
}

/**
 * Sends an HTTP request to the specified URL using the specified method and optional data, parameters, and headers.
 *
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method to use for the request.
 * @param {object} [data={}] - The data to send in the request body (default: {}).
 * @param {object} [params={}] - The URL parameters to include in the request (default: {}).
 * @param {object} [headers={}] - The headers to include in the request (default: {}).
 * @return {Promise<Response<Type>>} A promise that resolves to a Response object containing the request result.
 */
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