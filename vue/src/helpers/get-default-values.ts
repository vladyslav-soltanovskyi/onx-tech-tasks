const getDefaultValues = <T extends Record<string, any> = {}, TKey extends string | number | symbol = keyof T>(
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

  return data.reduce((obj, item) => {
    const keyName = item[key as string];
    obj[keyName] = defaultValue;
    return obj;
  }, {} as Record<TKey, unknown>);
}

export { getDefaultValues };