export const get = <ObjectType extends {}, ReturnType>(
  object: ObjectType,
  path: string,
  fallback?: ReturnType
): ReturnType | undefined =>
  (path.split('.').reduce((inner: any, key) => inner?.[key], object) as
    | ReturnType
    | undefined) ?? fallback;

export const set = (object: any, path: string, value: any) => {
  const keys = path.split('.').reverse()
  let key = keys.pop()
  let target = object
  while (key) {
    if (keys.length === 0) {
      target[key] = value
      break
    }
    if (!target[key]) {
      target[key] = {}
    }
    target = target[key]
    key = keys.pop()
  }
  return object
}