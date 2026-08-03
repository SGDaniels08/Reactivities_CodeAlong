import { useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import type { Photo, Profile, User } from "../types";
import { useMemo } from "react";

export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();
    
  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get<Profile>(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id
  });

  const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
    queryKey: ['photos', id],
    queryFn: async () => {
        const response = await agent.get<Photo[]>(`/profiles/${id}/photos`)
        return response.data
    },
    enabled: !!id
  });

  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<User>(['user'])?.id;   // This 'user' matches the queryKey defined in useAccount.ts
  }, [id, queryClient])

  return {
    profile,
    loadingProfile,
    photos,
    loadingPhotos,
    isCurrentUser
  };
};
