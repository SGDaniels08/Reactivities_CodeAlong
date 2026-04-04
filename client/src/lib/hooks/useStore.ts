import { useContext } from "react";
import { StoreContext } from "../stores/store";

// This hook will enable us to use our mobx stores for tracking data client-side
export function useStore() {
    return useContext(StoreContext);
}