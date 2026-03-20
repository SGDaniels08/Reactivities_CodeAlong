//import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();

  const {data: activities, isPending} = useQuery({    // Many other states: isLoading, isError, isFetching, etc.
    queryKey: ['activities'],
    queryFn: async () => {
      //const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    }
  });

  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`)
      return response.data
    },
    enabled: !!id // Double-exclamation casts into a boolean; returns true if we have an Id, false if not
  })
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
      const response = await agent.post('/activities', activity)
      return response.data; // Should be Id of created activity
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
    deleteActivity,
    activity,
    isLoadingActivity
  }
}