import { useUserStore } from '@/stores/user'

export const AuthService = {

  getUser() {
    const userStore = useUserStore();
    userStore.userID = parseInt(localStorage.getItem('user'));
    return userStore.userID;
  },
  setUser(user) {
    const userStore = useUserStore();
    localStorage.setItem('user', user);
    userStore.userID = user;
  }
}
