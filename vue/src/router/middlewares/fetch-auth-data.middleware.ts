import { NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const fetchAuthDataMiddleware = (_, __, next: NavigationGuardNext): Promise<void> => {
  const { fetchUserOnes } = useAuthStore();

  return fetchUserOnes().finally(next);
}

export { fetchAuthDataMiddleware };