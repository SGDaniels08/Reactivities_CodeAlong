import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailPage from "../../features/activities/details/ActivityDetailPage";
import Counter from "../../features/counter/Counter";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/loginForm";

// Routes are provided as an array, and each route will be a Route object
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,        // This is the root route
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard />},
            { path: 'activities/:id', element: <ActivityDetailPage />},
            { path: 'createActivity', element: <ActivityForm key='create' />},      // By giving a "key" to a component, React will be able to distinguish
            { path: 'manage/:id', element: <ActivityForm />},                       // between different instances of same component. Here, it will ensure that
            { path: 'counter', element: <Counter /> },                              // the <ActivityForm> for "Create Activity" will always be seen as different from
            { path: 'errors', element: <TestErrors />},                             // <ActivityForm> for "Edit Activity", ensure "Create" form is blank
            { path: 'not-found', element: <NotFound />},
            { path: 'server-error', element: <ServerError />},
            { path: 'login', element: <LoginForm />},
            { path: '*', element: <Navigate replace to='/not-found' />}             // Wildcard; if none of the above, sent to Not Found 
        ]                                                                                                         
    }                                                                               
])