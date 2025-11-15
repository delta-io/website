/**
 * Maps an object's keys
 *
 * @example
 * ```ts
 * mapKeys({ foo: 1, bar: 2 }, k => `new-${k}`);
 * // => { "new-foo": 1, "new-bar": 2 }
 * ```
 */
export const mapKeys = (
  obj: Record<string, unknown>,
  mapFn: (key: string) => string,
): Record<string, unknown> => {
  return Object.entries(obj).reduce((newObj, [key, val]) => {
    return {
      ...newObj,
      [mapFn(key)]: val,
    };
  }, {});
};
