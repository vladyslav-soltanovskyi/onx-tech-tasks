import { ref, onUnmounted } from 'vue';

type Timer = ReturnType<typeof setTimeout>;
type TypeFunc = (...args: any[]) => void;

const useDebounce = <TFunc extends TypeFunc>(
  func: TFunc,
  delay = 1000
) => {
  const timer = ref<Timer>();

  onUnmounted(() => {
    if (!timer.value) return;
    clearTimeout(timer.value);
  });

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer.value);
    timer.value = newTimer;
  }) as TFunc;

  return debouncedFunction;
}

export { useDebounce };