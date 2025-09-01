import { create } from "zustand";
import { SearchFilters, User } from "@/types";

interface AppState {
  // Search and filters
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;

  // User state
  user: User | null;
  setUser: (user: User | null) => void;

  // UI state
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;

  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const initialState: Omit<
  AppState,
  | "setSearchFilters"
  | "resetFilters"
  | "setUser"
  | "setIsSearchOpen"
  | "setIsFilterOpen"
  | "toggleTheme"
> = {
  searchFilters: {},
  user: null,
  isSearchOpen: false,
  isFilterOpen: false,
  theme: "light",
};

export const useStore = create<AppState>((set, get) => ({
  ...initialState,

  setSearchFilters: (filters) => {
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters },
    }));
  },

  resetFilters: () => {
    set({ searchFilters: {} });
  },

  setUser: (user) => {
    set({ user });
  },

  setIsSearchOpen: (isSearchOpen) => {
    set({ isSearchOpen });
  },

  setIsFilterOpen: (isFilterOpen) => {
    set({ isFilterOpen });
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    }));
  },
}));
