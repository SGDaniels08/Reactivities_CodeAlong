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
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

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

agent.interceptors.response.use(
    async response => {
    // try {
    //     await sleep(1000);
    //     return response;
    // } catch (error) {
    //     console.log('axios error:' + error);
    //     return Promise.reject(error)
    // } finally {                         // Always clear "isLoading" flag from mobx store, whether success or failure
    //     store.uiStore.isIdle();
    // }
    // try-catch block does not work properly with axios
    // just update interceptor to handle various use cases

        await sleep(1000);          // Fake 1000 ms delay to simulate loading
        store.uiStore.isIdle();
        return response;
    },
    async error => {
        await sleep(1000);         // Fake 1000 ms delay to simulate loading
        store.uiStore.isIdle();
        //console.log("axios error: " + error);   
        // rethrow error for React Query to handle (?)
        
        // Destructure error on whatever info
        // you need from the error response
        // "error" is object of type any, since
        // compiler doesn't know what type of
        // error you'll be working with

        const {data, status} = error.response;

        switch (status) {
            case 400:
                //toast.error('Bad request');
                if (data.errors) {
                    const modalStateErrors = [];                        // Modal state errors is how errors are handled server-side
                    for (const key in data.errors) {                    // Every time a validation error occurs, something happens in
                        if (data.errors[key]) {                         // the system modal state errors object, and that's what ultimately
                            modalStateErrors.push(data.errors[key]);    // gets returned
                        }
                    }

                    throw modalStateErrors.flat();  // Should return an array with all the errors triggered in the for loop
                } else {
                    toast.error(data);
                }
                break;
            case 401:
                toast.error('Unauthorized');
                break;
            case 404:
                //toast.error('Not found');
                router.navigate('/not-found');
                break;
            case 500:
                //toast.error('Server error');
                // Want to pass details of server error to our <ServerError> component through the router
                // Use second parameter of navigate() method
                router.navigate('/server-error', {state: {error: data}});           // "error" is set to the "data" from the error response
                break;
            default :
                break;
        }
        
        return Promise.reject(error);
    }
);

export default agent;