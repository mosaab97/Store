import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Router";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async (response) => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response! as AxiosResponse;
    switch(status) {
        case 400:
            if(data.errors) {
                const moduleStateErrors: string[] = []
                for(const key in data.errors) {
                    if(data.errors[key]) { // to avoid type check
                        moduleStateErrors.push(data.errors[key])
                    }
                }
                console.log(moduleStateErrors.flat())
                throw moduleStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody), 
    post: (url: string, body: object) => axios.post(url, body).then(responseBody), 
    put: (url: string, body: object) => axios.put(url, body).then(responseBody), 
    delete: (url: string) => axios.delete(url).then(responseBody), 
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get404: () => requests.get('/buggy/not-found'),
    get500: () => requests.get('/buggy/server-error'),
    get400: () => requests.get('/buggy/bad-request'),
    get401: () => requests.get('/buggy/Unauthorized'),
    get400VlidationError: () => requests.get('/buggy/validation-error'),
}

const server = {
    Catalog,
    TestErrors
}

export default server;