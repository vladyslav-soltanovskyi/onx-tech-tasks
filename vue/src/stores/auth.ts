import { ref } from "vue";
import { useRouter } from 'vue-router'
import { defineStore } from "pinia";
import { IUser, SignInDto, SignUpDto } from "@types-app/index";
import { AppRoutes } from "@enums/index";
import { errorCatch, toastError, toastSuccess } from "@helpers/index";
import authService from "@services/auth";

const useAuthStore = defineStore('auth', () => {
  const user = ref<IUser | null>(null);
  const isFetchedAuthData = ref(false);
  const isLoading = ref(false);
  const isSending = ref(false);
  const router = useRouter();

  const signIn = async (data: SignInDto) => {
    try {
      isSending.value = true;
      const signInResponse = await authService.signIn(data);
      router.replace({ path: AppRoutes.CLIENTS });
      user.value = signInResponse.user;
      authService.setToken(signInResponse.token);
      toastSuccess('Successfully authorized');
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }

  const signUp = async (data: SignUpDto) => {
    try {
      isSending.value = true;
      const signUpResponse = await authService.signUp(data);
      router.replace({ path: AppRoutes.CLIENTS });
      user.value = signUpResponse.user;
      authService.setToken(signUpResponse.token);
      toastSuccess('Successfully authorized');
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }

  const signOut = async () => {
    try {
      isSending.value = true;
      await authService.signOut();
      router.replace({ path: AppRoutes.SIGN_IN });
      user.value = null;
      authService.removeToken();
      toastSuccess('You successfully sign out');
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }

  const fetchUser = async () => {
    try {
      isLoading.value = true;
      user.value = await authService.fetchCurrentUser();
    } catch (err) {
    } finally {
      isLoading.value = false;
    }
  }

  const fetchUserOnes = async () => {
    const token = authService.getToken();
    if (isFetchedAuthData.value || !token) return;
    try {
      await fetchUser();
    } catch (_) {
    } finally {
      isFetchedAuthData.value = true;
    }
  }

  return {
    user,
    isLoading,
    isSending,
    isFetchedAuthData,
    fetchUserOnes,
    fetchUser,
    signIn,
    signUp,
    signOut,
  };
});

export { useAuthStore };