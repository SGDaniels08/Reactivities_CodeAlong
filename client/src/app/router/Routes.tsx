import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";

// Routes are provided as an array, and each route will be a Route object
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,        // This is the root route
        children: [
            { path: '', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard />},
            { path: 'createActivity', element: <ActivityForm />}
        ]
    }
])