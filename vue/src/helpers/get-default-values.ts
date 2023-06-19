const getDefaultValues = <T = {}, TKey extends string | number | symbol = keyof T>(
  data: T | T[],
  key: TKey,
  defaultValue: unknown = ''
): Record<TKey, unknown> => {
  if (!Array.isArray(data)) {
    const keys = Object.keys(data);
    return keys.reduce((obj, key) => {
      obj[key] = defaultValue;
      return obj;
    }, {} as Record<TKey, unknown>);;
  }

  return data.reduce((obj) => {
    obj[key] = defaultValue;
    return obj;
  }, {} as Record<TKey, unknown>);
}

export { getDefaultValues };