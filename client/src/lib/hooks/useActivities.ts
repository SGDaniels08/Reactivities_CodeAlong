//import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import type { Activity } from "../types";
import { useAccount } from "./useAccount";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
const location = useLocation();

  const {data: activities, isLoading} = useQuery({    // Many other states: isPending, isError, isFetching, etc.
    queryKey: ['activities'],
    queryFn: async () => {
      //const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    },
    // This following says tha this hook will only trigger
    // if we are not passing it an Id (no need to get all data
    // if we're only looking at one thing), and only if we are
    // going to the 'Create Activity' route 
    enabled: !id && location.pathname === '/activities' && !!currentUser,    // Cast 'currentUser' into Boolean, only show if logged in
      select: data => {
        return data.map(activity => {
          return {
            ...activity,
            isHost: currentUser?.id === activity.hostId,
            isGoing: activity.attendees.some(x => x.id === currentUser?.id)
          }
        })
      }
    // Add the following "staleTime" option
    // to set how long an API call will remain "fresh" for
    // (how long until another network request will be made)
    //
    // ,staleTime: 1000 * 60 * 5
  });

  const {data: activity, isLoading: isLoadingActivity} = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`)
      return response.data
    },
    enabled: !!id && !!currentUser, // Double-exclamation casts into a boolean; returns true if we have an Id, false if not
      select: data => {
        return {
          ...data,
          isHost: currentUser?.id === data.hostId,
          isGoing: data.attendees.some(x => x.id === currentUser?.id)
        }
      }
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

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
      await agent.post(`/activities/${id}/attend`)
    },
    onMutate: async (activityId: string) => {
      // Complex, see lesson 159 for detailed explanation
      // This will effectively make a copy of our state as we tinker with attendance, so we can roll it back if something goes wrong
      await queryClient.cancelQueries({queryKey: ['activities', activityId]});

      const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

      queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
        if (!oldActivity || !currentUser) {
          return oldActivity;
        }

        const isHost = oldActivity.hostId === currentUser.id;
        const isAttending = oldActivity.attendees.some(x => x.id === currentUser.id);

        return {
          ...oldActivity,
          isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
          attendees: isAttending
            ? isHost
              ? oldActivity.attendees
              : oldActivity.attendees.filter(x => x.id !== currentUser.id)
            : [...oldActivity.attendees, {
              id: currentUser.id,
              displayName: currentUser.displayName,
              imageUrl: currentUser.imageUrl
            }]
        }
      });

      return {prevActivity}
    },
    onError: (error, activityId, context) => {
      console.log(error);
      if (context?.prevActivity) {
        queryClient.setQueryData(['activities', activityId], context.prevActivity)
      }
      }
  })

  return {
    activities,
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance
  }
}