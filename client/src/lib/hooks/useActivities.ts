//import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
  const queryClient = useQueryClient();

  const {data: activities, isPending} = useQuery({    // Many other states: isLoading, isError, isFetching, etc.
    queryKey: ['activities'],
    queryFn: async () => {
      //const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    }
  });
  // useEffect(() => {
  //   axios.get<Activity[]>('https://localhost:5001/api/activities')
  //     .then(response => setActivities(response.data))

  //     return () => {}
  // }, [])
  // 
  // useEffect() also not necessary if using React Query    

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activities', activity)
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['activities']
        })

    }
  })

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.post('/activities', activity)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    }
  })

    const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      })
    }
  })

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity
  }
}