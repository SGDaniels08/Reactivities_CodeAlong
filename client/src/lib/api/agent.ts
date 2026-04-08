// Simulates the load time of an actual production application
// 1000 millisecond delay on API calls
//
// Note on mobx, it is not limited to only React
// This file is not a React component, nothing React in this file
// We can still update a mobx Store in this file,
// and using mobx-react-lite integration,
// our actual React components can still react and change

import axios from "axios";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
}
const agent = axios.create({
    baseURL: import.meta.env.VITE_API_URL  
});

// The following interceptor illustrates updating a mobx store from non-React code
// Will grab the request on the way out and trigger the isBusy() function from uiStore.ts
agent.interceptors.request.use(config => {
    store.uiStore.isBusy();
    return config;
});

agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    } finally {                         // Always clear "isLoading" flag from mobx store, whether success or failure
        store.uiStore.isIdle();
    }
})

export default agent