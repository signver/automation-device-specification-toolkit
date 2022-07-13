export const get = <ObjectType extends {}, ReturnType>(
  object: ObjectType,
  path: string,
  fallback?: ReturnType
): ReturnType | undefined =>
  (path.split('.').reduce((inner: any, key) => inner?.[key], object) as
    | ReturnType
    | undefined) ?? fallback;
