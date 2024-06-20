import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";

export const routes : RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path:'activities/',element: <ActivityDashboard />},
            {path:'createActivity',element: <ActivityForm key='create' />},
            {path:'activities/:id', element: <ActivityDetails />},
            {path:'manage/:id',element: <ActivityForm key='manage'/>},
            {path:'login',element: <LoginForm/>},
            {path:'errors',element: <TestErrors />},
            {path:'not-found',element: <NotFound />},
            {path:'*',element: <Navigate replace to='/not-found' />},
            {path:'server-error',element: <ServerError />}
        ]
    },
]
export const router = createBrowserRouter(routes);