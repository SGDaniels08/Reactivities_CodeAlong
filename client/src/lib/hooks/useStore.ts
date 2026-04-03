import { useContext } from "react";
import { StoreContext } from "../storese/stores";

// This hook will enable us to use our mobx stores for tracking data client-side
export function useStore() {
    return useContext(StoreContext);
}