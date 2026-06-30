import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import { useNavigate } from "react-router";
import type { User } from "../types";
import { toast } from "react-toastify";
import type { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });

    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/register', creds);
        },
        onSuccess: () => {
            toast.success('Register successful - you can now log in');
            navigate('/login');
        }
    });

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']});
            queryClient.removeQueries({queryKey: ['activities']});     // 'activities' key defined in 'useActivities' hook, accessible because created at higher level
            navigate('/');
        }
    })
    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user'])        // Will only get the user if we don't have one already
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}