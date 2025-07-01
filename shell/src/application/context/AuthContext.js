import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: (() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  })(),
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem('user');
    set({ user: null });  
  },
  isAuthenticated: () => {
    const user = useAuthStore.getState().user;
    return user && user.token ? true : false;
  },
}));
