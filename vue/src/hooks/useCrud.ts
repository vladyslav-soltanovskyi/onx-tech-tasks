import { ref, Ref } from "vue";
import { GenericService } from "@services/generic";
import { ICrudOptions } from "@types-app/crud";
import { toastError, toastSuccess } from "@helpers/toast";
import { errorCatch } from "@helpers/error-catch";

const useCrud = <T extends Record<string, any> = {}, TOne = T, TCreate = T, TUpdate = Partial<TCreate>>({
  name,
  url,
}: ICrudOptions) => {
  const genericService = new GenericService<T, TOne, TCreate, TUpdate>({
    name,
    url,
  });
  
  const items = ref([]);
  const item = ref(null);
  const isLoading = ref(false);
  const isSending = ref(false);

  const fetchAll = async () => {
    try {
      isLoading.value = true;
      const data = await genericService.fetchAll();
      items.value = data;
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isLoading.value = false;
    }
  }
  
  const fetchOne = async (id: number) => {
    try {
      isLoading.value = true;
      const findedItem = await genericService.fetchOne(id);
      item.value = findedItem;
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isLoading.value = false;
    }
  }
  
  const createItem = async (data: TCreate) => {
    try {
      isSending.value = true;
      await genericService.create(data);
      toastSuccess(`${name} successfully created`);
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }
  
  const updateItem = async (id: number, data: TUpdate) => {
    try {
      isSending.value = true;
      item.value = await genericService.update(id, data);
      toastSuccess(`${name} successfully updated`);
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }
  
  const deleteItem = async (id: number) => {
    try {
      isSending.value = true;
      await genericService.delete(id);
      toastSuccess(`${name} successfully deleted`);
    } catch (err) {
      const message = errorCatch(err);
      toastError(message);
    } finally {
      isSending.value = false;
    }
  }

  return {
    items: items as Ref<T[]>,
    item: item as Ref<TOne>,
    isLoading,
    isSending,
    fetchAll,
    fetchOne,
    createItem,
    updateItem,
    deleteItem
  };
};

export { useCrud };
