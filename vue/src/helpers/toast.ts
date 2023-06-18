import { useToast } from "vue-toast-notification";

const toastError = (text: string) => {
  const toast = useToast();
  toast.error(text, { duration: 2000 });
}

const toastSuccess = (text: string) => {
  const toast = useToast();
  toast.success(text, { duration: 2000 });
}

export { toastError, toastSuccess };