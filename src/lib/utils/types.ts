export type CombineWithPreset<
  Extension extends {},
  BaseType extends {},
  Key extends keyof BaseType,
  Value extends BaseType[Key]
> = Omit<BaseType, Key> & {
  [key in Key]: Value;
} & Extension;

export type Nullable<T> = T | null;
